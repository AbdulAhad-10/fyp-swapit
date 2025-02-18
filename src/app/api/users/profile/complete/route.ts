import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bio, skills_can_teach, skills_wants_to_learn } = await req.json();

    // Basic validation
    if (!bio || bio.trim().length < 10) {
      return NextResponse.json(
        { error: "Bio must be at least 10 characters long" },
        { status: 400 }
      );
    }

    if (skills_can_teach.length === 0 && skills_wants_to_learn.length === 0) {
      return NextResponse.json(
        { error: "Please add at least one skill to teach or learn" },
        { status: 400 }
      );
    }

    await connectDB();

    // Update user profile
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: userId },
      {
        profileCompleted: true,
        profile: {
          bio,
          skills_can_teach,
          skills_wants_to_learn,
          points: 0, // Default value
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Profile completed successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error completing profile:", error);
    return NextResponse.json(
      { error: "Failed to complete profile" },
      { status: 500 }
    );
  }
}
