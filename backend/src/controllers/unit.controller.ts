import { Request, Response } from "express";
import Unit from "../models/Unit";

export const getAllUnits = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const units = await Unit.findAll();

    res.status(200).json({
      success: true,
      count: units.length,
      data: units
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch units"
    });
  }
};

export const getUnitById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const unit = await Unit.findByPk(Number(req.params.id));

    if (!unit) {
      res.status(404).json({
        success: false,
        message: "Unit not found"
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: unit
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false
    });
  }
};

export const createUnit = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const unit = await Unit.create(req.body);

    res.status(201).json({
      success: true,
      data: unit
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create unit"
    });
  }
};

export const updateUnit = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const unit = await Unit.findByPk(Number(req.params.id));

    if (!unit) {
      res.status(404).json({
        success: false,
        message: "Unit not found"
      });

      return;
    }

    await unit.update(req.body);

    res.status(200).json({
      success: true,
      data: unit
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false
    });
  }
};

export const deleteUnit = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const unit = await Unit.findByPk(Number(req.params.id));

    if (!unit) {
      res.status(404).json({
        success: false,
        message: "Unit not found"
      });

      return;
    }

    await unit.destroy();

    res.status(200).json({
      success: true,
      message: "Unit deleted successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false
    });
  }
};