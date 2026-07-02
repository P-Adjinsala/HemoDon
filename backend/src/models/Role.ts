import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute
} from "sequelize";

import { sequelize } from "../config/db";
import User from "./User";

class Role extends Model<
  InferAttributes<Role>,
  InferCreationAttributes<Role>
> {
  declare id: CreationOptional<number>;

  declare name: string;

  declare description: string | null;

  declare created_at: CreationOptional<Date>;

  // ─── Association ─────────────────────────────
  declare users?: NonAttribute<User[]>;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },

    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },

    created_at: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    tableName: "roles",
    timestamps: false
  }
);

export default Role;