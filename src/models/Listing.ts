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
    feedback: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        review: {
          type: String,
          trim: true,
          maxlength: 500,
          default: "",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to calculate average rating
ListingSchema.pre("save", function (next) {
  if (this.feedback.length > 0) {
    const totalRating = this.feedback.reduce(
      (sum, item) => sum + item.rating,
      0
    );
    this.averageRating = parseFloat(
      (totalRating / this.feedback.length).toFixed(1)
    );
    this.totalRatings = this.feedback.length;
  }
  next();
});

export default mongoose.models.Listing ||
  mongoose.model("Listing", ListingSchema);
