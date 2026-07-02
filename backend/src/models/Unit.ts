import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute
} from "sequelize";

import { sequelize } from "../config/db";
import Donation from "./Donation";

class Unit extends Model<
  InferAttributes<Unit>,
  InferCreationAttributes<Unit>
> {
  declare id: CreationOptional<number>;

  declare donation_id: number;

  declare unit_code: string;

  declare blood_group: string;

  declare collection_date: string;

  declare expiration_date: string;

  declare status: CreationOptional<
    "Available" |
    "Reserved" |
    "Delivered" |
    "Expired"
  >;

  // ─── Association ─────────────────────────────
  declare donation?: NonAttribute<Donation>;
}

Unit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    donation_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    unit_code: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
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

    collection_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },

    expiration_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },

    status: {
      type: DataTypes.ENUM(
        "Available",
        "Reserved",
        "Delivered",
        "Expired"
      ),
      defaultValue: "Available"
    }
  },
  {
    sequelize,
    tableName: "blood_units",
    timestamps: false
  }
);

export default Unit;