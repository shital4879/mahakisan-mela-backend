import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { connectDb } from './config/dB.js';
import path from 'path';
import bannerRouter from './routes/BannerRoutes.js';
import registerRoutes from "./routes/RegisterRoutes.js"
import stallBookingRoutes from "./routes/StallBookingRoutes.js"
import logoRoutes from "./routes/logoRoutes.js";
import sponsorshipRoutes from "./routes/sponsorshipRoutes.js";
import resourcePersonRoutes from "./routes/resourcePersonRoutes.js";
import partnersRoutes from "./routes/partnersRoutes.js";
import contactUsRoutes from "./routes/contactUsRoutes.js";
import locationEventRoutes from "./routes/locationEventRoutes.js";
// import profileRoutes from "./routes/ProfileRoutes.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDb();
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));




app.use(cors());


const PORT = 5001
app.use('/api/banners', bannerRouter);
app.use('/api/registers', registerRoutes);
app.use('/api/stallBooking', stallBookingRoutes);
app.use("/api/logos", logoRoutes);
app.use("/api/sponsorship", sponsorshipRoutes);
app.use("/api/resource-person", resourcePersonRoutes);
app.use("/uploads", express.static("uploads")); 
app.use("/api/partners", partnersRoutes);
app.use("/api/contactus", contactUsRoutes);
app.use("/api/events", locationEventRoutes);



// app.use('/api', profileRoutes);



app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});