import { Request, Response } from "express";
import Log from "../models/Log";

export const getAllLogs = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const logs = await Log.findAll();

    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch logs"
    });
  }
};

export const getLogById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const log = await Log.findByPk(Number(req.params.id));

    if (!log) {
      res.status(404).json({
        success: false,
        message: "Log not found"
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: log
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false
    });
  }
};

export const createLog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const log = await Log.create(req.body);

    res.status(201).json({
      success: true,
      data: log
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create log"
    });
  }
};

export const updateLog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const log = await Log.findByPk(Number(req.params.id));

    if (!log) {
      res.status(404).json({
        success: false,
        message: "Log not found"
      });

      return;
    }

    await log.update(req.body);

    res.status(200).json({
      success: true,
      data: log
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false
    });
  }
};

export const deleteLog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const log = await Log.findByPk(Number(req.params.id));

    if (!log) {
      res.status(404).json({
        success: false,
        message: "Log not found"
      });

      return;
    }

    await log.destroy();

    res.status(200).json({
      success: true,
      message: "Log deleted successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false
    });
  }
};