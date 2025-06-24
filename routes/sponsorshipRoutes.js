import express from "express";
import {
  createSponsorship,
  getSponsorships,
  deleteSponsorship,
  getSponsorshipById
} from "../controllers/sponsorshipController.js";

const router = express.Router();

router.post("/", createSponsorship);
router.get("/", getSponsorships);
router.get("/:id", getSponsorshipById);
router.delete("/:id", deleteSponsorship);

export default router;
