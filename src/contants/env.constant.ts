require("dotenv").config();

// configuration
export const PORT = parseInt(process.env.PORT) || 0;

// db env
export const DB_HOST = process.env.DB_HOST || "";
export const DB_PORT = parseInt(process.env.DB_PORT) || 80;
export const DB_USERNAME = process.env.DB_USERNAME || "";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_NAME = process.env.DB_NAME || "";

// encryption
export const HASH_ROUNDS = parseInt(process.env.HASH_ROUNDS) || 10;
export const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
export const ENCRYPTION_SALT = process.env.ENCRYPTION_SALT;

// jwt
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_VALIDITY = process.env.JWT_VALIDITY;
