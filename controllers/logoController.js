import Logo from "../models/LogoModel.js";
import fs from "fs";

// GET: Fetch both logos
export const getLogos = async (req, res) => {
  try {
    const logos = await Logo.getInstance();
    res.status(200).json(logos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch logos" });
  }
};

// PATCH: Update specific logo
export const updateLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }
    if (!['image1', 'image2'].includes(req.body.imageType)) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "imageType must be 'image1' or 'image2'" });
    }

    const logos = await Logo.getInstance();
    
    // Remove old file if it exists
    if (logos[req.body.imageType] && fs.existsSync(logos[req.body.imageType])) {
      fs.unlinkSync(logos[req.body.imageType]);
    }

    // Update the logo
    logos[req.body.imageType] = req.file.path;
    await logos.save();

    res.status(200).json({ message: "Logo updated", logos });
  } catch (error) {
    // Clean up uploaded file if error occurs
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: "Failed to update logo" });
  }
};

// Reset to default logos
export const resetLogos = async (req, res) => {
  try {
    const logos = await Logo.getInstance();
    
    // Remove current files if they exist
    if (logos.image1 && fs.existsSync(logos.image1)) {
      fs.unlinkSync(logos.image1);
    }
    if (logos.image2 && fs.existsSync(logos.image2)) {
      fs.unlinkSync(logos.image2);
    }

    // Reset to defaults
    logos.image1 = 'default1.png';
    logos.image2 = 'default2.png';
    await logos.save();

    res.status(200).json({ message: "Logos reset to default", logos });
  } catch (error) {
    res.status(500).json({ error: "Failed to reset logos" });
  }
};