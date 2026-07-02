import { Request, Response } from "express";
import Notification from "../models/Notification";

export const getAllNotifications = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const notifications = await Notification.findAll();

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications"
    });
  }
};

export const getNotificationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const notification = await Notification.findByPk(
      Number(req.params.id)
    );

    if (!notification) {
      res.status(404).json({
        success: false,
        message: "Notification not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: notification
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false
    });
  }
};

export const createNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const notification = await Notification.create(req.body);

    res.status(201).json({
      success: true,
      data: notification
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create notification"
    });
  }
};

export const updateNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const notification = await Notification.findByPk(
      Number(req.params.id)
    );

    if (!notification) {
      res.status(404).json({
        success: false,
        message: "Notification not found"
      });
      return;
    }

    await notification.update(req.body);

    res.status(200).json({
      success: true,
      data: notification
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false
    });
  }
};

export const deleteNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const notification = await Notification.findByPk(
      Number(req.params.id)
    );

    if (!notification) {
      res.status(404).json({
        success: false,
        message: "Notification not found"
      });
      return;
    }

    await notification.destroy();

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false
    });
  }
};