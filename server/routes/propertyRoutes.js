const express = require('express');
const router = express.Router();
const {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  assignTenant,
} = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/', getProperties);
router.get('/:id', getPropertyById);

router.post('/', protect, authorize('Property Owner', 'Admin'), createProperty);
router.put('/:id', protect, authorize('Property Owner', 'Admin'), updateProperty);
router.delete('/:id', protect, authorize('Property Owner', 'Admin'), deleteProperty);
router.put('/:id/assign-tenant', protect, authorize('Property Owner', 'Admin'), assignTenant);

module.exports = router;
