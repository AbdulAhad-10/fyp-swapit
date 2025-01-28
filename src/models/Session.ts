import mongoose, { Schema } from "mongoose";

const SessionSchema = new Schema(
  {
    requestId: {
      type: Schema.Types.ObjectId,
      ref: "Request",
      required: true,
    },
    instructorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    learnerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Listing",
    },
    title: {
      type: String,
      required: true,
    },
    scheduledFor: {
      type: Date,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    callId: {
      type: String,
      required: true,
    },
    meetingLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Session ||
  mongoose.model("Session", SessionSchema);
