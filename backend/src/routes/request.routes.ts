import { Router } from "express";

import {
  getAllRequests,
  getRequestById,
  createRequest,
  updateRequest,
  deleteRequest
} from "../controllers/request.controller";

const router = Router();

router.get("/", getAllRequests);

router.get("/:id", getRequestById);

router.post("/", createRequest);

router.put("/:id", updateRequest);

router.delete("/:id", deleteRequest);

export default router;