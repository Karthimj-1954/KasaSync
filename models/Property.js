import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ['Apartment', 'Villa', 'Condo', 'Townhouse', 'Studio', 'Penthouse'],
      default: 'Apartment',
    },
    price: { type: Number, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, default: 'USA' },
    },
    bedrooms: { type: Number, required: true, default: 1 },
    bathrooms: { type: Number, required: true, default: 1 },
    areaSqFt: { type: Number, required: true },
    images: [{ type: String }],
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    status: {
      type: String,
      enum: ['Available', 'Occupied', 'Under Maintenance'],
      default: 'Available',
    },
    amenities: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Property || mongoose.model('Property', PropertySchema);
