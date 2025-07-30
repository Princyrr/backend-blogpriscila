export const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(403).json({ message: 'Acesso negado' })

  const token = authHeader.split(' ')[1]
  if (token !== 'admin-token-validado') {
    return res.status(403).json({ message: 'Token inválido' })
  }

  next()
}

