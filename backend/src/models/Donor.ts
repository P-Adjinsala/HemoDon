import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class Donor extends Model {
  declare id: number;
  declare donor_code: string;
  declare first_name: string;
  declare last_name: string;
  declare gender: string;
  declare date_of_birth: string;
  declare blood_group: string;
  declare phone: string;
  declare email: string;
  declare city: string;
  declare region: string;
}

Donor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    donor_code: {
      type: DataTypes.STRING,
      allowNull: false
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    gender: {
      type: DataTypes.ENUM("Male", "Female"),
      allowNull: false
    },

    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },

    blood_group: {
      type: DataTypes.STRING,
      allowNull: false
    },

    phone: {
      type: DataTypes.STRING
    },

    email: {
      type: DataTypes.STRING
    },

    city: {
      type: DataTypes.STRING
    },

    region: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    tableName: "donors",
    timestamps: false
  }
);

export default Donor;