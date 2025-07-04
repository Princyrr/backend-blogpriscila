import Post from '../models/Post.js'

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
