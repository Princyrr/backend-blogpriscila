import fs from 'fs/promises' // usar promises para await

router.delete('/:id', async (req, res) => {
  console.log('Recebido DELETE para id:', req.params.id)
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ error: 'Post não encontrado' })

    if (post.imagem) {
      // Usa caminho absoluto para evitar erro de path
      const filePath = path.resolve('uploads', path.basename(post.imagem))
      try {
        await fs.unlink(filePath) // espera apagar antes de continuar
      } catch (err) {
        console.error('Erro ao apagar imagem:', err)
        // Pode optar por continuar mesmo com erro de apagar arquivo
      }
    }

    await Post.findByIdAndDelete(req.params.id)
    res.json({ message: 'Post deletado' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao deletar post' })
  }
})
