import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    const newPromt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPromt.save();

    return new Response(JSON.stringify(newPromt), { status: 201 });
  } catch (error) {
    return new Response("failed to create new prompt", { status: 500 });
  }
};
