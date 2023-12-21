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
    username: process.env.DB_PROD_USER,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD_DATABASE,
    host: process.env.DB_PROD_HOST,
    dialect: process.env.DB_PROD_DIALECT || "postgres",
  },
};

module.exports = config;
