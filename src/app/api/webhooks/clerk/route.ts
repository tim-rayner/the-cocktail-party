/**
 * @retire - This file is not used in the project. It is a sample file to show how to create a webhook route in the project.
 */
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { createUser } from "@/app/lib/actions/createUser.action";
import User from "@/models/User";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload

  const eventType = evt.type;

  //CREAE user in mongodb

  try {
    if (eventType === "user.created") {
      const { id, email_addresses, username } = evt.data;

      const clerkUser = {
        clerkId: id,
        email: email_addresses[0].email_address,
        username: username,
        //   firstName: first_name,
        //   lastName: last_name,
        //   avatar: image_url,
      };

      const user = {
        clerkId: clerkUser.clerkId,
        email: clerkUser.email,
        //   firstName: clerkUser.firstName,
        //   lastName: clerkUser.lastName,
        username: clerkUser.username,
        //   avatar: clerkUser.avatar,
      };

      //make check if user already exists in mongodb with email address

      const existingUser = await User.findOne({ email: user.email });

      if (existingUser) {
        return NextResponse.json({
          message: "User already exists",
          user: existingUser,
        });
      } else {
        // Create the user in MongoDB using the createUser serverless function
        const newUser = await createUser(user);

        if (newUser) {
          await clerkClient.users.updateUserMetadata(id, {
            publicMetadata: {
              userId: newUser._id,
            },
          });
        }

        return NextResponse.json({
          message: "New user created successfully",
          user: newUser,
        });
      }
    }
  } catch (err) {
    console.error("Error saving user:", err);
    return new Response(JSON.stringify({ message: (err as Error).message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response("Accept", { status: 202 });
}
