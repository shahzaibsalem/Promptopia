import { connectToDb } from "/utils/database";
import Prompt from "/models/prompt";

export const POST = async (req) => {
  const { post, tag, userId } = await req.json();
  try {
    await connectToDb();
    console.log(process.env.MONGODB_URI)
    console.log("hello")
    const newprompt = Prompt({
      creator: userId,
      post,
      tag,
    });
    await newprompt.save();
    return new Response(JSON.stringify(newprompt), { status: 201 });
  } catch {
    return new Response("Failed to create new prompt", { status: 500 });
  }
};
