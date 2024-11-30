import { connectToDb } from "/utils/database";
import User from "/models/user";

export const GET = async () => {
  try {
    console.log("Connecting");
    await connectToDb();
    console.log("Connected");

    const users = await User.find();

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response("Failed to fetch users", { status: 500 });
  }
};
