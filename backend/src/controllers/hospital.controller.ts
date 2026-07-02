import { Request, Response } from "express";
import Hospital from "../models/Hospital";

export const getAllHospitals = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const hospitals = await Hospital.findAll();

    res.status(200).json({
      success: true,
      count: hospitals.length,
      data: hospitals
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch hospitals"
    });
  }
};

export const getHospitalById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const hospital = await Hospital.findByPk(Number(req.params.id));

    if (!hospital) {
      res.status(404).json({
        success: false,
        message: "Hospital not found"
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: hospital
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false
    });
  }
};

export const createHospital = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const hospital = await Hospital.create(req.body);

    res.status(201).json({
      success: true,
      data: hospital
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false
    });
  }
};

export const updateHospital = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const hospital = await Hospital.findByPk(Number(req.params.id));

    if (!hospital) {
      res.status(404).json({
        success: false,
        message: "Hospital not found"
      });

      return;
    }

    await hospital.update(req.body);

    res.status(200).json({
      success: true,
      data: hospital
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false
    });
  }
};

export const deleteHospital = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const hospital = await Hospital.findByPk(Number(req.params.id));

    if (!hospital) {
      res.status(404).json({
        success: false,
        message: "Hospital not found"
      });

      return;
    }

    await hospital.destroy();

    res.status(200).json({
      success: true,
      message: "Hospital deleted successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false
    });
  }
};