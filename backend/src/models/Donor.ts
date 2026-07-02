import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import User from "./User";
import { NonAttribute } from "sequelize";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
export type Gender     = "Male" | "Female";

export interface DonorAttributes {
  id:                 number;
  user_id?:           number | null;
  donor_code:         string;
  first_name:         string;
  last_name:          string;
  gender:             Gender;
  date_of_birth:      string;
  blood_group:        BloodGroup;
  weight?:            number | null;
  phone?:             string | null;
  email?:             string | null;
  region?:            string | null;
  city?:              string | null;
  address?:           string | null;
  last_donation_date?: string | null;
  is_eligible:        boolean;
  created_at?:        Date;
}

// On creation, id and created_at are auto-generated
export type DonorCreationAttributes = Optional<
  DonorAttributes,
  "id" | "user_id" | "weight" | "phone" | "email" | "region" | "city" |
  "address" | "last_donation_date" | "is_eligible" | "created_at"
>;

// ─── Model ────────────────────────────────────────────────────────────────────

class Donor extends Model<DonorAttributes, DonorCreationAttributes>
  implements DonorAttributes {

  declare id:                 number;
  declare user_id:            number | null;
  declare donor_code:         string;
  declare first_name:         string;
  declare last_name:          string;
  declare gender:             Gender;
  declare date_of_birth:      string;
  declare blood_group:        BloodGroup;
  declare weight:             number | null;
  declare phone:              string | null;
  declare email:              string | null;
  declare region:             string | null;
  declare city:               string | null;
  declare address:            string | null;
  declare last_donation_date: string | null;
  declare is_eligible:        boolean;
  declare created_at:         Date;
  declare user?: NonAttribute<User>;
}

Donor.init(
  {
    id: {
      type:          DataTypes.INTEGER,
      primaryKey:    true,
      autoIncrement: true,
    },

    user_id: {
      type:       DataTypes.INTEGER,
      allowNull:  true,
      references: { model: "users", key: "id" },
    },

    donor_code: {
      type:      DataTypes.STRING(50),
      allowNull: false,
      unique:    true,
    },

    first_name: {
      type:      DataTypes.STRING(100),
      allowNull: false,
    },

    last_name: {
      type:      DataTypes.STRING(100),
      allowNull: false,
    },

    gender: {
      type:      DataTypes.ENUM("Male", "Female"),
      allowNull: false,
    },

    date_of_birth: {
      type:      DataTypes.DATEONLY,
      allowNull: false,
    },

    blood_group: {
      type:      DataTypes.ENUM("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
      allowNull: false,
    },

    weight: {
      type:      DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },

    phone: {
      type:      DataTypes.STRING(30),
      allowNull: true,
    },

    email: {
      type:      DataTypes.STRING(150),
      allowNull: true,
    },

    region: {
      type:      DataTypes.STRING(150),
      allowNull: true,
    },

    city: {
      type:      DataTypes.STRING(150),
      allowNull: true,
    },

    address: {
      type:      DataTypes.TEXT,
      allowNull: true,
    },

    last_donation_date: {
      type:      DataTypes.DATEONLY,
      allowNull: true,
    },

    is_eligible: {
      type:         DataTypes.BOOLEAN,
      allowNull:    false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName:  "donors",
    timestamps: true,
    createdAt:  "created_at",
    updatedAt:  false,
  }
);

export default Donor;