// app/api/listings/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Listing from "@/models/Listing";
import User from "@/models/User";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: "Invalid listing ID" },
        { status: 400 }
      );
    }

    // Fetch the listing and populate creator details
    const listing = await Listing.findById(params.id)
      .populate({
        path: "creator",
        model: User,
        select: "username profileImageUrl profile.bio", // Select only needed fields
      })
      .populate({
        path: "feedback.user",
        model: User,
        select: "username profileImageUrl profile.bio",
      })
      .exec();

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: listing,
    });
  } catch (error) {
    console.error("Error fetching listing:", error);
    return NextResponse.json(
      { error: "Failed to fetch listing details" },
      { status: 500 }
    );
  }
}
