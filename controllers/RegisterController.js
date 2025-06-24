import Register from '../models/RegisterModel.js';
import mongoose from 'mongoose';

export const createRegister = async (req, res) => {
  try {
    const { name, phone, address, company, email, category, amount, status } = req.body;

    if (!name || !phone || !address) {
      return res.status(400).json({ error: "Name, Phone, and Address are required." });
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: "Invalid phone number. Must be 10 digits." });
    }

    const newEntry = new Register({
      name,
      phone,
      address,
      company,
      email,
      category,
      amount,
      status
    });

    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllRegisters = async (req, res) => {
  try {
    const entries = await Register.find().sort({ createdAt: -1 });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRegisterById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid register ID" });
  }

  try {
    const entry = await Register.findById(id);
    if (!entry) {
      return res.status(404).json({ error: "Register entry not found" });
    }
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteRegister = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid register ID" });
  }

  try {
    const deleted = await Register.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Register entry not found" });
    }
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

