import {
    Model,
    DataTypes,
    CreationOptional,
  } from "sequelize";
  import sequelize from "./indexModel";
  
  class CDBUser extends Model {
    declare id:CreationOptional<string>;
    declare email: string;
    declare password: string;
    declare reg_id : string;
    declare isstudent: boolean;
    declare name: string;
    declare phone: string;
    declare designation : string;
    declare loc : string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
  }
  CDBUser.init(
    {
      id: {
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isstudent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      loc :{
        type: DataTypes.STRING
      },
      reg_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      designation :{
        type : DataTypes.STRING
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { sequelize }
  );
  
  export default CDBUser;
  