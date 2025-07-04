import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  conteudo: { type: String, required: true },
  imagemUrl: { type: String, default: null },  // URL da imagem no Cloudinary
  imagemId: { type: String, default: null },   // public_id no Cloudinary
}, { timestamps: true })


export default mongoose.model('Post', postSchema)
