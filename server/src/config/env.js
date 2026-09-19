import dotenv from "dotenv";

dotenv.config();

const env = {
  port: process.env.PORT || 5000,

  nodeEnv: process.env.NODE_ENV || "development",

  databaseUrl: process.env.DATABASE_URL,

  jwtSecret: process.env.JWT_SECRET,

  adminUsername: process.env.ADMIN_USERNAME,

  adminPassword: process.env.ADMIN_PASSWORD,
};

export default env;