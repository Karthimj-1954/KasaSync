const Amenity = require('../models/Amenity');
const ActivityLog = require('../models/ActivityLog');

// @desc    Get all amenities
// @route   GET /api/amenities
// @access  Public
exports.getAmenities = async (req, res, next) => {
  try {
    const { category, search, activeOnly } = req.query;

    let query = {};
    if (activeOnly === 'true') query.isActive = true;
    if (category && category !== 'All') query.category = category;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const amenities = await Amenity.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: amenities.length,
      amenities,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single amenity
// @route   GET /api/amenities/:id
// @access  Public
exports.getAmenityById = async (req, res, next) => {
  try {
    const amenity = await Amenity.findById(req.params.id);
    if (!amenity) {
      return res.status(404).json({ success: false, message: 'Amenity not found' });
    }

    res.json({
      success: true,
      amenity,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create Amenity
// @route   POST /api/amenities
// @access  Private (Owner/Admin)
exports.createAmenity = async (req, res, next) => {
  try {
    const { name, description, category, capacity, openingTime, closingTime, rules, images } = req.body;

    const amenity = await Amenity.create({
      name,
      description,
      category: category || 'Gym',
      capacity: capacity || 20,
      openingTime: openingTime || '06:00',
      closingTime: closingTime || '22:00',
      rules: rules || [],
      images: images || [],
      createdById: req.user.id,
    });

    await ActivityLog.create({
      userId: req.user.id,
      userEmail: req.user.email,
      userRole: req.user.role,
      action: 'AMENITY_CREATED',
      entityType: 'AMENITY',
      entityId: amenity._id.toString(),
      details: `Amenity created: ${amenity.name}`,
    });

    res.status(201).json({
      success: true,
      amenity,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Amenity
// @route   PUT /api/amenities/:id
// @access  Private (Owner/Admin)
exports.updateAmenity = async (req, res, next) => {
  try {
    const amenity = await Amenity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!amenity) {
      return res.status(404).json({ success: false, message: 'Amenity not found' });
    }

    res.json({
      success: true,
      amenity,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Amenity
// @route   DELETE /api/amenities/:id
// @access  Private (Owner/Admin)
exports.deleteAmenity = async (req, res, next) => {
  try {
    const amenity = await Amenity.findByIdAndDelete(req.params.id);
    if (!amenity) {
      return res.status(404).json({ success: false, message: 'Amenity not found' });
    }

    res.json({
      success: true,
      message: 'Amenity deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
