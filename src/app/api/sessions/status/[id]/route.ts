import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Session from "@/models/Session";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { userId } = auth();

    // Check authentication
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessionId = params.id;
    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Get status from request body
    const { status } = await req.json();
    if (!status || !["upcoming", "completed"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be either 'upcoming' or 'completed'" },
        { status: 400 }
      );
    }

    // Verify user exists
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find and verify session exists
    const session = await Session.findById(sessionId);
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Verify user is authorized (either instructor or learner of the session)
    if (
      session.instructorId.toString() !== user._id.toString() &&
      session.learnerId.toString() !== user._id.toString()
    ) {
      return NextResponse.json(
        { error: "Not authorized to update this session" },
        { status: 403 }
      );
    }

    // Update session status
    session.status = status;
    await session.save();

    return NextResponse.json({
      message: "Session status updated successfully",
      updatedSession: session,
    });
  } catch (error) {
    console.error("Error updating session status:", error);
    if (error instanceof Error) {
      if (error instanceof mongoose.Error) {
        return NextResponse.json(
          { error: "Database Error", details: error.message },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: "Internal Server Error", details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Unknown Error", details: String(error) },
      { status: 500 }
    );
  }
}
