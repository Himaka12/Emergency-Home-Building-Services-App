const express = require('express');
const { createRating, getWorkerRatings } = require('../controllers/ratingController');
const { authorize, protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, authorize('customer'), createRating);
router.get('/worker/:workerId', protect, getWorkerRatings);

module.exports = router;
