import GoogleProvider from "next-auth/providers/google"
import {connectToDb} from '@/utils/database'
import User from '@/models/user'
import NextAuth from "next-auth"
const handler = NextAuth({
    providers :[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
              params: {
                scope: "openid email profile",
              },
            }
        })
    ],
    async session({session}){
      const sessionUser = await User.findOne({
        email : session.user.email,
      })
      session.user.id = sessionUser._id.toString()
      return session
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
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
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
    
    // async signIn({profile}){
    //   try{
    //     await connectToDb()

    //     const userExist = await User.findOne({
    //         email : profile.email,
    //     })

    //     if(!userExist){
    //        await User.create({
    //          email : profile.email,
    //          username : profile.name.replace(" " , "").toLowerCase(),
    //          image : profile.picture,
    //         })
    //     }
    //     return true
    //   }
    //   catch(error){
    //     console.log(error)
    //     return false
    //   }
    // },
})

export {handler as GET , handler as POST}