import { Model, DataTypes, CreationOptional } from "sequelize";
import sequelize from "./indexModel";
import Student from "./student";

class HostelComplaint extends Model {
  declare id: CreationOptional<string>;
  // declare complainant: number;
  declare type_of_complaint : string
  declare level: number;
  declare status: string;
  declare description: string;
  declare rejection_note: CreationOptional<string>;
  declare forward_note: CreationOptional<string>;
  declare reg_date : string;  
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  //extra added 

  declare studentid : number;
  declare name : string;
  declare room : string;
  declare phone : string;
}

HostelComplaint.init(
{
  id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
  },
  // complainant: {
  //     type: DataTypes.INTEGER,
  //     references: {
  //       model: Student,
  //       key: "id",
  //     }
  // },
  type_of_complaint :{
    type:DataTypes.STRING,
  },
  level : {
    type:DataTypes.NUMBER,
    defaultValue:1
},
  status:{
      type:DataTypes.STRING,
      defaultValue:"pending"
  },
  description:{
    type:DataTypes.STRING
  },
  rejection_note:{
      type:DataTypes.STRING,
      defaultValue:null
  },
 forward_note:{
  type:DataTypes.STRING,
  defaultValue:null
 },
  reg_date:{
    type:DataTypes.STRING
  },

  // extra 

  name :{
    type : DataTypes.STRING
  },
  studentid : {
    type:DataTypes.NUMBER
  },
  room : {
    type : DataTypes.STRING
  },
  hostel_name : {
    type : DataTypes.STRING
  },
  phone : {
    type : DataTypes.STRING
  }
  },
  { sequelize }
);

export default HostelComplaint;
