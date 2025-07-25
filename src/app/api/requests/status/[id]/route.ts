import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { Request } from "@/models/Request";
import Session from "@/models/Session";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const requestId = params.id;
    if (!requestId) {
      return NextResponse.json(
        { error: "Request ID is required" },
        { status: 400 }
      );
    }

    const { status, callId, title, duration, listingId } = await req.json();
    if (
      !status ||
      !["pending", "accepted", "rejected", "expired"].includes(status)
    ) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const request = await Request.findOne({ _id: requestId });
    if (!request) {
      return NextResponse.json(
        { error: "Request not found or not authorized" },
        { status: 404 }
      );
    }

    if (request.status === "accepted" && status !== "expired") {
      return NextResponse.json(
        { error: "Cannot change status of an accepted request" },
        { status: 400 }
      );
    }

    request.status = status;
    await request.save();

    // Create session if request is accepted
    if (status === "accepted" && callId) {
      const session = await Session.create({
        requestId: request._id,
        instructorId: request.instructorId,
        learnerId: request.learnerId,
        listingId: listingId._id,
        title: title,
        scheduledFor: request.proposedDateTime,
        duration: duration,
        callId,
      });

      return NextResponse.json({
        message: "Request accepted and session created",
        updatedRequest: request,
        session,
      });
    }

    return NextResponse.json({
      message: "Request status updated successfully",
      updatedRequest: request,
    });
  } catch (error) {
    console.error("Error updating request status:", error);
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
