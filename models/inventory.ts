import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import sequelize from "./indexModel";

class Inventory extends Model<
  InferAttributes<Inventory>,
  InferCreationAttributes<Inventory>
> {
  // declare id: CreationOptional<string>;
  declare serialNo: string;
  declare name: string;
  declare brand: string;
  declare model: string;
  declare cost: number;
  declare category: CreationOptional<string>;
  declare damaged: boolean;
  declare damageDescription: string;
  declare description: string;
  declare image: Express.Multer.File | undefined;
  declare dateOfPurchase: Date;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
Inventory.init(
  {
    // id: {
    //   type: DataTypes.UUID,
    //   primaryKey: true,
    //   defaultValue: DataTypes.UUIDV4,
    // },
    serialNo: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.JSON,
    },
    damaged: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    damageDescription: {
      type: DataTypes.TEXT,
    },
    dateOfPurchase: {
      type: DataTypes.DATE,
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { sequelize }
);

export default Inventory;

//username
//email
//password
//phone
//type
//studentRef
//FacultyRef
//updated_at
//created_at
//access_token
//refresh_token
