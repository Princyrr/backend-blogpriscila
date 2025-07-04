import express from 'express'
import multer from 'multer'
import { criarPost, listarPosts } from '../controllers/postController.js'

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})
const upload = multer({ storage })

router.get('/', listarPosts)
router.post('/', upload.single('imagem'), criarPost)

export default router