import "reflect-metadata";
import dotenv from "dotenv";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const isProd: boolean = process.env.NODE_ENV == "prod";

if (!isProd) {
  console.log("Server running in Developer Mode");
  dotenv.config();
}

export const config = {
  port: isProd ? 80 : parseInt(process.env.SERVER_PORT || "8080"),

  db: {
    type: "postgres",
    host: process.env.DB_IP,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: isProd ? false : true,
    logging: false,
    entities: isProd ? ["src/classes/**/*.js"] : ["dist/classes/**/*.ts"],
    migrations: isProd ? ["dist/migrations/**/*.js"] : ["src/migrations/**/*.ts"],
    subscribers: [],
    namingStrategy: new SnakeNamingStrategy(),
  },

  
  filesPath: {
    archiveImages: "public/data/uploads/archive/images",
    galleryImages: "public/data/uploads/gallery/images",
    libraryBooks: "public/data/uploads/library/books"
  }
};