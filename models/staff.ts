import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional
} from "sequelize";
import sequelize from "./indexModel"

class Staff extends Model<InferAttributes<Staff>, InferCreationAttributes<Staff>> {
  declare id: CreationOptional<string>;
  declare isAdmin: boolean;
  declare isLibrarian: boolean;
  declare isCCF: boolean;
}

Staff.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isLibrarian: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isCCF: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, { sequelize })

export default Staff;
