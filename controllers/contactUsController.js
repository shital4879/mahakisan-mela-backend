import ContactUs from "../models/ContactUsModel.js";

// POST: Create new contact message
export const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMessage = new ContactUs({ name, email, message });
    await newMessage.save();

    res.status(201).json({ message: "Contact message received", data: newMessage });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit contact message" });
  }
};

// GET: Fetch all messages
export const getMessages = async (req, res) => {
  try {
    const messages = await ContactUs.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contact messages" });
  }
};

// DELETE: Remove a message by ID
export const deleteMessage = async (req, res) => {
  try {
    const msg = await ContactUs.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ error: "Message not found" });

    res.status(200).json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete message" });
  }
};
