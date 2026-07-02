import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute
} from "sequelize";

import { sequelize } from "../config/db";
import Hospital from "./Hospital";

class Request extends Model<
  InferAttributes<Request>,
  InferCreationAttributes<Request>
> {
  declare id: CreationOptional<number>;

  declare hospital_id: number;

  declare requested_group: string;

  declare quantity: number;

  declare urgency: string;

  declare patient_reference: string | null;

  declare status: string;

  declare request_date: Date;

  // ─── Association ─────────────────────────────
  declare hospital?: NonAttribute<Hospital>;
}

Request.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    hospital_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    requested_group: {
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

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    urgency: {
      type: DataTypes.ENUM(
        "Low",
        "Medium",
        "High",
        "Critical"
      ),
      defaultValue: "Medium"
    },

    patient_reference: {
      type: DataTypes.STRING,
      allowNull: true
    },

    status: {
      type: DataTypes.ENUM(
        "Pending",
        "Approved",
        "Rejected",
        "Delivered"
      ),
      defaultValue: "Pending"
    },

    request_date: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    tableName: "blood_requests",
    timestamps: false
  }
);

export default Request;