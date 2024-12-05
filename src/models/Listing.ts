import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    category: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    availableDays: {
      type: [String],
      required: true,
    },
    timeFrom: {
      type: String,
      required: true,
    },
    timeTo: {
      type: String,
      required: true,
    },
    timezone: {
      type: String,
      required: true,
    },
    prerequisites: {
      type: String,
      maxlength: 300,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Listing ||
  mongoose.model("Listing", ListingSchema);
