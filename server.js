require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const restaurantRoutes = require("./routes/restaurants");

const app = express();
app.use(express.json());

// Routes
app.use("/restaurants", restaurantRoutes);

// DB Connect + Start server
(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB Atlas");

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`✅ Server running on http://localhost:${port}`));
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
})();
