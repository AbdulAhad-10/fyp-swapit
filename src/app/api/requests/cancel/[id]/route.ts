import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { Request } from "@/models/Request";

export async function DELETE(
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

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const request = await Request.findOne({
      _id: requestId,
      learnerId: user._id,
      status: "pending",
    });
    if (!request) {
      return NextResponse.json(
        { error: "Request not found or not authorized to cancel" },
        { status: 404 }
      );
    }

    await Request.findByIdAndDelete(requestId);
    await User.findByIdAndUpdate(user._id, {
      $pull: { "requests.sent": requestId },
    });

    return NextResponse.json({ message: "Request cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling request:", error);
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
