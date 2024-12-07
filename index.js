import express from 'express'
import { config } from 'dotenv'
import mongoose from 'mongoose'
import './src/core/bot.js'
import './src/actions/star.js'


config()
const app = express()
app.use(express.json())

const port = process.env.PORT || 5001

const uri = process.env.DATABASE_URI
app.listen(port, async() =>{

    await mongoose.connect(uri)
    console.log('connect to mongo');
    console.log(`project is running on port ${port}`);
    
})