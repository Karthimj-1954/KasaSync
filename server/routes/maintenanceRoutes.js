const express = require('express');
const router = express.Router();
const {
  getMaintenanceRequests,
  getMaintenanceById,
  createMaintenanceRequest,
  updateMaintenanceStatus,
} = require('../controllers/maintenanceController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getMaintenanceRequests);
router.get('/:id', getMaintenanceById);
router.post('/', createMaintenanceRequest);
router.put('/:id', updateMaintenanceStatus);

module.exports = router;
