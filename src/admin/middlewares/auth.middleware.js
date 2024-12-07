import jwt from 'jsonwebtoken';
import { User } from '../../model/index.js';

export const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Autentifikatsiya talab qilinadi' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    const user = await User.findOne({ _id: decoded.userId, role: 'admin' });

    if (!user) {
      return res.status(403).json({ error: 'Ruxsat etilmagan kirish' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Iltimos, qayta kirish uchun harakat qiling' });
  }
};