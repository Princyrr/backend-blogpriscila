export const verificarToken = (req, res, next) => {
  const token = req.headers.authorization

  if (!token || token !== 'admin-token-123') {
    return res.status(403).json({ message: 'Acesso negado' })
  }

  next()
}
