import mongoose from 'mongoose';

const ActivityLogSchema = new mongoose.Schema(
  {
    action: { type: String, required: true },
    details: { type: String, default: '' },
    userEmail: { type: String, default: 'System' },
    entityType: { type: String, default: 'GENERAL' },
  },
  { timestamps: true }
);

export default mongoose.models.ActivityLog || mongoose.model('ActivityLog', ActivityLogSchema);
