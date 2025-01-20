import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema(
  {
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    learnerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Listing",
    },
    proposedDateTime: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Request =
  mongoose.models.Request || mongoose.model("Request", RequestSchema);
