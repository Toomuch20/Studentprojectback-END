
const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// PostgreSQL connection settings
const pool = new Pool({
  user: 'studentprojectmanagement', // Your database username
  host: 'dpg-ct1j51dumphs738qb74g-a.oregon-postgres.render.com', // Host
  database: 'studentprojectmanagement', // Database name
  password: 'DTwgT118M1exXBA55lIXRtweo7Ese05V', // Password
  port: 5432, // Port number
});

// Route to handle form submissions
app.post('/submit', async (req, res) => {
  const { studentName, department, matricNumber, level, projectTopic } = req.body;

  try {
    const query = `
      INSERT INTO students (student_name, department, matric_number, level, project_topic)
      VALUES ($1, $2, $3, $4, $5)
    `;
    await pool.query(query, [studentName, department, matricNumber, level, projectTopic]);
    res.status(200).send('Form submitted successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving data to the database.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
