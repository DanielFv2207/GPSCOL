import express from 'express';
import cors from 'cors';
import connection from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

//route for user registration
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.json({ message: 'All fields are required' });
    }

    const sql = 'INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)';
    connection.query(sql, [username, email, password], (err) => {
    if (err) {
        console.error('Error inserting user:', err);
        return res.json({ success: false, message: 'Error registering user' });
    }
    res.json({ success: true, message: 'User registered successfully' });
    });
});

//route for user login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ message: 'Email and password are required' });
    }

    const sql = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';
    connection.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Error querying:', err);
            return res.json({ message: 'Server error' });
        }

        if (results.length > 0) {
        // User found
            res.json({ success: true, message: 'Login successful', user: results[0] });
        } else {
        // No match with email or password
        res.json({ success: false, message: 'Invalid email or password' });
        }
    });
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));