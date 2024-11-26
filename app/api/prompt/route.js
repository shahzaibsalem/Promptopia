import { connectToDb } from "/utils/database";
import Prompt from "/models/prompt";

export const GET = async () => {
  try {
    await connectToDb();
    const posts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch {
    return new Response("Failed to create new prompt", { status: 500 });
  }
};
