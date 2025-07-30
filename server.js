import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import postRoutes from './routes/postRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url'

// Corrige caminhos para __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Carrega variáveis de ambiente (.env)
dotenv.config()

// Verifica se MONGO_URI está definido
if (!process.env.MONGO_URI) {
  console.error('❌ Erro: MONGO_URI não definida no .env')
  process.exit(1)
}

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Static files (ex: imagens)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Rotas
app.use('/posts', postRoutes)

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'blogpriscila',
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB conectado:', mongoose.connection.name)
  app.listen(5000, () => {
    console.log('🚀 Servidor rodando em http://localhost:5000')
  })
})
.catch(err => {
  console.error('❌ Erro na conexão com MongoDB:', err)
  process.exit(1)
})
