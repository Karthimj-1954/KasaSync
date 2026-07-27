const express = require('express');
const router = express.Router();
const {
  getAmenities,
  getAmenityById,
  createAmenity,
  updateAmenity,
  deleteAmenity,
} = require('../controllers/amenityController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/', getAmenities);
router.get('/:id', getAmenityById);

router.post('/', protect, authorize('Property Owner', 'Admin'), createAmenity);
router.put('/:id', protect, authorize('Property Owner', 'Admin'), updateAmenity);
router.delete('/:id', protect, authorize('Property Owner', 'Admin'), deleteAmenity);

module.exports = router;
