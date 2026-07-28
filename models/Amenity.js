import mongoose from 'mongoose';

const AmenitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['Gym', 'Swimming Pool', 'Parking', 'Club House', 'Meeting Room', 'Party Hall', 'Garden', 'Children Play Area', 'Sports Court'],
      required: true,
    },
    description: { type: String, default: '' },
    capacity: { type: Number, required: true, default: 20 },
    openingTime: { type: String, required: true, default: '06:00' },
    closingTime: { type: String, required: true, default: '22:00' },
    images: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Amenity || mongoose.model('Amenity', AmenitySchema);
