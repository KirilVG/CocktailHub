import dotenv from "dotenv";
import type { IConfig, IEnvironmentConfig } from "../types.js";

dotenv.config();

const development: IEnvironmentConfig = {
    port: Number(process.env.PORT) || 8080,
    saltRounds: 10,
    secret: process.env.SECRET || "very_secret_key",
    accessTokenExpireTime: process.env.ACCESS_TOKEN_EXPIRE_TIME || "1h",
    cookieExpireTime: Number(process.env.COOKIE_EXPIRE_TIME) || 1800000,
    connectionString: process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase"
};

const production: IEnvironmentConfig = {
    port: 80,
    saltRounds: 10,
    secret: process.env.SECRET || "very_secret_key",
    accessTokenExpireTime: process.env.ACCESS_TOKEN_EXPIRE_TIME || "1h",
    cookieExpireTime: Number(process.env.COOKIE_EXPIRE_TIME) || 1800000,
    connectionString: ""
};

const test: IEnvironmentConfig = {
    port: 4040,
    saltRounds: 10,
    secret: "very_secret_key",
    accessTokenExpireTime: "1h",
    cookieExpireTime: 1800000,
    connectionString: "mongodb://localhost:27017/mydatabase"
};

const config: IConfig = { development, production, test };

export default config;