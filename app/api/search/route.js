import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get("q");
    const searchType = searchParams.get("type");

    await connectToDB();

    switch (searchType) {
      case "tag":
        // Search by tag only
        const tagPrompts = await Prompt.find({
          tag: { $regex: new RegExp(searchQuery, "i") },
        }).populate("creator");
        return new Response(JSON.stringify(tagPrompts), { status: 200 });

      case "username":
        // Search by username
        const usernamePrompts = await Prompt.find().populate({
          path: "creator",
          match: { username: { $regex: new RegExp(searchQuery, "i") } },
        });
        // Filter out null creators (non-matches)
        const filteredUsernamePrompts = usernamePrompts.filter(
          (prompt) => prompt.creator
        );
        return new Response(JSON.stringify(filteredUsernamePrompts), {
          status: 200,
        });

      default:
        // Search tags, usernames, and prompt text
        const tagResults = await Prompt.find({
          tag: { $regex: new RegExp(searchQuery, "i") },
        }).populate("creator");

        const usernameResults = await Prompt.find().populate({
          path: "creator",
          match: { username: { $regex: new RegExp(searchQuery, "i") } },
        });

        const promptTextResults = await Prompt.find({
          prompt: { $regex: new RegExp(searchQuery, "i") },
        }).populate("creator");

        // Combine all results and remove duplicates
        const allResults = [
          ...tagResults,
          ...usernameResults.filter((prompt) => prompt.creator),
          ...promptTextResults,
        ];

        const uniqueResults = Array.from(
          new Set(allResults.map((p) => p._id.toString()))
        ).map((id) => allResults.find((p) => p._id.toString() === id));

        return new Response(JSON.stringify(uniqueResults), { status: 200 });
    }
  } catch (error) {
    console.error("Search error:", error);
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
