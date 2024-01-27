import express, { Router } from "express";
import UserController from "../controllers/user.controller";

class UserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
    this.configureRoutes();
  }

  private configureRoutes() {
    this.router.post("/register", UserController.register);
    this.router.post("/login", UserController.login);
  }

  public getRouter() {
    return this.router;
  }
}

export default UserRoutes;
