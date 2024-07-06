// Backend example using Express and MySQL

const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// Create a connection to the database
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Ensure this is correct for your MySQL setup
  database: "signup"
});

// Connect to the database
con.connect(function(err) {
  if (err) {
    console.error('Error connecting to database:', err.stack);
    return;
  }
  console.log("Connected to database!");
});

// Route to handle POST request for login
app.post('/login', function(req, res) {
  const { name, pass } = req.body;

  // Example query to check user credentials (adjust according to your schema)
  const query = 'SELECT * FROM user WHERE name = ? AND pass = ?';
  con.query(query, [name, pass], function(err, result) {
    if (err) {
      console.error('Error logging in:', err.stack);
      res.status(500).send('Error logging in');
      return;
    }
    if (result.length > 0) {
      // User authenticated
      res.status(200).json({ message: 'Login successful', user: result[0] });
    } else {
      // Authentication failed
      res.status(401).send('Invalid credentials');
    }
  });
});

// Start the server
const port = 5000;
app.listen(port, function() {
  console.log(`Server running at http://localhost:${port}`);
});