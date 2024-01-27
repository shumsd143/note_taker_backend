import { User } from "../models/user.model";

class UserService {
  static async register(
    name: string,
    email: string,
    phone: string,
    password: string,
  ) {
    return User.create({ name, email, phone, password });
  }

  static async login(email: string, password: string) {
    const user = await User.scope({}).findOne({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    return user;
  }
}

export default UserService;
