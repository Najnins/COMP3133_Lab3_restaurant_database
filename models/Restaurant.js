const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema(
  {
    address: {
      building: String,
      coord: [Number],
      street: String,
      zipcode: String,
    },
    borough: String,
    cuisine: String,
    grades: [
      {
        date: Date,
        grade: String,
        score: Number,
      },
    ],
    name: String,
    restaurant_id: String,
  },
  {
    collection: "Restaurants",
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Add "id" field (virtual) so API can return id easily
RestaurantSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
