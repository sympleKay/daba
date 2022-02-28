import crypto from "crypto";
import fs from "fs";
import path from "path";
import jwt, { JwtPayload } from "jsonwebtoken";
import { HASH_ALGORITHM, HASH_KEY } from "./env.util";

export class AuthMiddlewareService {
  public static async Auth(token: string) {
    const _token: string = token?.split(" ")[1] as string;
    if (!_token) {
      throw new Error("Invalid token");
    }

    const encryptedData = _token.split("_$");
    const iv = Buffer.from(encryptedData[2], "hex");
    const encryptText = Buffer.from(encryptedData[1], "hex");

    const secretKey = crypto.scryptSync(HASH_KEY, "salt", 32);
    const decipher = crypto.createDecipheriv(HASH_ALGORITHM, secretKey, iv);
    let decrypted = decipher.update(encryptText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    const tokenBearer = decrypted.toString();
    return tokenBearer;
  }
  public static async verifyToken(jwtToken: string) {
    const privateKey = fs.readFileSync(path.resolve("./jwt-key"));
    const verify: JwtPayload | string = jwt.verify(jwtToken, privateKey);
    if (verify) {
      return verify;
    } else {
      return new Error("Invalid token provided");
    }
  }
}
