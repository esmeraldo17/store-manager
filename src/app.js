const express = require('express');

const app = express();

const { productController, salesController } = require('./controllers');

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productController.getAll);

app.get('/products/:id', productController.getById);

app.get('/sales', salesController.getAll);

app.get('/sales/:id', salesController.getById);

app.post('/products', productController.createProduct);

app.post('/sales', salesController.createSales1, salesController.createSales2);

app.put('/products/:id', productController.updateProduct);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
// Comecando o Projecto
module.exports = app;