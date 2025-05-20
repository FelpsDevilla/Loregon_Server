import "reflect-metadata";
import dotenv from "dotenv";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const isDev: boolean = process.env.NODE_ENV == undefined;

if (isDev) {
  console.log("Server running in Developer Mode");
  dotenv.config();
}

export const config = {
  port: isDev ? parseInt(process.env.SERVER_PORT || "443") : 443,

  db: {
    type: "postgres",
    host: process.env.DB_IP,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: ["src/classes/*.ts", "dist/classes/**/*.js"],
    migrations: ["src/migrations/**/*.ts", "dist/migrations/**/*.js"],
    subscribers: [],
    namingStrategy: new SnakeNamingStrategy(),
  },

  ssl: {
    keyPath: isDev ? "./SSL/ssl.key" : "/etc/ssl/loregon/ssl.key",
    certPath: isDev ? "./SSL/ssl.crt" : "/etc/ssl/loregon/ssl.crt",
  },

  filesPath: {
    archiveImages: "public/data/uploads/archive/images",
    galleryImages: "public/data/uploads/gallery/images",
    libraryBooks: "public/data/uploads/library/books"
  }
};