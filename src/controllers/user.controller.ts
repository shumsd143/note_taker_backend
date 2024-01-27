import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserService from "../services/user.service";
import { JWT_SECRET, JWT_VALIDITY } from "../contants/env.constant";

class UserController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, phone, password } = req.body;
      const user = await UserService.register(name, email, phone, password);
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await UserService.login(email, password);
      const token = jwt.sign(
        {
          userId: user.id,
        },
        JWT_SECRET,
        { expiresIn: JWT_VALIDITY },
      );
      res.status(200).json({
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Invalid credentials" });
    }
  }
}

export default UserController;
