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

class Log extends Model<
  InferAttributes<Log>,
  InferCreationAttributes<Log>
> {
  declare id: CreationOptional<number>;

  declare user_id: number | null;

  declare action: string;

  declare entity_name: string;

  declare entity_id: number;

  declare created_at: CreationOptional<Date>;

  // ─── Association ─────────────────────────────
  declare user?: NonAttribute<User>;
}

Log.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    action: {
      type: DataTypes.STRING(255),
      allowNull: false
    },

    entity_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    entity_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    created_at: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    tableName: "logs",
    timestamps: false
  }
);

export default Log;