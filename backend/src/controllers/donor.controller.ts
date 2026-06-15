import { Request, Response } from "express";
import Donor from "../models/Donor";

/**
 * GET /api/donors
 */
export const getAllDonors = async (
  req: Request,
  res: Response
) => {
  try {
    const donors = await Donor.findAll();

    res.status(200).json({
      success: true,
      count: donors.length,
      data: donors
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch donors"
    });
  }
};

/**
 * GET /api/donors/:id
 */
export const getDonorById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid donor ID"
      });
    }

    const donor = await Donor.findByPk(id);

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor not found"
      });
    }

    res.status(200).json({
      success: true,
      data: donor
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch donor"
    });
  }
};

/**
 * POST /api/donors
 */
export const createDonor = async (
  req: Request,
  res: Response
) => {
  try {
    const donor = await Donor.create(req.body);

    res.status(201).json({
      success: true,
      message: "Donor created successfully",
      data: donor
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create donor"
    });
  }
};

/**
 * PUT /api/donors/:id
 */
export const updateDonor = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid donor ID"
      });
    }

    const donor = await Donor.findByPk(id);

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor not found"
      });
    }

    await donor.update(req.body);

    res.status(200).json({
      success: true,
      message: "Donor updated successfully",
      data: donor
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update donor"
    });
  }
};

/**
 * DELETE /api/donors/:id
 */
export const deleteDonor = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid donor ID"
      });
    }

    const donor = await Donor.findByPk(id);

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor not found"
      });
    }

    await donor.destroy();

    res.status(200).json({
      success: true,
      message: "Donor deleted successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete donor"
    });
  }
};