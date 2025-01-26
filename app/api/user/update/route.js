import { connectToDB } from "@utils/database";
import User from "@models/user";

export const PATCH = async (request) => {
  const { userId, username, displayName } = await request.json();

  try {
    await connectToDB();

    if (!userId || !username || !displayName) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (username.length < 4) {
      return new Response(
        JSON.stringify({
          message: "Username must be at least 8 characters long",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const user = await User.findOne({ username });

    if (user) {
      return new Response(
        JSON.stringify({ message: "Username already taken" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await User.findByIdAndUpdate(userId, { username, displayName });

    return new Response(
      JSON.stringify({ message: "User updated successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
