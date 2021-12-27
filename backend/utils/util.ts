import * as crypto from "crypto";

export const generateHashcode = (): string => {
  return crypto.createHash("sha256").digest("hex");
};
