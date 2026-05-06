const mongoose = require('mongoose');

const workerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceCategory'
      }
    ],
    experience: {
      type: String,
      default: ''
    },
    serviceAreas: [
      {
        type: String,
        trim: true
      }
    ],
    availabilityStatus: {
      type: String,
      enum: ['available', 'unavailable'],
      default: 'unavailable'
    },
    approvalStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'blocked'],
      default: 'pending'
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    profileImage: {
      type: String,
      default: ''
    },
    documents: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('WorkerProfile', workerProfileSchema);
