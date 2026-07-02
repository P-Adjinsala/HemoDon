import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

import Donor from "./Donor";
import Center from "./Center";
import Unit from "./Unit";

class Donation extends Model {
  declare donor?: Donor;
  declare center?: Center;
  declare units?: Unit[];
}

Donation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    donor_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    center_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    donation_date: {
      type: DataTypes.DATEONLY,
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

    volume_ml: {
      type: DataTypes.INTEGER,
      defaultValue: 450
    },

    hemoglobin: {
      type: DataTypes.DECIMAL(4, 2)
    },

    status: {
      type: DataTypes.ENUM(
        "Collected",
        "Validated",
        "Rejected"
      ),
      defaultValue: "Collected"
    },

    notes: {
      type: DataTypes.TEXT
    },

    created_at: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    tableName: "donations",
    timestamps: false
  }
);

export default Donation;