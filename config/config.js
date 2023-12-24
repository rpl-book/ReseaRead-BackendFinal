require("dotenv").config();

const config = {
  development: {
    username: process.env.DB_DEV_USERNAME || "root",
    password: process.env.DB_DEV_PASSWORD || "",
    database: process.env.DB_DEV_NAME || "researead",
    host: process.env.DB_DEV_HOST || "localhost",
    dialect: process.env.DB_DEV_DIALECT || "mariadb",
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    dialect: process.env.POSTGRES_DIALECT || "postgres",
  },
};

module.exports = config;
