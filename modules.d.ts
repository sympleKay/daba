declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: number;
    NODE_ENV: string;
    DB_PROTOCOL: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_NAME: string;
    HASH_ALGORITHM: string;
    HASH_KEY: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_CLOUD_KEY: string;
    CLOUDINARY_CLOUD_SECRET: string;
    CLOUDINARY_CLOUD_UPLOAD_PRESET: string;
  }
}
