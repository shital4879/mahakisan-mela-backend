import Banner from '../models/BannerModel.js';
import fs from 'fs/promises';
import path from 'path';
import mongoose from 'mongoose';

export const createBanner = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title || title.trim() === '') {
            return res.status(400).json({ error: "Title is required" });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "At least one image is required" });
        }

        const imagePaths = req.files.map(file => file.path);

        const banner = new Banner({ title, images: imagePaths });
        await banner.save();

        res.status(200).json(banner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find().sort({ createdAt: -1 });
        if (!banners || banners.length === 0) {
            return res.status(404).json({ error: "No banners found" });
        }
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getBanner = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Invalid banner ID" });
    }

    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ error: "Banner not found" });
        }
        res.status(200).json(banner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteBanner = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid banner ID" });
    }

    try {
        const banner = await Banner.findByIdAndDelete(id);
        if (!banner) {
            console.log("Banner not found for ID:", id);
            return res.status(404).json({ error: "Banner not found" });
        }

        console.log("Deleted banner:", banner._id);

        for (const imagePath of banner.images || []) {
            try {
                await fs.unlink(path.resolve(imagePath));
                console.log("Deleted image:", imagePath);
            } catch (err) {
                console.error("Error deleting image:", imagePath, err.message);
            }
        }

        res.status(200).json({ message: "Banner deleted successfully" });
    } catch (error) {
        console.error("Delete failed:", error);
        res.status(500).json({ error: error.message });
    }
};


export const updateBanner = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Invalid banner ID" });
    }

    try {
        const { title } = req.body;
        const updates = { title };

        if (req.files && req.files.length > 0) {
            const existingBanner = await Banner.findById(req.params.id);
            for (const imagePath of existingBanner.images || []) {
                try {
                    await fs.unlink(path.resolve(imagePath));
                } catch (error) {
                    console.error(`Error deleting image: ${imagePath}`, error.message);
                }
            }
            updates.images = req.files.map(file => file.path);
        }

        const updated = await Banner.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!updated) return res.status(404).json({ error: "Banner not found" });

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
