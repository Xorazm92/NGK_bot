import connectDB from './config/database.js';
import bot from './config/bot.js';
import express from 'express';
import cors from 'cors';
import routers from './admin/routes/index.js'; 

// Connect to Database
connectDB();

// Express Admin Panel
const app = express();
app.use(cors());
app.use(express.json());

// Admin marshrutlarini qo'shish
app.use('/admin', routers); // admin prefiksini qo'shish

// Import handlers
import './handlers/start.handler.js';
import './handlers/message.handler.js';
import './handlers/literature.handler.js';

// Start Bot
bot.start({
  onStart: (botInfo) => {
    console.log(`Bot ${botInfo.username} ishga tushdi`);
  }
});

// Express Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Admin panel ${PORT} portda ishga tushdi`);
});
