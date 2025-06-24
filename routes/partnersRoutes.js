import express from "express";
import {
  createPartner,
  getPartners,
  getPartnerById,
  deletePartner
} from "../controllers/partnersController.js";

const router = express.Router();

router.post("/", createPartner);
router.get("/", getPartners);
router.get("/:id", getPartnerById);
router.delete("/:id", deletePartner);

export default router;
