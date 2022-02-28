import { config } from "dotenv";
config();

export const NODE_ENV: string = process.env.NODE_ENV as string;
export const PORT: number | unknown = process.env.PORT as number | unknown;
export const DB_PROTOCOL: string = process.env.DB_PROTOCOL as string;
export const DB_USER: string = process.env.DB_USER as string;
export const DB_PASSWORD: string = process.env.DB_PASSWORD as string;
export const DB_HOST: string = process.env.DB_HOST as string;
export const DB_NAME: string = process.env.DB_NAME as string;
export const HASH_ALGORITHM: string = process.env.HASH_ALGORITHM as string;
export const HASH_KEY: string = process.env.HASH_KEY as string;
export const CLOUDINARY_CLOUD_NAME: string = process.env
  .CLOUDINARY_CLOUD_NAME as string;
export const CLOUDINARY_CLOUD_KEY: string = process.env
  .CLOUDINARY_CLOUD_KEY as string;
export const CLOUDINARY_CLOUD_SECRET: string = process.env
  .CLOUDINARY_CLOUD_SECRET as string;
export const CLOUDINARY_CLOUD_UPLOAD_PRESET: string = process.env
  .CLOUDINARY_CLOUD_UPLOAD_PRESET as string;
