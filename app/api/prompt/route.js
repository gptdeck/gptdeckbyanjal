import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDB();
    const prompts = await Prompt.find({})
      .populate("creator")
      .sort({ createdAt: -1 }); // Sort by createdAt in descending order

    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
}
