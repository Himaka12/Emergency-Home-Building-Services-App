const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    serviceCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ServiceCategory',
      required: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    images: [
      {
        type: String
      }
    ],
    address: {
      line1: { type: String, required: true },
      line2: { type: String, default: '' },
      city: { type: String, required: true },
      district: { type: String, default: '' },
      postalCode: { type: String, default: '' }
    },
    location: {
      latitude: { type: Number, default: null },
      longitude: { type: Number, default: null }
    },
    status: {
      type: String,
      enum: ['pending', 'assigned', 'accepted', 'in_progress', 'completed', 'cancelled'],
      default: 'pending'
    },
    visitFee: {
      type: Number,
      default: 0,
      min: 0
    },
    finalAmount: {
      type: Number,
      default: 0,
      min: 0
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'online_later'],
      default: 'cash'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Booking', bookingSchema);
