import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    console.log("params.id " + params.id);

    const prompts = await Prompt.find({ creator: params.id })
      .populate("creator")
      .sort({ createdAt: -1 });

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("failed to fetch all prompts", { status: 500 });
  }
};
