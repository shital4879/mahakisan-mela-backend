import LocationEvent from "../models/LocationEventModel.js";

// Utility function to format seconds → hh:mm:ss
const formatTimer = (startTime) => {
  const elapsedMs = new Date() - new Date(startTime);
  const totalSeconds = Math.floor(elapsedMs / 1000);

  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};

// POST: Create new event
export const createEvent = async (req, res) => {
  try {
    const { location, date, day } = req.body;

    if (!location || !date || !day) {
      return res.status(400).json({ error: "Location, Date, and Day are required" });
    }

    const event = new LocationEvent({ location, date, day });
    await event.save();

    res.status(201).json({ message: "Event created", data: event });
  } catch (error) {
    res.status(500).json({ error: "Failed to create event" });
  }
};

// GET: All events with live timer
export const getEvents = async (req, res) => {
  try {
    const events = await LocationEvent.find().sort({ createdAt: -1 });

    const eventsWithTimer = events.map(event => ({
      ...event.toObject(),
      timer: formatTimer(event.startTime)
    }));

    res.status(200).json(eventsWithTimer);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

// GET: Single event by ID with live timer
export const getEventById = async (req, res) => {
  try {
    const event = await LocationEvent.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    res.status(200).json({
      ...event.toObject(),
      timer: formatTimer(event.startTime)
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event" });
  }
};

// DELETE: Event by ID
export const deleteEvent = async (req, res) => {
  try {
    const event = await LocationEvent.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
};
