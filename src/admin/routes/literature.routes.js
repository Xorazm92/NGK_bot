import express from 'express';
import { adminMiddleware } from '../middlewares/auth.middleware.js';
import { Literature } from '../../model/index.js';

const literatureRouter = express.Router();

literatureRouter.post('/upload', adminMiddleware, async (req, res) => {
  try {
    const { name, fileUrl, category } = req.body;
    
    const literature = new Literature({
      name,
      fileUrl,
      category
    });

    await literature.save();

    res.status(201).json({
      message: 'Adabiyot muvaffaqiyatli yuklandi',
      literature
    });
  } catch (error) {
    res.status(500).json({ error: 'Adabiyotni yuklashda xatolik' });
  }
});

literatureRouter.get('/', adminMiddleware, async (req, res) => {
  try {
    const literatures = await Literature.find({});
    res.status(200).json(literatures);
  } catch (error) {
    res.status(500).json({ error: 'Adabiyotlarni olishda xatolik' });
  }
});

export default literatureRouter;
