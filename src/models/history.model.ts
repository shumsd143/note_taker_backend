import { DataTypes } from "sequelize";
import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { User } from "./user.model";

@Table({
  timestamps: true,
})
export class History extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataTypes.INTEGER })
  id: number;

  @Column({ type: DataTypes.INTEGER })
  table_column_id: number;

  @Column({ type: DataTypes.STRING })
  table_name: string;

  @Column({ type: DataTypes.STRING })
  old_values: string;

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  changedBy: number;
}
