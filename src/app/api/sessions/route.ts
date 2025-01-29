import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Session from "@/models/Session";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";
import { Request } from "@/models/Request";
import Listing from "@/models/Listing";

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
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const role = searchParams.get("role"); // 'instructor' or 'learner'

    // Build filter object
    const filter: mongoose.FilterQuery<typeof Session> = {};

    // Add role-based filtering
    if (role === "instructor") {
      filter.instructorId = currentUser._id;
    } else if (role === "learner") {
      filter.learnerId = currentUser._id;
    } else {
      // If no role specified, show sessions where user is either instructor or learner
      filter.$or = [
        { instructorId: currentUser._id },
        { learnerId: currentUser._id },
      ];
    }

    // Add date range filtering
    if (startDate || endDate) {
      filter.scheduledFor = {};
      if (startDate) filter.scheduledFor.$gte = new Date(startDate);
      if (endDate) filter.scheduledFor.$lte = new Date(endDate);
    }

    // Fetch sessions with pagination and populate user details
    const [sessions, totalSessions] = await Promise.all([
      Session.find(filter)
        .populate([
          {
            path: "instructorId",
            model: User,
            select: "username profileImageUrl",
          },
          {
            path: "learnerId",
            model: User,
            select: "username profileImageUrl",
          },
          {
            path: "requestId",
            model: Request,
            select: "title description",
          },
          {
            path: "listingId",
            model: Listing,
            select: "title description",
          },
        ])
        .sort({ scheduledFor: 1 }) // Sort by upcoming sessions
        .skip(skip)
        .limit(limit),
      Session.countDocuments(filter),
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(totalSessions / limit);

    // Return paginated results
    return NextResponse.json(
      {
        sessions,
        pagination: {
          currentPage: page,
          totalPages,
          totalSessions,
          limit,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Sessions fetch error:", error);
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
