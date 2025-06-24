// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { createProfile } from '../controllers/ProfileController';

// const router = express.Router();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../uploads/bio'));
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `bio-${Date.now()}${ext}`);
//   }
// });

// const upload = multer({ storage });

// router.post('/profile', upload.single('bioAttachment'), createProfile);

// export default router;
