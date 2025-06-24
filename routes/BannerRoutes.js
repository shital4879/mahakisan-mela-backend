import express from 'express';
import { createBanner, deleteBanner, getAllBanners, getBanner, updateBanner } from '../controllers/BannerController.js';
import uploadBanner from '../middleware/upload.js';

const router = express.Router();

router.post("/", uploadBanner.array("images", 10), createBanner);
router.put("/:id", uploadBanner.array("images", 10), updateBanner);
router.get("/", getAllBanners);
router.get("/:id", getBanner);
router.put("/:id", uploadBanner.array("image", 10), updateBanner);
router.delete("/:id", deleteBanner);

export default router;
