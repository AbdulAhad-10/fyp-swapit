// app/api/requests/cleanup/route.ts
import connectDB from "@/lib/mongodb";
import { Request } from "@/models/Request";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const expirationThreshold = 7; // days
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - expirationThreshold);

    const result = await Request.deleteMany({
      status: "expired",
      createdAt: { $lt: cutoffDate },
    });

    return NextResponse.json(
      {
        message: "Expired requests cleaned up",
        deletedCount: result.deletedCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Request cleanup error:", error);
    return NextResponse.json(
      {
        error: "Failed to clean up expired requests",
      },
      { status: 500 }
    );
  }
}
