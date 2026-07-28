import mongoose from 'mongoose';

const MaintenanceRequestSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignedStaffId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Emergency'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Assigned', 'In Progress', 'Completed', 'Rejected', 'Cancelled'],
      default: 'Pending',
    },
    images: [{ type: String }],
    notes: [
      {
        authorName: String,
        authorRole: String,
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.MaintenanceRequest || mongoose.model('MaintenanceRequest', MaintenanceRequestSchema);
