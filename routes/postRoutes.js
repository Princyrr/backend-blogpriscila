import express from 'express'
import { criarPost, listarPosts, deletarPost } from '../controllers/postController.js'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

cloudinary.config({
  cloud_name: 'dqakwqz3l',
  api_key: '779676495683485',
  api_secret: 'W8PpdfEL4b57Ik4_AuSDftBA1mM'
})

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

router.get('/', listarPosts)
router.post('/', upload.single('imagem'), criarPost)
router.delete('/:id', deletarPost)

export default router
