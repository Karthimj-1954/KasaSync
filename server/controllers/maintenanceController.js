const MaintenanceRequest = require('../models/MaintenanceRequest');
const Notification = require('../models/Notification');
const ActivityLog = require('../models/ActivityLog');

// @desc    Get all maintenance requests with role-based filtering
// @route   GET /api/maintenance
// @access  Private
exports.getMaintenanceRequests = async (req, res, next) => {
  try {
    let filter = {};

    if (req.user.role === 'Tenant') {
      filter.tenantId = req.user.id;
    } else if (req.user.role === 'Maintenance Staff') {
      filter.$or = [{ assignedStaffId: req.user.id }, { status: 'Pending' }, { status: 'Accepted' }];
    }

    const requests = await MaintenanceRequest.find(filter)
      .populate('propertyId', 'title address images')
      .populate('tenantId', 'name email avatar phoneNumber')
      .populate('assignedStaffId', 'name email avatar phoneNumber')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single maintenance request
// @route   GET /api/maintenance/:id
// @access  Private
exports.getMaintenanceById = async (req, res, next) => {
  try {
    const request = await MaintenanceRequest.findById(req.params.id)
      .populate('propertyId')
      .populate('tenantId', 'name email avatar phoneNumber')
      .populate('assignedStaffId', 'name email avatar phoneNumber');

    if (!request) {
      return res.status(404).json({ success: false, message: 'Maintenance request not found' });
    }

    res.json({
      success: true,
      request,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create maintenance request
// @route   POST /api/maintenance
// @access  Private (Tenant)
exports.createMaintenanceRequest = async (req, res, next) => {
  try {
    const { title, description, propertyId, priority, images } = req.body;

    const request = await MaintenanceRequest.create({
      title,
      description,
      propertyId,
      tenantId: req.user.id,
      priority: priority || 'Medium',
      images: images || [],
      notes: [
        {
          authorId: req.user.id,
          authorName: req.user.name,
          authorRole: req.user.role,
          text: `Ticket created with ${priority || 'Medium'} priority.`,
        },
      ],
    });

    const populated = await MaintenanceRequest.findById(request._id)
      .populate('propertyId', 'title address')
      .populate('tenantId', 'name email');

    // Notify Admins & Property Owners
    await Notification.create({
      userId: req.user.id,
      title: 'Maintenance Request Submitted',
      message: `Your request '${title}' has been submitted and is pending review.`,
      type: 'MAINTENANCE_UPDATE',
      link: `/maintenance/${request._id}`,
    });

    // Emit Socket.IO event if io is attached to app
    const io = req.app.get('io');
    if (io) {
      io.emit('maintenance:new', populated);
    }

    res.status(201).json({
      success: true,
      request: populated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update maintenance request status & details
// @route   PUT /api/maintenance/:id
// @access  Private (Owner/Staff/Admin)
exports.updateMaintenanceStatus = async (req, res, next) => {
  try {
    const { status, assignedStaffId, noteText, completionImages } = req.body;

    let request = await MaintenanceRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ success: false, message: 'Maintenance request not found' });
    }

    if (status) request.status = status;
    if (assignedStaffId) request.assignedStaffId = assignedStaffId;
    if (completionImages) request.completionImages = completionImages;

    if (noteText) {
      request.notes.push({
        authorId: req.user.id,
        authorName: req.user.name,
        authorRole: req.user.role,
        text: noteText,
      });
    }

    await request.save();

    const updated = await MaintenanceRequest.findById(request._id)
      .populate('propertyId', 'title address')
      .populate('tenantId', 'name email')
      .populate('assignedStaffId', 'name email');

    // Create Notification for Tenant
    await Notification.create({
      userId: request.tenantId,
      title: `Maintenance Request Status: ${request.status}`,
      message: `Your ticket '${request.title}' status changed to ${request.status}.`,
      type: 'MAINTENANCE_UPDATE',
      link: `/maintenance/${request._id}`,
    });

    // Socket real-time broadcast
    const io = req.app.get('io');
    if (io) {
      io.to(`user_${request.tenantId}`).emit('maintenance:update', updated);
      io.emit('maintenance:global_update', updated);
    }

    res.json({
      success: true,
      request: updated,
    });
  } catch (error) {
    next(error);
  }
};
