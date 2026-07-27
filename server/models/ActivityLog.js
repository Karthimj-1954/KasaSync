const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    userEmail: String,
    userRole: String,
    action: {
      type: String,
      required: true,
    },
    entityType: {
      type: String,
      enum: ['USER', 'PROPERTY', 'MAINTENANCE', 'AMENITY', 'BOOKING', 'SYSTEM', 'AUTH'],
      required: true,
    },
    entityId: String,
    details: {
      type: String,
      default: '',
    },
    ipAddress: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ActivityLog', ActivityLogSchema);
