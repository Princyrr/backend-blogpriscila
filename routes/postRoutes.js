import express from 'express'
import {
  criarPost,
  listarPosts,
  deletarPost,
  curtirPost,
  comentarPost,
  deletarComentario // ✅ nova função
} from '../controllers/postController.js'

import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import { verificarToken } from '../middleware/auth.js'


// ✅ Configurar Cloudinary
cloudinary.config({
  cloud_name: 'dqakwqz3l',
  api_key: '779676495683485',
  api_secret: 'W8PpdfEL4b57Ik4_AuSDftBA1mM'
})

// ✅ Configurar armazenamento no Cloudinary com multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'blogpriscila',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }]
  }
})

const upload = multer({ storage })

const router = express.Router()

// 🔽 Rotas principais
router.get('/', listarPosts)
router.post('/', upload.single('imagem'), criarPost)
router.delete('/:id', deletarPost)
router.post('/:id/like', curtirPost)
router.post('/:id/comment', comentarPost)
// rota para deletar comentário no backend (exemplo com Express)
router.delete('/:id/comments/:commentId', deletarComentario)


// proteger as rotas sensíveis
router.post('/', verificarToken, upload.single('imagem'), criarPost)
router.delete('/:id', verificarToken, deletarPost)
router.delete('/:id/comments/:commentId', verificarToken, deletarComentario)



export default router
