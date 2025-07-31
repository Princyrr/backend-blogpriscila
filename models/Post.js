import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Gera ObjectId automático para cada comentário
  nome: { type: String, required: true },
  texto: { type: String, required: true },
   aprovado: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

const postSchema = new mongoose.Schema({
  conteudo: { type: String, required: true },
  imagemUrl: { type: String, default: null },  // URL da imagem no Cloudinary
  imagemId: { type: String, default: null },   // public_id no Cloudinary
  likes: { type: Number, default: 0 },         // Contador de curtidas
  comments: { type: [commentSchema], default: [] },   // Comentários como array de subdocumentos
}, { timestamps: true })

export default mongoose.model('Post', postSchema)

