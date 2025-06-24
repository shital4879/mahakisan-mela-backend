import mongoose from "mongoose";

const LogoSchema = new mongoose.Schema({
  image1: {
    type: String, // Path or URL for first logo
    required: true
  },
  image2: {
    type: String, // Path or URL for second logo
    required: true
  }
}, { timestamps: true });

// Create a singleton document
LogoSchema.statics.getInstance = async function() {
  let logo = await this.findOne();
  if (!logo) {
    logo = await this.create({ 
      image1: 'default1.png',
      image2: 'default2.png'
    });
  }
  return logo;
};

const Logo = mongoose.model("Logo", LogoSchema);
export default Logo;