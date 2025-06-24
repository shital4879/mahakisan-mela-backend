import Partners from "../models/PartnersModel.js";

// Create a new partner
export const createPartner = async (req, res) => {
  try {
    const { name, type } = req.body;

    if (!name || !type) {
      return res.status(400).json({ error: "Name and Type are required" });
    }

    const partner = new Partners({ name, type });
    await partner.save();

    res.status(201).json({ message: "Partner created", data: partner });
  } catch (error) {
    res.status(500).json({ error: "Failed to create partner" });
  }
};

// Get all partners
export const getPartners = async (req, res) => {
  try {
    const partners = await Partners.find().sort({ createdAt: -1 });
    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch partners" });
  }
};

// Get partner by ID
export const getPartnerById = async (req, res) => {
  try {
    const partner = await Partners.findById(req.params.id);
    if (!partner) return res.status(404).json({ error: "Partner not found" });
    res.status(200).json(partner);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch partner" });
  }
};

// Delete partner by ID
export const deletePartner = async (req, res) => {
  try {
    const partner = await Partners.findByIdAndDelete(req.params.id);
    if (!partner) return res.status(404).json({ error: "Partner not found" });

    res.status(200).json({ message: "Partner deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete partner" });
  }
};
