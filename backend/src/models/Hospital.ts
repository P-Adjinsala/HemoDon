import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class Hospital extends Model {
  declare id: number;
  declare name: string;
  declare region: string;
  declare city: string;
  declare address: string;
  declare phone: string;
  declare email: string;
  declare created_at: Date;

  // ─── Associations ─────────────────────────────
  declare requests?: any[];
}

Hospital.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    region: {
      type: DataTypes.STRING
    },

    city: {
      type: DataTypes.STRING
    },

    address: {
      type: DataTypes.TEXT
    },

    phone: {
      type: DataTypes.STRING
    },

    email: {
      type: DataTypes.STRING
    },

    created_at: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    tableName: "hospitals",
    timestamps: false
  }
);

export default Hospital;