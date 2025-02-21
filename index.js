const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// GET request to return operation_code
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST request to process user input
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input format" });
    }
    
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    
    const highest_alphabet = alphabets.length ? [alphabets.sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" })).pop()] : [];
    
    res.status(200).json({
      is_success: true,
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      numbers,
      alphabets,
      highest_alphabet
    });
  } catch (error) {
    res.status(500).json({ is_success: false, message: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
