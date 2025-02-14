const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  address: { type: String, required: true },
  photos: { type: [String], default: [] },
  description: { type: String, required: true },
  perks: { type: [String], default: [] },
  extraInfo: { type: String, default: '' },
  checkIn: { type: Number, required: true },
  checkOut: { type: Number, required: true },
  maxGuests: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
}, {
  timestamps: true
});

const PlaceModel = mongoose.model('Place', placeSchema);
module.exports = PlaceModel;
