import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  conteudo: { type: String, required: true },
  imagem: { type: String, default: null }
}, { timestamps: true })

export default mongoose.model('Post', postSchema)
