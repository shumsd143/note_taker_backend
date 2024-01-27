import express, { Router } from "express";
import NoteController from "../controllers/note.controller";
import authMiddleware from "../middlewares/auth.middleware";

class NoteRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
    this.configureRoutes();
  }

  private configureRoutes() {
    this.router.use(authMiddleware);
    this.router.post("/", NoteController.create);
    this.router.get("/", NoteController.getNotes);
    this.router.get("/:id", NoteController.getNoteById);
    this.router.put("/:id", NoteController.update);
    this.router.delete("/:id", NoteController.delete);
  }

  public getRouter() {
    return this.router;
  }
}

export default NoteRoutes;
