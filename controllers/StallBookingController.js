import StallBooking from '../models/StallBookingModel.js';

// Create new booking
export const createStallBooking = async (req, res) => {
  try {
    console.log('Incoming POST body:', req.body); // Debug
    const { name, phone, address, type, email, category, amount, status, date } = req.body;

    if (!name || !phone || !address || !type) {
      return res.status(400).json({ message: 'Name, phone, address, and type are required.' });
    }

    const newBooking = new StallBooking({
      name, phone, address, type, email, category, amount, status, date
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all
export const getAllStallBookings = async (req, res) => {
  try {
    const bookings = await StallBooking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get by ID
export const getStallBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await StallBooking.findById(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update by ID
export const updateStallBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await StallBooking.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete by ID
export const deleteStallBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await StallBooking.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
