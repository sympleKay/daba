import fs from "fs";
import path from "path";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 } from "cloudinary";
import {
  UserInterface,
  UserLoginInterface,
  AuthUserInterface,
} from "../utils/interface.util";
import { User } from "../models/user.model";
import {
  HASH_ALGORITHM,
  HASH_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_CLOUD_KEY,
  CLOUDINARY_CLOUD_SECRET,
} from "../utils/env.util";
import { AuthMiddlewareService } from "../utils/middleware.util";

v2.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_CLOUD_KEY,
  api_secret: CLOUDINARY_CLOUD_SECRET,
});
export class UserAuthService {
  public static async registerUser(data: UserInterface) {
    const user = await User.findOne({ email: data.email });
    if (user) {
      return new Error("User already exist");
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(data.password, salt);
    let imageUrl;

    if (data.photo) {
      const image = await v2.uploader.upload(data.photo, {
        overwrite: true,
      });
      imageUrl = image.secure_url;
    }
    const newUser = new User({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      username: data.username,
      password: hashPassword,
      bio: data.bio,
      photo: imageUrl ? imageUrl : null,
      fullName: `${data.firstName} ${data.lastName}`,
    });

    const saveUser = await newUser.save();
    if (saveUser) {
      return "User created succesfully";
    }
    return new Error("User account could not be created");
  }

  public static async loginUser(data: UserLoginInterface) {
    try {
      const { email, password } = data;
      const user = await User.findOne({ email });
      if (!user) {
        return new Error("Invalid Credentials");
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return new Error("Invalid Credentials");
      }

      const privateKey = fs.readFileSync(path.resolve("./jwt-key"));

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        Buffer.from(privateKey),
        { expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 }
      );

      const algorithm = HASH_ALGORITHM;
      const secretKey = crypto.scryptSync(HASH_KEY, "salt", 32);
      const iv = crypto.randomBytes(16);

      const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
      let encrypt = cipher.update(token);
      encrypt = Buffer.concat([encrypt, cipher.final()]);

      user.lastLogin = new Date(Date.now());
      await user.save();

      return {
        email: user.email,
        accessToken: `daba_tech_key_$${encrypt.toString("hex")}_$${iv.toString(
          "hex"
        )}`,
      };
    } catch (error: any) {
      return new Error(error);
    }
  }

  public static async currentUser(data: any) {
    try {
      const decodeToken = await AuthMiddlewareService.Auth(data.token);
      const auth: AuthUserInterface = (await AuthMiddlewareService.verifyToken(
        decodeToken
      )) as AuthUserInterface;
      const user: UserInterface = (await User.findById(
        auth.id
      )) as UserInterface;
      const currentUser: UserInterface = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        lastLogin: user.lastLogin,
        fullName: user.fullName,
        username: user.username,
        bio: user.bio,
        photo: user.photo,
        password: user.password,
        createdAt: user.createdAt,
      };
      return currentUser;
    } catch (error: any) {
      return new Error(error);
    }
  }

  public static async updateUser(data: UserInterface, context: any) {
    try {
      const decodeToken = await AuthMiddlewareService.Auth(context.token);
      const auth: AuthUserInterface = (await AuthMiddlewareService.verifyToken(
        decodeToken
      )) as AuthUserInterface;
      const user = await User.findById(auth.id);
      if (!user) {
        return new Error("User does not exist");
      }
      const { email, firstName, lastName, username, password, bio, photo } =
        data;

      const salt = bcrypt.genSaltSync(10);

      let imageUrl;

      if (photo) {
        const image = await v2.uploader.upload(photo, {
          overwrite: true,
        });
        imageUrl = image.secure_url;
      }

      user.firstName = firstName ? firstName : user.firstName;
      user.lastName = lastName ? lastName : user.lastName;
      user.email = email ? email : user.email;
      user.username = username ? username : user.username;
      user.photo = imageUrl ? imageUrl : user.photo;
      user.fullName =
        firstName || lastName
          ? `${firstName ? firstName : user.firstName} ${
              lastName ? lastName : user.lastName
            }`
          : user.fullName;
      user.bio = bio ? bio : user.bio;
      user.password = password
        ? await bcrypt.hash(password, salt)
        : user.password;

      const saveUser = await user.save();
      if (saveUser) {
        return saveUser;
      }
      return new Error("User account could not be updated");
    } catch (error: any) {
      return new Error(error);
    }
  }
}
