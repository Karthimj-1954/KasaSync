const mongoose = require('mongoose');

const AmenitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Amenity name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        'Gym',
        'Swimming Pool',
        'Club House',
        'Meeting Room',
        'Parking',
        'Tennis Court',
        'Party Hall',
        'Garden',
        'Children Play Area',
        'Other',
      ],
      default: 'Gym',
    },
    capacity: {
      type: Number,
      default: 20,
    },
    openingTime: {
      type: String,
      default: '06:00',
    },
    closingTime: {
      type: String,
      default: '22:00',
    },
    rules: [{ type: String }],
    images: [{ type: String }],
    isActive: {
      type: Boolean,
      default: true,
    },
    createdById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Amenity', AmenitySchema);
