import { config } from "./config/config.js";
import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const AppDataSource = new DataSource(config.db as PostgresConnectionOptions)