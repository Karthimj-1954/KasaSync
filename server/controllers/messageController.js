const Message = require('../models/Message');

// @desc    Get conversation between current user and another user
// @route   GET /api/messages/:otherUserId
// @access  Private
exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.user.id, receiverId: req.params.otherUserId },
        { senderId: req.params.otherUserId, receiverId: req.user.id },
      ],
    })
      .populate('senderId', 'name email avatar role')
      .populate('receiverId', 'name email avatar role')
      .sort({ createdAt: 1 });

    // Mark unread messages as read
    await Message.updateMany(
      { senderId: req.params.otherUserId, receiverId: req.user.id, isRead: false },
      { isRead: true, readAt: new Date() }
    );

    res.json({
      success: true,
      messages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
exports.sendMessage = async (req, res, next) => {
  try {
    const { receiverId, content, propertyId, maintenanceId, attachments } = req.body;

    if (!receiverId || !content) {
      return res.status(400).json({ success: false, message: 'Receiver ID and content are required' });
    }

    const message = await Message.create({
      senderId: req.user.id,
      receiverId,
      content,
      propertyId: propertyId || null,
      maintenanceId: maintenanceId || null,
      attachments: attachments || [],
    });

    const populated = await Message.findById(message._id)
      .populate('senderId', 'name email avatar role')
      .populate('receiverId', 'name email avatar role');

    // Socket emit to receiver
    const io = req.app.get('io');
    if (io) {
      io.to(`user_${receiverId}`).emit('message:receive', populated);
    }

    res.status(201).json({
      success: true,
      message: populated,
    });
  } catch (error) {
    next(error);
  }
};
