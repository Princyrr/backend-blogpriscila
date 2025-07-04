# Backend Blog Priscila 🧠💬

Este é o backend da aplicação de blog da desenvolvedora Priscila. A API permite criar, listar e deletar publicações com suporte a upload de imagem.

## 🔧 Tecnologias

- Node.js
- Express
- MongoDB (via Mongoose)
- Multer (upload de imagens)
- Dotenv (variáveis de ambiente)
- Render (deploy)

## 🚀 Funcionalidades

- Criar post com texto e imagem (rota protegida por senha)
- Listar todos os posts
- Deletar post por ID
- Servir imagens via `/uploads`

## 🌐 Rotas

- `GET /posts` → Lista todos os posts
- `POST /posts` → Cria novo post (multipart/form-data)
- `DELETE /posts/:id` → Deleta post por ID

## 🔒 Autenticação Simples

A senha é verificada no frontend antes de permitir postagens ou exclusões.  
⚠️ *Importante: a validação da senha é feita apenas no frontend (não é segura em produção).*

## 🌍 Deploy

API publicada em:  
🔗 [https://blogpriscila.onrender.com](https://blogpriscila.onrender.com)

Frontend (Portfólio com Blog):  
🔗 [https://priscilaramonna.netlify.app](https://priscilaramonna.netlify.app)

## ✍️ Autora

Desenvolvido por [Priscila](https://github.com/Princyrr) 💻

