import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import UserRoutes from "./routes/user.route";
import NoteRoutes from "./routes/note.route";
import DatabaseConnection from "./configs/db.config";
import { PORT } from "./contants/env.constant";
import sanitizeMiddleware from "./middlewares/sanitize.middleware";

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.configureApp();
    this.configureDatabase();
  }

  private configureApp() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(sanitizeMiddleware);
    this.app.use("/users", new UserRoutes().getRouter());
    this.app.use("/notes", new NoteRoutes().getRouter());
  }

  private configureDatabase() {
    const databaseConnection = new DatabaseConnection();
    databaseConnection.authenticate();
  }

  public startServer() {
    this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}

new App().startServer();
