// import Profile from '../models/ProfileModel.js';

// export const createProfile = async (req, res) => {
//   try {
//     const { name, occupation, address, email, experience, phone } = req.body;
//     const bioAttachment = req.file?.filename;

//     if (!name || !occupation) {
//       return res.status(400).json({ message: 'Name and occupation are required.' });
//     }

//     const newProfile = new Profile({
//       name,
//       occupation,
//       address,
//       email,
//       experience,
//       phone,
//       bioAttachment
//     });

//     const savedProfile = await newProfile.save();
//     res.status(201).json(savedProfile);
//   } catch (error) {
//     console.error('Error saving profile:', error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// };
