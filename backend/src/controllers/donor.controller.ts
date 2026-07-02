import { Request, Response } from "express";
import { UniqueConstraintError, ValidationError } from "sequelize";
import Donor, { BloodGroup, Gender } from "../models/Donor";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const VALID_BLOOD_GROUPS: BloodGroup[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const VALID_GENDERS:      Gender[]     = ["Male", "Female"];

/**
 * Generates a unique donor code: DON-YYYY-XXXXX
 * Example: DON-2026-00042
 */
const generateDonorCode = async (): Promise<string> => {
  const year  = new Date().getFullYear();
  const count = await Donor.count();
  const seq   = String(count + 1).padStart(5, "0");
  return `DON-${year}-${seq}`;
};

/**
 * Validates required fields for donor creation.
 * Returns an array of error messages (empty = valid).
 */
const validateDonorBody = (body: Record<string, unknown>): string[] => {
  const errors: string[] = [];

  const required: string[] = [
    "first_name", "last_name", "gender", "date_of_birth", "blood_group"
  ];

  for (const field of required) {
    if (!body[field]) errors.push(`${field} is required`);
  }

  if (body.gender && !VALID_GENDERS.includes(body.gender as Gender)) {
    errors.push(`gender must be one of: ${VALID_GENDERS.join(", ")}`);
  }

  if (body.blood_group && !VALID_BLOOD_GROUPS.includes(body.blood_group as BloodGroup)) {
    errors.push(`blood_group must be one of: ${VALID_BLOOD_GROUPS.join(", ")}`);
  }

  if (body.weight !== undefined && isNaN(Number(body.weight))) {
    errors.push("weight must be a number");
  }

  if (body.date_of_birth) {
    const dob = new Date(body.date_of_birth as string);
    if (isNaN(dob.getTime())) errors.push("date_of_birth is not a valid date");
    if (dob > new Date())    errors.push("date_of_birth cannot be in the future");
  }

  return errors;
};

// ─── Controllers ──────────────────────────────────────────────────────────────

/**
 * GET /api/donors
 * Supports ?blood_group=O%2B and ?is_eligible=true query filters
 */
export const getAllDonors = async (req: Request, res: Response) => {
  try {
    const where: Record<string, unknown> = {};

    if (req.query.blood_group) {
      const bg = req.query.blood_group as string;
      if (!VALID_BLOOD_GROUPS.includes(bg as BloodGroup)) {
        res.status(400).json({ success: false, message: `Invalid blood_group filter` });
        return;
      }
      where.blood_group = bg;
    }

    if (req.query.is_eligible !== undefined) {
      where.is_eligible = req.query.is_eligible === "true";
    }

    const donors = await Donor.findAll({ where });

    res.status(200).json({
      success: true,
      count:   donors.length,
      data:    donors,
    });
  } catch (error) {
    console.error("[getAllDonors]", error);
    res.status(500).json({ success: false, message: "Failed to fetch donors" });
  }
};

/**
 * GET /api/donors/:id
 */
export const getDonorById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ success: false, message: "Invalid donor ID" });
      return;
    }

    const donor = await Donor.findByPk(id);

    if (!donor) {
      res.status(404).json({ success: false, message: "Donor not found" });
      return;
    }

    res.status(200).json({ success: true, data: donor });
  } catch (error) {
    console.error("[getDonorById]", error);
    res.status(500).json({ success: false, message: "Failed to fetch donor" });
  }
};

/**
 * POST /api/donors
 */
export const createDonor = async (req: Request, res: Response) => {
  try {
    const errors = validateDonorBody(req.body);
    if (errors.length > 0) {
      res.status(400).json({ success: false, errors });
      return;
    }

    const donor_code = await generateDonorCode();

    const donor = await Donor.create({
      donor_code,
      first_name:  req.body.first_name,
      last_name:   req.body.last_name,
      gender:      req.body.gender,
      date_of_birth: req.body.date_of_birth,
      blood_group: req.body.blood_group,
      weight:      req.body.weight      ?? null,
      phone:       req.body.phone       ?? null,
      email:       req.body.email       ?? null,
      region:      req.body.region      ?? null,
      city:        req.body.city        ?? null,
      address:     req.body.address     ?? null,
      user_id:     req.body.user_id     ?? null,
      is_eligible: true,
    });

    res.status(201).json({
      success: true,
      message: "Donor created successfully",
      data:    donor,
    });
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      res.status(409).json({ success: false, message: "Email already registered" });
      return;
    }
    if (error instanceof ValidationError) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors:  error.errors.map((e) => e.message),
      });
      return;
    }
    console.error("[createDonor]", error);
    res.status(500).json({ success: false, message: "Failed to create donor" });
  }
};

/**
 * PUT /api/donors/:id
 */
export const updateDonor = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ success: false, message: "Invalid donor ID" });
      return;
    }

    const donor = await Donor.findByPk(id);

    if (!donor) {
      res.status(404).json({ success: false, message: "Donor not found" });
      return;
    }

    // Prevent overwriting donor_code from outside
    const { donor_code: _ignored, id: _id, ...safeBody } = req.body;

    // Validate blood_group and gender if provided
    if (safeBody.blood_group && !VALID_BLOOD_GROUPS.includes(safeBody.blood_group)) {
      res.status(400).json({ success: false, message: `Invalid blood_group` });
      return;
    }
    if (safeBody.gender && !VALID_GENDERS.includes(safeBody.gender)) {
      res.status(400).json({ success: false, message: `Invalid gender` });
      return;
    }

    await donor.update(safeBody);

    res.status(200).json({
      success: true,
      message: "Donor updated successfully",
      data:    donor,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors:  error.errors.map((e) => e.message),
      });
      return;
    }
    console.error("[updateDonor]", error);
    res.status(500).json({ success: false, message: "Failed to update donor" });
  }
};

/**
 * DELETE /api/donors/:id
 */
export const deleteDonor = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ success: false, message: "Invalid donor ID" });
      return;
    }

    const donor = await Donor.findByPk(id);

    if (!donor) {
      res.status(404).json({ success: false, message: "Donor not found" });
      return;
    }

    await donor.destroy();

    res.status(200).json({ success: true, message: "Donor deleted successfully" });
  } catch (error) {
    console.error("[deleteDonor]", error);
    res.status(500).json({ success: false, message: "Failed to delete donor" });
  }
};