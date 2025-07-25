import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Listing from "@/models/Listing";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
    // Ensure database connection
    await connectDB();

    // Get authenticated user
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find the user in the database
    const currentUser = await User.findOne({ clerkId: userId });
    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Parse query parameters for pagination and filtering
    const { searchParams } = new URL(req.url);

    // Pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Filtering options
    const category = searchParams.get("category") || "";
    const language = searchParams.get("language") || "";

    const search = searchParams.get("search") || "";

    // Build filter object - exclude current user's listings
    const filter: mongoose.FilterQuery<typeof Listing> = {
      creator: { $ne: currentUser._id }, // Exclude listings where creator is the current user
    };

    if (category) filter.category = category;
    if (language) filter.language = language;
    if (search) {
      filter.$or = [{ title: { $regex: search, $options: "i" } }];
    }

    // Try populating with explicit path and model
    const [listings, totalListings] = await Promise.all([
      Listing.find(filter)
        .populate({
          path: "creator",
          model: User,
          select: "username profileImageUrl",
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Listing.countDocuments(filter),
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(totalListings / limit);

    // Return paginated results
    return NextResponse.json(
      {
        listings,
        pagination: {
          currentPage: page,
          totalPages,
          totalListings,
          limit,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Listings fetch error:", error);
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { error: "Validation Error", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
