const bodyParser = require('body-parser');
const express = require('express');
const cors = require("cors")
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');


const app = express();
const port = 3000;
app.use(bodyParser.json())


app.use(cors())

// Conectar a la base de datos SQLite
const db = new sqlite3.Database('basededatos.db');

// Endpoint de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Consultar la base de datos para verificar las credenciales
  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
    if (err) {
      console.error('Error al consultar la base de datos:', err.message);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    // Verificar si se encontró un usuario con las credenciales proporcionadas
    if (!row) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Generar un token de autenticación
    const token = jwt.sign({ username: row.username }, 'clave-secreta', { expiresIn: '1h' });

    // Enviar el token como respuesta
    res.json({ token });
  });
});

// CONSULTAR USER
app.get('/user', (req, res) => {
  // Obtener el token de autorización del encabezado de la solicitud
  const token = req.headers.authorization;

  // Verificar si se proporcionó un token
  if (!token) {
    return res.status(401).json({ error: 'Token de autenticación no proporcionado' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token.split(' ')[1], 'clave-secreta');

    // Consultar la base de datos para obtener los detalles del usuario basados en el username
    db.get('SELECT * FROM users WHERE username = ?', [decoded.username], (err, row) => {
      if (err) {
        console.error('Error al consultar la base de datos:', err.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }

      // Verificar si se encontró un usuario con el username del token
      if (!row) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Responder con los detalles del usuario
      res.json({id: row.id, username: row.username }); // Puedes incluir más campos si es necesario
    });
  } catch (error) {
    // Si hay un error al verificar el token, responder con un error de autenticación
    res.status(401).json({ error: 'Token de autenticación inválido' });
  }
});


//products
app.get('/products', (req, res) => {
  // Consultar todos los productos de la base de datos
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) {
      console.error('Error al obtener los productos:', err.message);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    // Responder con los productos obtenidos
    res.json(rows);
  });
});


//COMPRA DE PRODUCTO
// Endpoint para realizar una compra
app.post('/compras', (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  // Verificar si hay suficiente stock del producto
  db.get('SELECT stock FROM products WHERE id = ?', [product_id], (err, row) => {
    if (err) {
      console.error('Error al consultar la base de datos:', err.message);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    const productStock = row.stock;
    if (productStock < quantity) {
      return res.status(400).json({ error: 'No hay suficiente stock disponible' });
    }

    // Fecha actual
    // Obtener la fecha actual
    const fechaActual = new Date().toISOString();
    // Realizar la compra
    db.run('INSERT INTO compras (user_id, product_id, quantity, fecha_compra) VALUES (?, ?, ?, ?)', [user_id, product_id, quantity, fechaActual], function(err) {
      if (err) {
        console.error('Error al realizar la compra:', err.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }

      // Actualizar el stock del producto
      const updatedStock = productStock - quantity;
      db.run('UPDATE products SET stock = ? WHERE id = ?', [updatedStock, product_id], function(err) {
        if (err) {
          console.error('Error al actualizar el stock del producto:', err.message);
          return res.status(500).json({ error: 'Error interno del servidor' });
        }

        res.json({ message: 'Compra realizada con éxito' });
      });
    });
  });
});

// Endpoint para obtener las compras de un usuario
app.get('/compras/:user_id', (req, res) => {
  const { user_id } = req.params;

  // Consultar las compras del usuario
  db.all('SELECT title, price FROM compras c, products p WHERE user_id = ? and product_id = p.id', [user_id], (err, rows) => {
    if (err) {
      console.error('Error al obtener las compras del usuario:', err.message);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    res.json(rows);
  });
});



app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
