import mongoose from "mongoose";

const distributionReportSchema = new mongoose.Schema({
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
    required: [true, "Transaction field is required"],
  },
  shopAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShopAgent",
    required: [true, "ShopAgent field is required"],
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: [true, "Customer field is required"],
  },
  confirmed: {
    type: Boolean,
    default: false, // Default to false, indicating not confirmed until the customer confirms receipt.
  },
  dateTime: {
    type: Date,
    default: Date.now, // Record the date and time when the distribution report is created.
  },
  notes: String, // Optional field for comments or notes about the distribution report.
  status: {
    type: String,
    enum: ["pending", "confirmed", "rejected"], // Add more statuses as needed
    default: "pending",
  },
});

// Add indexes if necessary
// distributionReportSchema.index({ field1: 1, field2: -1 });

export default mongoose.model("DistributionReport", distributionReportSchema);
