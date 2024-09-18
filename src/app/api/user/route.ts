"use server";
import User from "@/models/User";

//get all users
export async function GET(request: Request) {
  console.log("Processing GET request");

  try {
    const users = await User.find();
    console.log("Users fetched successfully");
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    return new Response(JSON.stringify({ message: (err as Error).message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request: Request) {
  console.log("Processing POST request");
  const body = await request.json();
  const user = new User(body);

  try {
    await user.save();
    console.log("User created successfully");
    return new Response(
      JSON.stringify({ message: "User created successfully" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Error saving user:", err);
    return new Response(JSON.stringify({ message: (err as Error).message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(request: Request) {
  console.log("Processing PUT request");
  // Process a PUT request
}

export async function DELETE(request: Request) {
  console.log("Processing DELETE request");
  // Process a DELETE request
}
