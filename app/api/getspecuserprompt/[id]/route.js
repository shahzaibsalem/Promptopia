import { connectToDb } from "/utils/database";
import Prompt from "/models/prompt";

export const GET = async (res, { params }) => {
  try {
    await connectToDb();
    const posts = await Prompt.find({ creator: params.id }).populate("creator");
    if (!posts) return new Response("No post found", { status: 404 });
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch {
    return new Response("Failed to create new prompt", { status: 500 });
  }
};