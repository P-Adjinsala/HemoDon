import { Router } from "express";

import {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification
} from "../controllers/notification.controller";

const router = Router();

/*
|--------------------------------------------------------------------------
| GET
|--------------------------------------------------------------------------
*/

router.get("/", getAllNotifications);

router.get("/:id", getNotificationById);

/*
|--------------------------------------------------------------------------
| POST
|--------------------------------------------------------------------------
*/

router.post("/", createNotification);

/*
|--------------------------------------------------------------------------
| PUT
|--------------------------------------------------------------------------
*/

router.put("/:id", updateNotification);

/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/

router.delete("/:id", deleteNotification);

export default router;