import { Request, Response } from "express";
import Stock from "../models/Stock";
import BloodCenter from "../models/Center";

export const getAllStocks = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const stocks = await Stock.findAll({
      include: [
        {
          model: BloodCenter,
          as: "center",
          attributes: [
            "id",
            "name",
            "region",
            "city",
            "phone",
            "email"
          ]
        }
      ]
    });

    res.status(200).json({
      success: true,
      count: stocks.length,
      data: stocks
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch stock"
    });
  }
};

export const getStockById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const stock = await Stock.findByPk(Number(req.params.id), {
      include: [
        {
          model: BloodCenter,
          as: "center"
        }
      ]
    });

    if (!stock) {
      res.status(404).json({
        success: false,
        message: "Stock not found"
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: stock
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false
    });
  }
};

export const createStock = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const stock = await Stock.create(req.body);

    res.status(201).json({
      success: true,
      data: stock
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false
    });
  }
};

export const updateStock = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const stock = await Stock.findByPk(Number(req.params.id));

    if (!stock) {
      res.status(404).json({
        success: false,
        message: "Stock not found"
      });

      return;
    }

    await stock.update(req.body);

    res.status(200).json({
      success: true,
      data: stock
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false
    });
  }
};

export const deleteStock = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const stock = await Stock.findByPk(Number(req.params.id));

    if (!stock) {
      res.status(404).json({
        success: false,
        message: "Stock not found"
      });

      return;
    }

    await stock.destroy();

    res.status(200).json({
      success: true,
      message: "Stock deleted successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false
    });
  }
};