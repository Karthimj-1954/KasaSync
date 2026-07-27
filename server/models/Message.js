const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
    },
    maintenanceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MaintenanceRequest',
    },
    content: {
      type: String,
      required: true,
    },
    attachments: [{ type: String }],
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Message', MessageSchema);
