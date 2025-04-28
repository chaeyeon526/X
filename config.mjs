import dotenv from "dotenv";

dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`키${key}는 undefined`);
  }
  return value;
}
export const config = {
  jwt: {
    secretKey: required("JWT_SECRET"),
    expiresInsec: parseInt(required("JWT_EXPRESS_SEC", 86400)),
  },
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT_ROUND", 10)),
  },
  host: {
    port: parseInt(required("HOST_PORT", 8080)),
  },
};
