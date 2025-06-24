import Sponsorship from "../models/SponsorshipModel.js";

// POST: Create new sponsorship inquiry
export const createSponsorship = async (req, res) => {
  try {
    const { contactPerson, mobile, email, category, level } = req.body;

    if (!contactPerson || !mobile || !email || !category || !level) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newInquiry = new Sponsorship({ contactPerson, mobile, email, category, level });
    await newInquiry.save();

    res.status(201).json({ message: "Sponsorship inquiry submitted", data: newInquiry });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit sponsorship inquiry" });
  }
};

// GET: Fetch all inquiries
export const getSponsorships = async (req, res) => {
  try {
    const data = await Sponsorship.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sponsorships" });
  }
};

// DELETE: Remove an inquiry by ID
export const deleteSponsorship = async (req, res) => {
  try {
    const inquiry = await Sponsorship.findByIdAndDelete(req.params.id);
    if (!inquiry) return res.status(404).json({ error: "Inquiry not found" });

    res.status(200).json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete inquiry" });
  }
};

// GET: Get a sponsorship inquiry by ID
export const getSponsorshipById = async (req, res) => {
  try {
    const sponsorship = await Sponsorship.findById(req.params.id);
    if (!sponsorship) {
      return res.status(404).json({ error: "Sponsorship inquiry not found" });
    }
    res.status(200).json(sponsorship);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sponsorship by ID" });
  }
};
