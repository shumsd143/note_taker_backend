import { Sequelize } from "sequelize-typescript";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from "../contants/env.constant";
import { User } from "../models/user.model";
import { Note } from "../models/note.model";
import { History } from "../models/history.model";

class DatabaseConnection {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      dialect: "mysql",
      host: DB_HOST,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      port: DB_PORT,
      database: DB_NAME,
      logging: true,
      models: [User, Note, History],
    });
  }

  public async authenticate() {
    try {
      await this.sequelize.authenticate();
      console.log("Connection has been established successfully.");
      await this.sequelize.sync();
      console.log("Database synchronized.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  public getSequelizeInstance() {
    return this.sequelize;
  }
}

export default DatabaseConnection;
