import express from 'express'
import multer from 'multer'
import Post from '../models/Post.js'
import path from 'path'

const router = express.Router()

// Config multer para salvar na /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const name = Date.now() + ext
    cb(null, name)
  }
})

const upload = multer({ storage })

// POST criar post com imagem opcional
router.post('/', upload.single('imagem'), async (req, res) => {
  try {
    const { conteudo } = req.body
    const imagem = req.file ? `/uploads/${req.file.filename}` : null

    const post = new Post({ conteudo, imagem })
    await post.save()
    res.status(201).json(post)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar post' })
  }
})

// GET listar posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 })
    res.json(posts)
  } catch {
    res.status(500).json({ error: 'Erro ao buscar posts' })
  }
})

// DELETE post
router.delete('/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id)
    res.json({ message: 'Post deletado' })
  } catch {
    res.status(500).json({ error: 'Erro ao deletar post' })
  }
})

export default router
