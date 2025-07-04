import { v2 as cloudinary } from 'cloudinary'
import Post from '../models/Post.js'

export const listarPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 })
  res.json(posts)
}

export const criarPost = async (req, res) => {
console.log('req.file:', req.file)

  const { conteudo } = req.body
  const imagemUrl = req.file ? req.file.path : null
  const imagemId = req.file ? req.file.filename || req.file.public_id : null

  const novoPost = new Post({ conteudo, imagemUrl, imagemId })
  
  await novoPost.save()
  res.status(201).json(novoPost)
}


export const deletarPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ message: 'Post não encontrado' })

    if (post.imagemId) {
      await cloudinary.uploader.destroy(post.imagemId)
    }

    await post.deleteOne()
    res.json({ message: 'Post deletado com sucesso' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro ao deletar post' })
  }
}
