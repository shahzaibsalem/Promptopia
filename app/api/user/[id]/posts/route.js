import { connectToDb } from "/utils/database";
import Prompt from "/models/prompt";

export const GET = async (req, context) => {
  try {
    console.log("Connecting");
    await connectToDb();
    console.log("Connected");

    const { params } = context;
    const posts = await Prompt.find({ creator: params.id }).populate("creator");

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response("Failed to fetch data", { status: 500 });
  }
};
