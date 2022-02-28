import { Schema, model } from "mongoose";
import { UserInterface } from "../utils/interface.util";

export const User = model(
  "User",
  new Schema<UserInterface>(
    {
      firstName: {
        type: String,
        required: true,
        lowercase: true,
        length: 50,
      },
      lastName: {
        type: String,
        required: true,
        lowercase: true,
        length: 50,
      },
      fullName: {
        type: String,
        lowercase: true,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      username: {
        type: String,
        required: true,
        unique: true,
      },
      photo: {
        type: String,
      },
      bio: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      lastLogin: {
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  )
);
