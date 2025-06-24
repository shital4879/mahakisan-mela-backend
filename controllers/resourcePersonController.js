import ResourcePerson from "../models/ResourcePersonModel.js";
import fs from "fs";

// Create Resource Person (with biodata upload)
export const createResourcePerson = async (req, res) => {
  try {
    const {
      name,
      occupation,
      address,
      email,
      experience,
      mobile,
      type
    } = req.body;

    if (!name || !occupation || !mobile) {
      return res.status(400).json({ error: "Name, Occupation, and Mobile are required" });
    }

    const biodataPath = req.file ? req.file.path : null;

    const resourcePerson = new ResourcePerson({
      name,
      occupation,
      address,
      email,
      experience,
      biodata: biodataPath,
      mobile,
      type
    });

    await resourcePerson.save();
    res.status(201).json({ message: "Resource person created", data: resourcePerson });
  } catch (error) {
    res.status(500).json({ error: "Failed to create resource person" });
  }
};

// Get all resource persons
export const getResourcePersons = async (req, res) => {
  try {
    const persons = await ResourcePerson.find().sort({ createdAt: -1 });
    res.status(200).json(persons);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resource persons" });
  }
};

// Get resource person by ID
export const getResourcePersonById = async (req, res) => {
  try {
    const person = await ResourcePerson.findById(req.params.id);
    if (!person) return res.status(404).json({ error: "Resource person not found" });
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resource person" });
  }
};

// Update resource person status
export const updateResourcePersonStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const person = await ResourcePerson.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!person) return res.status(404).json({ error: "Resource person not found" });
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: "Failed to update status" });
  }
};

// Delete resource person by ID and remove biodata file if exists
export const deleteResourcePerson = async (req, res) => {
  try {
    const person = await ResourcePerson.findById(req.params.id);
    if (!person) return res.status(404).json({ error: "Resource person not found" });

    if (person.biodata) {
      fs.unlinkSync(person.biodata);
    }

    await ResourcePerson.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Resource person deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete resource person" });
  }
};