import { connectToDB } from "@utils/database";
import User from "@models/user";
import Prompt from "@models/prompt";

export const GET = async (request) => {
  try {
    await connectToDB();

    // Get total number of users
    const totalUsers = await User.countDocuments();

    // Get users with the highest number of prompts
    const topUsers = await User.aggregate([
      {
        $lookup: {
          from: "prompts",
          localField: "_id",
          foreignField: "creator",
          as: "prompts",
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
          displayName: 1,
          image: 1,
          promptCount: { $size: "$prompts" },
        },
      },
      { $sort: { promptCount: -1 } },
      { $limit: 10 },
    ]);

    return new Response(JSON.stringify({ totalUsers, topUsers }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    return new Response("Failed to fetch leaderboard data", { status: 500 });
  }
};
