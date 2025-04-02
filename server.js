const express = require('express');
const app = express();
const port = 3000;

// Middleware para manejar JSON
app.use(express.json());

// Lista de productos en memoria
let products = [
  { id: 1, name: "Laptop", price: 2500 },
  { id: 2, name: "Mouse", price: 50 },
  { id: 3, name: "Teclado", price: 100 }
];

// Endpoint GET /products → Devuelve todos los productos
app.get('/products', (req, res) => {
  res.json(products);
});

// Endpoint GET /products/:id → Devuelve un producto por ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(product);
});

// Endpoint POST /products → Agrega un nuevo producto
app.post('/products', (req, res) => {
  const { id, name, price } = req.body;

  // Validar si ya existe un producto con ese ID
  if (products.some(p => p.id === id)) {
    return res.status(400).json({ error: "El ID ya existe" });
  }

  // Validar datos
  if (!id || !name || price == null || typeof id !== "number" || typeof price !== "number" || typeof name !== "string") {
    return res.status(400).json({ error: "Datos inválidos" });
  }

  // Agregar el producto a la lista
  const newProduct = { id, name, price };
  products.push(newProduct);

  res.status(201).json(newProduct);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
