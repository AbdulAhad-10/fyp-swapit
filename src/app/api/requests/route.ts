import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { Request } from "@/models/Request";
import Listing from "@/models/Listing";

export async function GET() {
  try {
    // Ensure database connection
    await connectDB();

    // Authenticate the user
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find the user in the database
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find all requests where the user is either the instructor or learner
    const [sentRequests, receivedRequests] = await Promise.all([
      // Sent requests (user is learner)
      Request.find({ learnerId: user._id })
        .populate("instructorId", "username profileImageUrl")
        .populate("learnerId", "username profileImageUrl")
        .populate("listingId", "title duration")
        .sort({ createdAt: -1 }),

      // Received requests (user is instructor)
      Request.find({ instructorId: user._id })
        .populate({
          path: "instructorId",
          model: User,
          select: "username profileImageUrl",
        })
        .populate({
          path: "learnerId",
          model: User,
          select: "username profileImageUrl",
        })
        .populate({
          path: "listingId",
          model: Listing,
          select: "title duration",
        })
        .sort({ createdAt: -1 }),
    ]);

    // Return both sent and received requests
    return NextResponse.json({
      message: "Requests retrieved successfully",
      requests: {
        sent: sentRequests,
        received: receivedRequests,
      },
    });
  } catch (error) {
    console.error("Error fetching user requests:", error);

    // Type guard to check if error is an Error instance
    if (error instanceof Error) {
      // Handle specific mongoose errors
      if (error instanceof mongoose.Error) {
        return NextResponse.json(
          {
            error: "Database Error",
            details: error.message,
          },
          { status: 400 }
        );
      }

      // Handle other errors
      return NextResponse.json(
        {
          error: "Internal Server Error",
          details: error.message,
        },
        { status: 500 }
      );
    }

    // Fallback for non-Error objects
    return NextResponse.json(
      {
        error: "Unknown Error",
        details: String(error),
      },
      { status: 500 }
    );
  }
}
