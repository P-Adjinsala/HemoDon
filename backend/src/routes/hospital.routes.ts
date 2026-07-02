import { Router } from "express";

import {
  getAllHospitals,
  getHospitalById,
  createHospital,
  updateHospital,
  deleteHospital
} from "../controllers/hospital.controller";

const router = Router();

router.get("/", getAllHospitals);

router.get("/:id", getHospitalById);

router.post("/", createHospital);

router.put("/:id", updateHospital);

router.delete("/:id", deleteHospital);

export default router;