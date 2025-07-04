import Post from '../models/Post.js'
import fs from 'fs'
import path from 'path'
import fsPromises from 'fs/promises'

const __dirname = path.resolve(); // garante caminho absoluto mesmo com ESModules

export const listarPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 })
  res.json(posts)
}

export const criarPost = async (req, res) => {
  const { conteudo } = req.body
  const imagem = req.file ? `/uploads/${req.file.filename}` : null
  const novoPost = new Post({ conteudo, imagem })
  await novoPost.save()
  res.status(201).json(novoPost)
}

export const deletarPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ message: 'Post não encontrado' })

    if (post.imagem) {
  try {
    const filePath = path.join(__dirname, 'uploads', path.basename(post.imagem))
    await fsPromises.unlink(filePath)
  } catch (err) {
    console.error('Erro ao deletar imagem:', err)
  }
}

    await post.deleteOne()
    res.json({ message: 'Post deletado com sucesso' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro ao deletar post' })
  }
}
