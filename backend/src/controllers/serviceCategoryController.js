const asyncHandler = require('../utils/asyncHandler');
const ServiceCategory = require('../models/ServiceCategory');

const getServiceCategories = asyncHandler(async (req, res) => {
  const includeInactive = req.user?.role === 'admin' && req.query.includeInactive === 'true';
  const filter = includeInactive ? {} : { isActive: true };
  const services = await ServiceCategory.find(filter).sort({ name: 1 });

  res.json({
    success: true,
    data: services
  });
});

const createServiceCategory = asyncHandler(async (req, res) => {
  const service = await ServiceCategory.create(req.body);

  res.status(201).json({
    success: true,
    data: service
  });
});

const updateServiceCategory = asyncHandler(async (req, res) => {
  const service = await ServiceCategory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!service) {
    res.status(404);
    throw new Error('Service category not found');
  }

  res.json({
    success: true,
    data: service
  });
});

const deactivateServiceCategory = asyncHandler(async (req, res) => {
  const service = await ServiceCategory.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );

  if (!service) {
    res.status(404);
    throw new Error('Service category not found');
  }

  res.json({
    success: true,
    data: service
  });
});

module.exports = {
  getServiceCategories,
  createServiceCategory,
  updateServiceCategory,
  deactivateServiceCategory
};
