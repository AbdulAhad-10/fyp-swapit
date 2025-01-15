import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
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

    // Find all listings created by the user
    const userListings = await Listing.find({ creator: user._id })
      .populate("creator", "username email profileImageUrl")
      .sort({ createdAt: -1 });

    // Return the listings
    return NextResponse.json({
      message: "Listings retrieved successfully",
      listings: userListings,
    });
  } catch (error) {
    console.error("Error fetching user listings:", error);

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
