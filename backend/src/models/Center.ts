import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  HasManyGetAssociationsMixin
} from "sequelize";
import { sequelize } from "../config/db";

class Center extends Model<
  InferAttributes<Center>,
  InferCreationAttributes<Center>
> {
  declare id: CreationOptional<number>;

  declare name: string;
  declare region: string | null;
  declare city: string | null;
  declare address: string | null;
  declare phone: string | null;
  declare email: string | null;
  declare created_at: Date;

  // associations
  declare getStocks: HasManyGetAssociationsMixin<any>;
  declare getDonations: HasManyGetAssociationsMixin<any>;
}

Center.init(
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
    tableName: "blood_centers",
    timestamps: false
  }
);

export default Center;