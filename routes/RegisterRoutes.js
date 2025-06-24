import express from 'express';
import {
  createRegister,
  getAllRegisters,
  getRegisterById,
  deleteRegister
} from '../controllers/RegisterController.js';

const router = express.Router();

router.post('/', createRegister);
router.get('/', getAllRegisters);
router.get('/:id', getRegisterById);
router.delete('/:id', deleteRegister);

export default router;
