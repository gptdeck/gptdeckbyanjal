import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get("q");
  const searchType = searchParams.get("type"); // 'tag' or 'username'

  try {
    await connectToDB();

    let searchCriteria = {};

    if (searchType === "tag") {
      searchCriteria = {
        tag: { $regex: searchQuery, $options: "i" },
      };
    } else if (searchType === "username") {
      searchCriteria = {
        "creator.username": { $regex: searchQuery, $options: "i" },
      };
    } else {
      // Search in both tags and usernames
      searchCriteria = {
        $or: [
          { tag: { $regex: searchQuery, $options: "i" } },
          { "creator.username": { $regex: searchQuery, $options: "i" } },
        ],
      };
    }

    const prompts = await Prompt.find(searchCriteria)
      .populate("creator")
      .sort({ createdAt: -1 });

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
