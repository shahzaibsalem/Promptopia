import { connectToDb } from "/utils/database";
import Prompt from "/models/prompt";

export const GET = async (res, { params }) => {
  try {
    const { id } = await params;
    await connectToDb();
    const posts = await Prompt.findById(id).populate("creator");
    if (!posts) return new Response("No post found", { status: 404 });
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch {
    return new Response("Failed to create new prompt", { status: 500 });
  }
};
export const PATCH = async (request, { params }) => {
  const { id } = await params;
  const { post, tag } = await request.json();
  try {
    await connectToDb();
    const existing_prompt = await Prompt.findById(id);
    if (!existing_prompt) {
      return new Response("No prompt found", { status: 404 });
    }

    existing_prompt.post = post;
    existing_prompt.tag = tag;

    await existing_prompt.save();

    return new Response(JSON.stringify(existing_prompt), { status: 200 });
  } catch (error) {
    console.error("Error updating prompt:", error);
    return new Response("Failed to update prompt", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  if (!params || !params.id) {
    return new Response("ID is undefined", { status: 400 });
  }
  const { id } = params;
  try {
    await connectToDb();
    const result = await Prompt.findByIdAndDelete(id);
    if (!result) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
