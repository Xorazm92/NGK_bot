import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../model/index.js';

const authRouter = express.Router();

// Admin Login
authRouter.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Adminni tekshirish
    const admin = await User.findOne({ 
      username, 
      role: 'admin' 
    });

    if (!admin) {
      return res.status(401).json({ error: 'Foydalanuvchi topilmadi' });
    }

    // Parolni tekshirish
    const isMatch = await bcrypt.compare(password, admin.password);
    
    if (!isMatch) {
      return res.status(401).json({ error: 'Noto\'g\'ri parol' });
    }

    // JWT token yaratish
    const token = jwt.sign(
      { userId: admin._id }, 
      process.env.JWT_SECRET || 'default_secret', 
      { expiresIn: '1h' }
    );

    res.json({ 
      token, 
      user: { 
        id: admin._id, 
        username: admin.username 
      } 
    });
  } catch (error) {
    res.status(500).json({ error: 'Kirish jarayonida xatolik' });
  }
});

// Admin Register (Faqat birinchi marta)
authRouter.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Avvalgi adminni tekshirish
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin allaqachon ro\'yxatdan o\'tgan' });
    }

    // Parolni shifrlash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Yangi admin yaratish
    const admin = new User({
      username,
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();

    res.status(201).json({ message: 'Admin muvaffaqiyatli yaratildi' });
  } catch (error) {
    res.status(500).json({ error: 'Ro\'yxatdan o\'tishda xatolik' });
  }
});

export default authRouter;