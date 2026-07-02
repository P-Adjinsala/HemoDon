import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute
} from "sequelize";

import { sequelize } from "../config/db";
import Center from "./Center";

class Stock extends Model<
  InferAttributes<Stock>,
  InferCreationAttributes<Stock>
> {
  declare id: CreationOptional<number>;

  declare center_id: number;

  declare blood_group: string;

  declare units_available: number;

  declare critical_threshold: number;

  declare last_updated: Date;

  // ─── Association ─────────────────────────────
  declare center?: NonAttribute<Center>;
}

Stock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    center_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    blood_group: {
      type: DataTypes.ENUM(
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-"
      ),
      allowNull: false
    },

    units_available: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    critical_threshold: {
      type: DataTypes.INTEGER,
      defaultValue: 10
    },

    last_updated: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    tableName: "blood_stock",
    timestamps: false
  }
);

export default Stock;