const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());


// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://kazinayeem55085:kOwzxNkBQqSxcFtX@bas.w5l325e.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define a schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// Define a model
const User = mongoose.model("User", userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.post("/api/users", async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({ username, password });
    const user = await newUser.save();
    console.log("User saved:", user);
    res.status(201).json(user);
  } catch (error) {
    console.error(err);
    res.status(500).send("Error saving user");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
