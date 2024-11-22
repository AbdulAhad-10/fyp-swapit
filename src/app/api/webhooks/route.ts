// import { Webhook } from "svix";
// import { headers } from "next/headers";
// import { WebhookEvent } from "@clerk/nextjs/server";
// import connectDB from "@/lib/mongodb";
// import User from "@/models/User";

// export async function POST(req: Request) {
//   try {
//     const SIGNING_SECRET = process.env.SIGNING_SECRET;
//     if (!SIGNING_SECRET) {
//       throw new Error(
//         "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
//       );
//     }

//     // Create new Svix instance with secret
//     const wh = new Webhook(SIGNING_SECRET);

//     // Get headers
//     const headerPayload = headers();
//     const svix_id = headerPayload.get("svix-id");
//     const svix_timestamp = headerPayload.get("svix-timestamp");
//     const svix_signature = headerPayload.get("svix-signature");

//     // If there are no headers, error out
//     if (!svix_id || !svix_timestamp || !svix_signature) {
//       return new Response("Error: Missing Svix headers", {
//         status: 400,
//       });
//     }

//     // Get body
//     const payload = await req.json();
//     const body = JSON.stringify(payload);

//     // Verify payload with headers
//     const evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     }) as WebhookEvent;

//     // Connect to MongoDB
//     await connectDB();

//     // Handle different webhook events
//     switch (evt.type) {
//       case "user.created": {
//         const { id, email_addresses, username, image_url } = evt.data;

//         const newUser = new User({
//           clerkId: id,
//           email: email_addresses[0]?.email_address,
//           username:
//             username || email_addresses[0]?.email_address?.split("@")[0],
//           profileImageUrl: image_url,
//           profileCompleted: false,
//           profile: {
//             skills_can_teach: [],
//             skills_wants_to_learn: [],
//             bio: "",
//             points: 0,
//           },
//         });

//         await newUser.save();
//         break;
//       }

//       case "user.updated": {
//         const { id, email_addresses, username, image_url } = evt.data;

//         await User.findOneAndUpdate(
//           { clerkId: id },
//           {
//             email: email_addresses[0]?.email_address,
//             username:
//               username || email_addresses[0]?.email_address?.split("@")[0],
//             profileImageUrl: image_url,
//           },
//           { new: true }
//         );
//         break;
//       }

//       case "user.deleted": {
//         const { id } = evt.data;
//         await User.findOneAndDelete({ clerkId: id });
//         break;
//       }
//     }

//     return new Response("Webhook processed successfully", { status: 200 });
//   } catch (error) {
//     console.error("Webhook error:", error);
//     return new Response(
//       `Webhook error: ${
//         error instanceof Error ? error.message : "Unknown error"
//       }`,
//       { status: 400 }
//     );
//   }
// }

//

import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    console.log("🔔 Webhook received");

    const SIGNING_SECRET = process.env.SIGNING_SECRET;
    if (!SIGNING_SECRET) {
      console.error("❌ Missing SIGNING_SECRET");
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

    // Log headers
    console.log("📨 Webhook headers:", {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature?.slice(0, 10) + "...", // Log partial signature for security
    });

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error("❌ Missing required headers");
      return new Response("Error: Missing Svix headers", {
        status: 400,
      });
    }

    // Get body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    console.log("📦 Webhook body:", body);

    // Verify payload with headers
    let evt: WebhookEvent;
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
      console.log("✅ Webhook verified");
    } catch (err) {
      console.error("❌ Webhook verification failed:", err);
      return new Response("Error: Verification failed", {
        status: 400,
      });
    }

    // Connect to MongoDB
    try {
      await connectDB();
      console.log("✅ MongoDB connected");
    } catch (err) {
      console.error("❌ MongoDB connection failed:", err);
      return new Response("Error: Database connection failed", {
        status: 500,
      });
    }

    // Handle different webhook events
    console.log("📎 Processing event type:", evt.type);

    switch (evt.type) {
      case "user.created": {
        const { id, email_addresses, username, image_url } = evt.data;
        console.log("👤 Creating new user:", id);

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
        console.log("✅ User created successfully");
        break;
      }

      case "user.updated": {
        const { id, email_addresses, username, image_url } = evt.data;
        console.log("📝 Updating user:", id);

        const updatedUser = await User.findOneAndUpdate(
          { clerkId: id },
          {
            email: email_addresses[0]?.email_address,
            username:
              username || email_addresses[0]?.email_address?.split("@")[0],
            profileImageUrl: image_url,
          },
          { new: true }
        );

        if (updatedUser) {
          console.log("✅ User updated successfully");
        } else {
          console.log("⚠️ No user found to update");
        }
        break;
      }

      case "user.deleted": {
        const { id } = evt.data;
        console.log("🗑️ Deleting user:", id);

        const deletedUser = await User.findOneAndDelete({ clerkId: id });
        if (deletedUser) {
          console.log("✅ User deleted successfully");
        } else {
          console.log("⚠️ No user found to delete");
        }
        break;
      }

      default: {
        console.log("ℹ️ Unhandled event type:", evt.type);
      }
    }

    return new Response("Webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return new Response(
      `Webhook error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      { status: 400 }
    );
  }
}
