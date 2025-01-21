/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { Request } from "@/models/Request";
import connectDB from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { instructorId, listingId, proposedDateTime, note } =
      await req.json();

    // Connect to database
    await connectDB();

    // Get learner's MongoDB _id using their clerkId
    const learner = await User.findOne({ clerkId: userId });
    if (!learner) {
      return NextResponse.json({ error: "Learner not found" }, { status: 404 });
    }

    // Create the request
    const newRequest = await Request.create({
      instructorId,
      learnerId: learner._id,
      listingId,
      proposedDateTime: new Date(proposedDateTime),
      note: note.trim(),
      status: "pending",
    });

    // Update both users' request arrays
    await User.findByIdAndUpdate(learner._id, {
      $push: { "requests.sent": newRequest._id },
    });

    await User.findByIdAndUpdate(instructorId, {
      $push: { "requests.received": newRequest._id },
    });

    return NextResponse.json(newRequest);
  } catch (error: any) {
    console.error("Error creating request:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create request" },
      { status: 500 }
    );
  }
}
