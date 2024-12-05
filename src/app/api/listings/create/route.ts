import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Listing from "@/models/Listing";

export async function POST(req: Request) {
  try {
    // Ensure database connection
    await connectDB();

    // Authenticate the user
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the request body
    const listingData = await req.json();

    // Find the user in the database
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create a new listing
    const newListing = new Listing({
      creator: user._id,
      title: listingData.title,
      description: listingData.description,
      category: listingData.category,
      duration: listingData.duration,
      language: listingData.language,
      availableDays: listingData.availableDays,
      timeFrom: listingData.timeFrom,
      timeTo: listingData.timeTo,
      timezone: listingData.timezone,
      prerequisites: listingData.prerequisites || "",
    });

    // Save the listing
    await newListing.save();

    // Add the listing to user's listingsCreated
    user.listingsCreated.push(newListing._id);
    await user.save();

    // Return the created listing
    return NextResponse.json(
      {
        message: "Listing created successfully",
        listing: newListing,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Listing creation error:", error);

    // Type guard to check if error is an Error instance
    if (error instanceof Error) {
      // Handle specific mongoose validation errors
      if (error instanceof mongoose.Error.ValidationError) {
        return NextResponse.json(
          {
            error: "Validation Error",
            details: error.errors,
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
