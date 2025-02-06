import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Listing from "@/models/Listing";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { rating, review = "" } = await req.json();

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const listing = await Listing.findById(params.id);
    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    // Add feedback and update averages in one operation
    await Listing.updateOne({ _id: params.id }, [
      {
        $set: {
          feedback: {
            $concatArrays: [
              "$feedback",
              [
                {
                  user: user._id,
                  rating,
                  review,
                  createdAt: new Date(),
                },
              ],
            ],
          },
        },
      },
      {
        $set: {
          averageRating: {
            $round: [
              {
                $avg: "$feedback.rating",
              },
              1,
            ],
          },
          totalRatings: { $size: "$feedback" },
        },
      },
    ]);

    // After updating, fetch the updated listing to get the new averages
    const updatedListing = await Listing.findById(params.id);

    return NextResponse.json(
      {
        success: true,
        message: "Feedback submitted successfully",
        averageRating: updatedListing.averageRating,
        totalRatings: updatedListing.totalRatings,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Feedback submission error:", error);
    if (error instanceof Error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return NextResponse.json(
          {
            error: "Validation Error",
            details: error.errors,
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        {
          error: "Internal Server Error",
          details: error.message,
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        error: "Unknown Error",
        details: String(error),
      },
      { status: 500 }
    );
  }
}
