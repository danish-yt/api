// app.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// User information (hardcoded for this example)
const userId = "Danish";
const email = "dr2413@srmist.edu.in";
const rollNumber = "RA2111026030022";

// POST endpoint
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    // Validate input
    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: 'Invalid input format. Expected an array.' });
    }

    const numbers = [];
    const alphabets = [];
    
    // Process input data
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
        }
    });

    // Determine the highest alphabet
    const highestAlphabet = alphabets.length > 0 ? [alphabets.reduce((a, b) => a > b ? a : b)] : [];

  
    res.json({
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_alphabet: highestAlphabet
    });
});


app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});