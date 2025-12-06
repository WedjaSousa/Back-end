const express = require('express');
const cors = require('cors');
const app = express();

// PORTA PARA EXPO - use 3000 que geralmente funciona
const PORT = 3000;

// CORS CONFIGURADO ESPECIALMENTE PARA EXPO iOS
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'exp://127.0.0.1:19000',
    'exp://localhost:19000',
    '*'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// DADOS
let usuarios = [
  { id: 1, nome: 'Wedja Sousa', email: 'wedjasousa@email.com', tipo: 'estudante' },
  { id: 2, nome: 'Geraldo Gomes', email: 'geraldogomes@email.com', tipo: 'professor' }
];
let nextId = 3;

// ROTAS SIMPLES
app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: '🚀 BACKEND SENAC',
    porta: PORT,
    totalUsuarios: usuarios.length
  });
});

app.get('/usuarios', (req, res) => {
  res.json({
    success: true,
    data: usuarios,
    total: usuarios.length
  });
});

app.post('/usuarios', (req, res) => {
  const { nome, email, tipo } = req.body;
  
  if (!nome || !email) {
    return res.status(400).json({
      success: false,
      error: 'Nome e email são obrigatórios'
    });
  }

  const novoUsuario = { 
    id: nextId++, 
    nome, 
    email, 
    tipo: tipo || 'estudante' 
  };
  
  usuarios.push(novoUsuario);
  
  res.json({
    success: true,
    data: novoUsuario,
    message: 'Usuário criado com sucesso'
  });
});

app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  usuarios = usuarios.filter(u => u.id !== id);
  
  res.json({
    success: true,
    message: 'Usuário removido com sucesso'
  });
});

// INICIAR
app.listen(PORT, '0.0.0.0', () => {
  console.log('='.repeat(50));
  console.log('🚀 BACKEND CONFIGURADO');
  console.log('='.repeat(50));
  console.log(`📍 Porta: ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📱 Expo: exp://127.0.0.1:19000`);
  console.log('='.repeat(50));
});