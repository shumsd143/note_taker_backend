import { compare, hash } from "bcryptjs";
import {
  AutoIncrement,
  BeforeCreate,
  Column,
  DefaultScope,
  IsEmail,
  Model,
  NotEmpty,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { HASH_ROUNDS } from "../contants/env.constant";
import { DataTypes } from "sequelize";

@Table({
  timestamps: true,
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataTypes.INTEGER })
  id: number;

  @Column({ type: DataTypes.STRING })
  name: string;

  @IsEmail
  @NotEmpty
  @Column({ type: DataTypes.STRING, unique: true })
  email: string;

  @NotEmpty
  @Column({ type: DataTypes.STRING, unique: true })
  phone: string;

  @Column({ type: DataTypes.STRING })
  password: string;

  @DefaultScope(() => ({
    attributes: ["id", "name", "email", "phone"],
  }))
  @BeforeCreate
  static async hashPassword(instance: User) {
    instance.password = await hash(instance.password, HASH_ROUNDS);
  }

  async comparePassword(plainTextPassword: string): Promise<boolean> {
    const user = await User.scope({}).findOne({
      where: { id: this.id },
      attributes: ["password"],
    });
    return await compare(plainTextPassword, user.password);
  }
}
