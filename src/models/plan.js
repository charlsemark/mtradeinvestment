
import mongoose from 'mongoose';

// const { Schema } = mongoose;

const PlanSchema = new mongoose.Schema(
  {
    planName: {
      type: String,
      required: true,
    },
    minPrice: {
      type: Number,
      required: true,
    },
    maxPrice: {
      type: Number,
      required: true,
    },
    roiPeriod: {
      type: String,
      required: true,
    },
    roi: {
      type: Number,
      required: true,
    },
    period: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const Plan = mongoose.models['Plan'] || mongoose.model('Plan', PlanSchema);

export default Plan;
