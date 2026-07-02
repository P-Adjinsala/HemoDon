import { Request as Req, Response } from "express";
import BloodRequest from "../models/Request";
import Hospital from "../models/Hospital";

export const getAllRequests = async (
  _req: Req,
  res: Response
): Promise<void> => {
  try {
    const requests = await BloodRequest.findAll({
      include: [
        {
          model: Hospital,
          as: "hospital",
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
      count: requests.length,
      data: requests
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch requests"
    });
  }
};

export const getRequestById = async (
  req: Req,
  res: Response
): Promise<void> => {
  try {
    const request = await BloodRequest.findByPk(Number(req.params.id), {
      include: [
        {
          model: Hospital,
          as: "hospital"
        }
      ]
    });

    if (!request) {
      res.status(404).json({
        success: false,
        message: "Request not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: request
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false
    });
  }
};

export const createRequest = async (
  req: Req,
  res: Response
): Promise<void> => {
  try {
    const request = await BloodRequest.create(req.body);

    res.status(201).json({
      success: true,
      data: request
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create request"
    });
  }
};

export const updateRequest = async (
  req: Req,
  res: Response
): Promise<void> => {
  try {
    const request = await BloodRequest.findByPk(Number(req.params.id));

    if (!request) {
      res.status(404).json({
        success: false,
        message: "Request not found"
      });
      return;
    }

    await request.update(req.body);

    res.status(200).json({
      success: true,
      data: request
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false
    });
  }
};

export const deleteRequest = async (
  req: Req,
  res: Response
): Promise<void> => {
  try {
    const request = await BloodRequest.findByPk(Number(req.params.id));

    if (!request) {
      res.status(404).json({
        success: false,
        message: "Request not found"
      });
      return;
    }

    await request.destroy();

    res.status(200).json({
      success: true,
      message: "Request deleted successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false
    });
  }
};