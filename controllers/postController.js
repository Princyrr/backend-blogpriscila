import nodemailer from 'nodemailer'
import { v2 as cloudinary } from 'cloudinary'
import Post from '../models/Post.js'
import { Types } from 'mongoose' // para validar ObjectId
import mongoose from 'mongoose'


// 🔎 Listar posts
export const listarPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 })
    res.json(posts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro ao listar posts' })
  }
}

// ➕ Criar novo post
export const criarPost = async (req, res) => {
  try {
    const { conteudo } = req.body
    const imagemUrl = req.file ? req.file.path : null
    const imagemId = req.file ? req.file.filename || req.file.public_id : null

    const novoPost = new Post({ conteudo, imagemUrl, imagemId, comments: [] })
    await novoPost.save()

    res.status(201).json(novoPost)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro ao criar post' })
  }
}

// ❌ Deletar post
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

// ❤️ Curtir post
export const curtirPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ message: 'Post não encontrado' })

    post.likes += 1
    await post.save()

    res.json({ likes: post.likes })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro ao curtir post' })
  }
}

// 💬 Comentar post - atualizando para salvar objeto { _id, nome, texto }
export const comentarPost = async (req, res) => {
  try {
    const { id } = req.params
    const { nome, texto } = req.body

    if (!nome || !texto) {
      return res.status(400).json({ message: 'Nome e texto são obrigatórios' })
    }

    const post = await Post.findById(id)
    if (!post) return res.status(404).json({ message: 'Post não encontrado' })

   const novoComentario = {
  _id: new mongoose.Types.ObjectId(),
  nome,
  texto,
  aprovado: false // 👈 agora sim!
}


    post.comments.push(novoComentario)
    await post.save()

   // Configuração do Nodemailer (usar variáveis de ambiente)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // ou outro serviço que preferir
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER, // e-mail que vai receber a notificação
      subject: `Novo comentário no seu blog`,
      text: `
        Olá,

        O usuário "${nome}" comentou no seu post:

        "${texto}"

        No post: "${post.conteudo}"

        Atenciosamente,
        Seu Blog
      `
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Erro ao enviar e-mail:', error)
      } else {
        console.log('E-mail enviado:', info.response)
      }
    })

    res.status(201).json({ message: 'Comentário adicionado', comments: post.comments })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro ao adicionar comentário' })
  }
}




export const deletarComentario = async (req, res) => {
  try {
    const postId = req.params.id
    const commentId = req.params.commentId

    if (!Types.ObjectId.isValid(postId) || !Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: 'ID inválido' })
    }

    const post = await Post.findById(postId)
    if (!post) return res.status(404).json({ message: 'Post não encontrado' })

    const commentObjectId = new Types.ObjectId(commentId)

    const originalCount = post.comments.length
    post.comments = post.comments.filter(c => !c._id.equals(commentObjectId))

    if (post.comments.length === originalCount) {
      return res.status(404).json({ message: 'Comentário não encontrado' })
    }

    await post.save()

    res.json({ message: 'Comentário deletado com sucesso', comments: post.comments })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro ao deletar comentário' })
  }
}

export const loginAdmin = (req, res) => {
  const { senha } = req.body

  if (senha === process.env.ADMIN_PASSWORD) {
    return res.json({ token: 'admin-token-validado' }) // pode ser qualquer string
  }

  return res.status(403).json({ message: 'Senha incorreta' })
}




export const aprovarComentario = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    if (!Types.ObjectId.isValid(postId) || !Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post não encontrado' });

    const comment = post.comments.find(c => c._id.equals(new Types.ObjectId(commentId)));

    if (!comment) return res.status(404).json({ message: 'Comentário não encontrado' });

    comment.aprovado = true;
    await post.save();

    res.json({ message: 'Comentário aprovado com sucesso', comments: post.comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao aprovar comentário' });
  }
}
