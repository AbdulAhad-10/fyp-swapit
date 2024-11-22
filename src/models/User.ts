import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImageUrl: {
      type: String,
      required: true,
    },
    profileCompleted: {
      type: Boolean,
      default: false,
    },
    profile: {
      skills_can_teach: [String],
      skills_wants_to_learn: [String],
      bio: String,
      points: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Basic index for common queries
UserSchema.index({ clerkId: 1 });

export default mongoose.models.User || mongoose.model("User", UserSchema);
