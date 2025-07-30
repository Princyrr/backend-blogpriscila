export const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(403).json({ message: 'Acesso negado: token não fornecido' })
  }

  // authHeader esperado no formato: "Bearer admin-token-123"
  const token = authHeader.split(' ')[1]

  if (!token || token !== 'admin-token-123') {
    return res.status(403).json({ message: 'Acesso negado: token inválido' })
  }

  next()
}

