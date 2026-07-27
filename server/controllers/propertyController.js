const Property = require('../models/Property');
const ActivityLog = require('../models/ActivityLog');

// @desc    Get all properties with advanced search & filters
// @route   GET /api/properties
// @access  Public
exports.getProperties = async (req, res, next) => {
  try {
    const { search, type, minPrice, maxPrice, bedrooms, bathrooms, status, city, ownerId } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'address.street': { $regex: search, $options: 'i' } },
        { 'address.city': { $regex: search, $options: 'i' } },
      ];
    }

    if (type && type !== 'All') query.type = type;
    if (status && status !== 'All') query.status = status;
    if (city) query['address.city'] = { $regex: city, $options: 'i' };
    if (bedrooms && bedrooms !== 'All') query.bedrooms = Number(bedrooms);
    if (bathrooms && bathrooms !== 'All') query.bathrooms = Number(bathrooms);
    if (ownerId) query.ownerId = ownerId;

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const properties = await Property.find(query)
      .populate('ownerId', 'name email phoneNumber avatar')
      .populate('tenantId', 'name email avatar')
      .populate('amenities')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
exports.getPropertyById = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('ownerId', 'name email phoneNumber avatar')
      .populate('tenantId', 'name email avatar')
      .populate('amenities');

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    res.json({
      success: true,
      property,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create property
// @route   POST /api/properties
// @access  Private (Owner/Admin)
exports.createProperty = async (req, res, next) => {
  try {
    const { title, description, type, price, address, bedrooms, bathrooms, areaSqFt, images, amenities, status } = req.body;

    const property = await Property.create({
      title,
      description,
      type,
      price,
      address,
      bedrooms,
      bathrooms,
      areaSqFt,
      images: images || [],
      amenities: amenities || [],
      ownerId: req.user.id,
      status: status || 'Available',
    });

    await ActivityLog.create({
      userId: req.user.id,
      userEmail: req.user.email,
      userRole: req.user.role,
      action: 'PROPERTY_CREATED',
      entityType: 'PROPERTY',
      entityId: property._id.toString(),
      details: `Property added: ${property.title}`,
    });

    res.status(201).json({
      success: true,
      property,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private (Owner/Admin)
exports.updateProperty = async (req, res, next) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    if (property.ownerId.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to edit this property' });
    }

    property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('ownerId', 'name email avatar')
      .populate('tenantId', 'name email avatar')
      .populate('amenities');

    res.json({
      success: true,
      property,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private (Owner/Admin)
exports.deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    if (property.ownerId.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this property' });
    }

    await property.deleteOne();

    res.json({
      success: true,
      message: 'Property removed successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Assign Tenant to Property
// @route   PUT /api/properties/:id/assign-tenant
// @access  Private (Owner/Admin)
exports.assignTenant = async (req, res, next) => {
  try {
    const { tenantId } = req.body;
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    property.tenantId = tenantId || null;
    property.status = tenantId ? 'Occupied' : 'Available';
    await property.save();

    res.json({
      success: true,
      property,
    });
  } catch (error) {
    next(error);
  }
};
