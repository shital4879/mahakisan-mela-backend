import mongoose from 'mongoose';

const BannerSchema = new mongoose.Schema({
    images: [{
        type: String,
        required: true,
        trim: true
    }],
    title: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

export default mongoose.model("Banner", BannerSchema);
