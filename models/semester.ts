import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
  ForeignKey
} from "sequelize";

import sequelize from "./indexModel";
import Subject from "./subject";
import Faculty from "./faculty"

export class Semester extends Model<
  InferAttributes<Semester>,
  InferCreationAttributes<Semester>
> {
  declare name: string;
  declare session: string;
  declare number: number;
  declare subjects: string;
  declare FacultyId: ForeignKey<Faculty["id"]>;
}

Semester.init(
  {
    name: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    session: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subjects: {
      type: DataTypes.STRING,
      get: function () {
        return JSON.parse(this.getDataValue('subjects'));
      },
      set: function (val) {
        return this.setDataValue('subjects', JSON.stringify(val));
      },
      allowNull: false
    }
  },
  { sequelize }
);

export default Semester;
