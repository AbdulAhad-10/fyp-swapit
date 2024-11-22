// import { Webhook } from "svix";
// import { headers } from "next/headers";
// import { WebhookEvent } from "@clerk/nextjs/server";

// export async function POST(req: Request) {
//   const SIGNING_SECRET = process.env.SIGNING_SECRET;

//   if (!SIGNING_SECRET) {
//     throw new Error(
//       "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
//     );
//   }

//   // Create new Svix instance with secret
//   const wh = new Webhook(SIGNING_SECRET);

//   // Get headers
//   const headerPayload = await headers();
//   const svix_id = headerPayload.get("svix-id");
//   const svix_timestamp = headerPayload.get("svix-timestamp");
//   const svix_signature = headerPayload.get("svix-signature");

//   // If there are no headers, error out
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response("Error: Missing Svix headers", {
//       status: 400,
//     });
//   }

//   // Get body
//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   let evt: WebhookEvent;

//   // Verify payload with headers
//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     }) as WebhookEvent;
//   } catch (err) {
//     console.error("Error: Could not verify webhook:", err);
//     return new Response("Error: Verification error", {
//       status: 400,
//     });
//   }

//   // Do something with payload
//   // For this guide, log payload to console
//   const { id } = evt.data;
//   const eventType = evt.type;
//   console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
//   console.log("Webhook payload:", body);

//   return new Response("Webhook received", { status: 200 });
// }

import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const SIGNING_SECRET = process.env.SIGNING_SECRET;
    if (!SIGNING_SECRET) {
      throw new Error(
        "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
      );
    }

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET);

    // Get headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Error: Missing Svix headers", {
        status: 400,
      });
    }

    // Get body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Verify payload with headers
    const evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;

    // Connect to MongoDB
    await connectDB();

    // Handle different webhook events
    switch (evt.type) {
      case "user.created": {
        const { id, email_addresses, username, image_url } = evt.data;

        const newUser = new User({
          clerkId: id,
          email: email_addresses[0]?.email_address,
          username:
            username || email_addresses[0]?.email_address?.split("@")[0],
          profileImageUrl: image_url,
          profileCompleted: false,
          profile: {
            skills_can_teach: [],
            skills_wants_to_learn: [],
            bio: "",
            points: 0,
          },
        });

        await newUser.save();
        break;
      }

      case "user.updated": {
        const { id, email_addresses, username, image_url } = evt.data;

        await User.findOneAndUpdate(
          { clerkId: id },
          {
            email: email_addresses[0]?.email_address,
            username:
              username || email_addresses[0]?.email_address?.split("@")[0],
            profileImageUrl: image_url,
          },
          { new: true }
        );
        break;
      }

      case "user.deleted": {
        const { id } = evt.data;
        await User.findOneAndDelete({ clerkId: id });
        break;
      }
    }

    return new Response("Webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(
      `Webhook error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      { status: 400 }
    );
  }
}
