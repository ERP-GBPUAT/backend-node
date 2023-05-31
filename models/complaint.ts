import { Model, DataTypes, CreationOptional } from "sequelize";
import sequelize from "./indexModel";

class Complaint extends Model {
  declare id: CreationOptional<string>;
  declare complainant: number;
  declare complainee: number;
  declare status: string;
  declare level: number;
  declare rejection_note : CreationOptional<string>;
  declare description: string;
  declare reg_date : string
  declare punishment: CreationOptional<string>;
  declare event_date : string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  
}

Complaint.init(
{
  id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
  },
  complainant: {
      type: DataTypes.INTEGER,
      references: {
        model: "Students",
        key: "studentId",
      }
  },
  complainee: {
      type: DataTypes.INTEGER,
      references: {
        model: "Students",
        key: "studentId",
      }
  },
  status:{
      type:DataTypes.STRING
  },
  level : {
      type:DataTypes.INTEGER
  },
  rejection_note:{
      type:DataTypes.STRING,
      defaultValue:null
  },
  description:{
    type:DataTypes.STRING
  },
  reg_date :{
  type:DataTypes.STRING
  },
  punishment:{
    type : DataTypes.STRING,
    defaultValue:null
  },
  event_date:{
  type:DataTypes.STRING
  },
  },
  { sequelize }
);

export default Complaint;
