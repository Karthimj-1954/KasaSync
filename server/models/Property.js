const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Property title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Property description is required'],
    },
    type: {
      type: String,
      enum: ['Apartment', 'Villa', 'Studio', 'Condo', 'Townhouse', 'Commercial'],
      default: 'Apartment',
    },
    price: {
      type: Number,
      required: [true, 'Monthly rental price is required'],
      min: 0,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, default: 'USA' },
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 0,
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 0,
    },
    areaSqFt: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    amenities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Amenity',
      },
    ],
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    status: {
      type: String,
      enum: ['Available', 'Occupied', 'Under Maintenance', 'Pending Approval'],
      default: 'Available',
    },
    leaseStart: Date,
    leaseEnd: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Property', PropertySchema);
