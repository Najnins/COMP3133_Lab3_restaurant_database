const express = require("express");
const Restaurant = require("../models/Restaurant");

const router = express.Router();

/**
 * (4) GET all restaurant details (all columns)
 *     http://localhost:3000/restaurants
 *
 * (6) GET selected columns + sort by restaurant_id based on sortBy query
 *     http://localhost:3000/restaurants?sortBy=ASC
 *     http://localhost:3000/restaurants?sortBy=DESC
 *
 * Rule:
 * - If sortBy is NOT provided => return ALL columns
 * - If sortBy is provided => return ONLY: id, cuisine(s), name, city, restaurant_id
 */
router.get("/", async (req, res) => {
  try {
    const sortBy = (req.query.sortBy || "").toUpperCase();

    // Requirement (4): no sortBy => all columns
    if (!sortBy) {
      const all = await Restaurant.find({});
      return res.json(all);
    }

    // Requirement (6): sortBy ASC/DESC with selected columns
    const sortOrder = sortBy === "DESC" ? -1 : 1;

    // City comes from address (city is not always present in dataset; often "borough" exists)
    // We'll map "city" as borough (common for the restaurants dataset).
    // If your data truly has address.city, change projection accordingly.
    const docs = await Restaurant.find({})
      .select("_id cuisine name borough restaurant_id") // borough used as "city"
      .sort({ restaurant_id: sortOrder });

    // Transform to match required field names: id, cuisines, name, city, restaurant_id
    const result = docs.map((d) => ({
      id: d.id,                // virtual
      cuisines: d.cuisine,     // assignment wording says "cuisines"
      name: d.name,
      city: d.borough,         // using borough as city
      restaurant_id: d.restaurant_id,
    }));

    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * (5) GET restaurants by cuisine (all columns)
 *     http://localhost:3000/restaurants/cuisine/Japanese
 *     http://localhost:3000/restaurants/cuisine/Bakery
 *     http://localhost:3000/restaurants/cuisine/Italian
 */
router.get("/cuisine/:cuisine", async (req, res) => {
  try {
    const cuisine = req.params.cuisine;

    const docs = await Restaurant.find({ cuisine }); // all columns by default
    return res.json(docs);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * (7) GET restaurants where cuisine == Delicatessen AND city != Brooklyn
 *     - select cuisines, name, city (exclude id)
 *     - sort by name ASC
 *     http://localhost:3000/restaurants/Delicatessen
 *
 * IMPORTANT: This route should come AFTER /cuisine/:cuisine
 */
router.get("/:cuisineName", async (req, res) => {
  try {
    const cuisineName = req.params.cuisineName;

    // city not equal to Brooklyn
    // Using borough as city for this dataset.
    const docs = await Restaurant.find({
      cuisine: cuisineName,
      borough: { $ne: "Brooklyn" },
    })
      .select("cuisine name borough -_id") // exclude _id
      .sort({ name: 1 });

    // rename fields to match requirement text: cuisines, name, city
    const result = docs.map((d) => ({
      cuisines: d.cuisine,
      name: d.name,
      city: d.borough,
    }));

    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
