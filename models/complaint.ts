import { Model, DataTypes, CreationOptional } from "sequelize";
import sequelize from "./indexModel";

class Complaint extends Model {
  declare id: CreationOptional<string>;
  // declare complainant: number;
  declare status: string;
  declare level: number;
  declare rejection_note : CreationOptional<string>;
  declare forward_note : CreationOptional<string>;
  declare description: string;
  declare reg_date : string
  declare punishment: CreationOptional<string>;
  declare event_date : string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  //extra added 

  declare studentid : number;
  declare name : string;
  declare room : string;
  declare phone : string;

  declare hostel_name : string;
  declare complaint_title : string;
  declare complainee_name : string;
  declare complainee_hostel_name : string;
  declare complainee_department : string;
}

Complaint.init(
{
  id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
  },
  studentid:{
    type:DataTypes.NUMBER
  },
  status:{
      type:DataTypes.STRING,
      defaultValue:"pending"
  },
  level : {
      type:DataTypes.INTEGER,
      defaultValue:1
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
  forward_note:{
    type:DataTypes.STRING,
    defaultValue:null
   },
  punishment:{
    type : DataTypes.STRING,
    defaultValue:null
  },
  event_date:{
  type:DataTypes.STRING
  },
  name : {
    type : DataTypes.STRING
  },
  phone : {
    type : DataTypes.STRING
  },
  room : {
    type : DataTypes.STRING
  },
  hostel_name : {
    type : DataTypes.STRING
  },
  complaint_title : {
    type : DataTypes.STRING
  },
  complainee_name : {
    type : DataTypes.STRING
  },
  complainee_hostel_name : {
    type : DataTypes.STRING
  },
  complainee_department : {
    type : DataTypes.STRING
  }
  },
  { sequelize }
);

export default Complaint;
