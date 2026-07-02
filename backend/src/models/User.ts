import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute
} from "sequelize";

import { sequelize } from "../config/db";
import Donor from "./Donor";
import Notification from "./Notification";
import Log from "./Log";

class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;

  declare role_id: number;

  declare first_name: string;

  declare last_name: string;

  declare email: string;

  declare phone: string | null;

  declare password_hash: string;

  declare is_active: CreationOptional<boolean>;

  declare created_at: CreationOptional<Date>;

  declare updated_at: CreationOptional<Date>;

  declare notifications?: NonAttribute<Notification[]>;

  declare logs?: NonAttribute<Log[]>;

  // ─── Association ───────────────────────
  declare donor?: NonAttribute<Donor>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true
    },

    phone: {
      type: DataTypes.STRING(30),
      allowNull: true
    },

    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },

    created_at: {
      type: DataTypes.DATE
    },

    updated_at: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    tableName: "users",
    timestamps: false
  }
);

export default User;