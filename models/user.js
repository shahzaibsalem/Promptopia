import { Schema, model, models } from "mongoose";

const Userschema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?![_.])[a-zA-Z0-9._]{8,20}(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique! It must not start or end with underscores or periods, and must not have consecutive underscores or periods.",
    ],
    validate: {
      validator: async function (value) {
        // Check for consecutive underscores/periods (this ensures there's no more than one underscore/period in a row)
        if (/([_.])\1/.test(value)) {
          throw new Error(
            "Username cannot contain consecutive underscores or periods."
          );
        }
        return true;
      },
      message: "Username cannot contain consecutive underscores or periods.",
    },
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", Userschema);
export default User;
