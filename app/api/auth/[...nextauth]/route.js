import GoogleProvider from "next-auth/providers/google";
import { connectToDb } from "@/utils/database";
import User from "@/models/user";
import NextAuth from "next-auth";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        const sessionUser = await User.findOne({ email: session.user.email });
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
    async signIn({ profile }) {
      try {
        console.log("Attempting to connect to DB...");
        await connectToDb();

        console.log("Finding user...");
        const userExist = await User.findOne({
          email: profile.email,
        });

        if (!userExist) {
          console.log("User not found. Creating new user...");
          const n = generateUsername(profile.name);
          await User.create({
            email: profile.email,
            username: n,
            image: profile.picture,
          });
        }

        console.log("Sign-in successful!");
        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }
    },
  },
});
const generateUsername = (name) => {
  let username = name.replace(/\s+/g, "").toLowerCase();
  if (username.length < 8) {
    username = username + Math.random().toString(36).substring(2, 6); 
  } else if (username.length > 20) {
    username = username.substring(0, 20);
  }  
  return username;
};

export { handler as GET, handler as POST };
