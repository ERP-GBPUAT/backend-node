import {
  Model,
  DataTypes,
  ForeignKey,
  HasManyGetAssociationsMixin,
} from "sequelize";
import sequelize from "./indexModel";
import Faculty from "./faculty";
import User from "./user";
import StudentLeave from "./studentLeave";

class Student extends Model {
  declare id: number;
  declare degree: string;
  declare discipline: string;
  declare fatherName: string;
  declare motherName: string;
  declare parentPhone: string;
  declare parentEmail: string;
  declare hostel: string;
  declare roomNo: number;
  declare cgpa: number;
  declare batch: number;
  declare FacultyId: ForeignKey<Faculty["id"]>;
  declare UserId: ForeignKey<User["id"]>;
  declare getLeaves: HasManyGetAssociationsMixin<StudentLeave>;
  // declare User: NonAttribute<User>;
  // declare Faculty: NonAttribute<Faculty>;
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    degree: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discipline: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fatherName: {
      type: DataTypes.STRING,
    },
    motherName: {
      type: DataTypes.STRING,
    },
    parentPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hostel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roomNo: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    cgpa: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    batch: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  { sequelize }
);

export default Student;
