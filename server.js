import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import postRoutes from './routes/postRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/posts', postRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Servidor rodando na porta 5000')))
  .catch(err => console.error(err))
