import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  NonAttribute,
} from "sequelize";

import sequelize from "./indexModel";
import User from "../models/user";
import { Semester } from "./semester";

class Faculty extends Model<
  InferAttributes<Faculty>,
  InferCreationAttributes<Faculty>
> {
  declare id: string;
  declare department: string;
  declare designation: string;
  declare qualification: string;
  declare researchInterests: string;
  declare wardenOfHostel: string;
  declare hodOfDepartment: string;
  declare deanOfCollege: boolean;
  declare bioWebLink: string;
  declare isAdvisor: boolean;
  declare UserId: ForeignKey<User["id"]>;
  declare semesters: NonAttribute<Semester[]>;
}

Faculty.init(
  {
    id: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qualification: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    researchInterests: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    wardenOfHostel: {
      type: DataTypes.STRING,
    },
    bioWebLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdvisor: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    hodOfDepartment: {
      type: DataTypes.STRING,
    },
    deanOfCollege: {
      type: DataTypes.STRING,
    },
  },
  { sequelize }
);

export default Faculty;
