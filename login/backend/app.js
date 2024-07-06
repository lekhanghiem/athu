// Backend example using Express and MySQL
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// Create a connection pool to the database
const pool = mysql.createPool({
  connectionLimit: 10, // Adjust according to your requirements
  host: "localhost",
  user: "root",
  password: "", // Ensure this is correct for your MySQL setup
  database: "signup"
});

// Route to handle POST request for /user
app.post('/user', function(req, res) {
  const { name, address, email, user, pass, role } = req.body;

  // Example query to insert user into database (adjust according to your schema)
  const query = 'INSERT INTO user (user, pass, name, address, email, role) VALUES (?, ?, ?, ?, ?, ?)';
  pool.query(query, [user, pass, name, address, email, role], function(err, result) {
    if (err) {
      console.error('Error adding user:', err.stack);
      res.status(500).send('Error adding user');
      return;
    }
    // If user is added successfully, send a success message
    res.status(200).send('User added successfully');
  });
});

// Start the server
const port = 5000;
app.listen(port, function() {
  console.log(`Server running at http://localhost:${port}`);
});
