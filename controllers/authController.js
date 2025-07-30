export const login = (req, res) => {
  const { senha } = req.body
  console.log('Senha recebida:', senha)
  console.log('Senha esperada (env):', process.env.ADMIN_PASSWORD)

  if (senha && senha.trim() === process.env.ADMIN_PASSWORD) {
    return res.json({ token: 'seu-token-falso-ou-jwt' })
  }
  return res.status(401).json({ message: 'Senha incorreta' })
}

