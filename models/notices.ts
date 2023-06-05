import { Model, DataTypes, CreationOptional } from "sequelize";
import sequelize from "./indexModel";

class Notice extends Model {
  declare id: CreationOptional<string>;
  declare title: string;
  declare description: string;
  declare fileDocument: Express.Multer.File | undefined;
  declare date: Date;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Notice.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull:false
    },
    description: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    fileDocument:{
        type:DataTypes.JSON,
    }
  },
  { sequelize }
);

export default Notice
