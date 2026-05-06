const express = require('express');
const {
  createServiceCategory,
  deactivateServiceCategory,
  getServiceCategories,
  updateServiceCategory
} = require('../controllers/serviceCategoryController');
const { authorize, protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getServiceCategories);
router.post('/', protect, authorize('admin'), createServiceCategory);
router.patch('/:id', protect, authorize('admin'), updateServiceCategory);
router.delete('/:id', protect, authorize('admin'), deactivateServiceCategory);

module.exports = router;
