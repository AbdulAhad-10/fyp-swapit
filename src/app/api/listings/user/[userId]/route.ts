//api/listings/user/[userId]/route.ts

import connectDB from "@/lib/mongodb";
import Listing from "@/models/Listing";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await connectDB();

    const userListings = await Listing.find({
      "creator.clerkId": params.userId,
    })
      .sort({ createdAt: -1 }) // Sort by newest first
      .lean(); // Convert documents to plain JavaScript objects

    return NextResponse.json({
      success: true,
      data: userListings,
    });
  } catch (error) {
    console.error("Error fetching user listings:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch user listings",
      },
      { status: 500 }
    );
  }
}
