import express from 'express';
import { adminMiddleware } from '../middlewares/auth.middleware.js';
import { Inquiry } from '../../model/index.js';
import{} from '../controllers/index.js'

const inquiryRouter = express.Router();

// Barcha murojaatlarni olish
inquiryRouter.get('/', adminMiddleware, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ error: 'Murojaatlarni olishda xatolik' });
  }
});

// Murojaat holатini o'zgartirish
inquiryRouter.patch('/:id/status', adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({ error: 'Murojaat topilmadi' });
    }

    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ error: 'Murojaat holatini o\'zgartirishda xatolik' });
  }
});

// Murojaat ma'lumotlarini olish
inquiryRouter.get('/:id', adminMiddleware, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({ error: 'Murojaat topilmadi' });
    }

    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ error: 'Murojaat ma\'lumotlarini olishda xatolik' });
  }
});

export default inquiryRouter;