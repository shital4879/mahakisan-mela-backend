import express from 'express';
import multer from 'multer';
import {
  createResourcePerson,
  getResourcePersons,
  getResourcePersonById,
  deleteResourcePerson,
  updateResourcePersonStatus
} from '../controllers/resourcePersonController.js';

const router = express.Router();

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Routes
router.get("/", getResourcePersons);
router.post("/", upload.single("biodata"), createResourcePerson);
router.get("/:id", getResourcePersonById);
router.patch("/:id", updateResourcePersonStatus);
router.delete("/:id", deleteResourcePerson);

export default router;