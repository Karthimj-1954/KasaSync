const express = require('express');
const router = express.Router();
const { getUsers, updateUserRole, getActivityLogs } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect);

router.get('/', authorize('Admin'), getUsers);
router.put('/:id/role', authorize('Admin'), updateUserRole);
router.get('/activity-logs', authorize('Admin'), getActivityLogs);

module.exports = router;
