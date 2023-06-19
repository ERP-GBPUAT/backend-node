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
  declare id: string;
  declare session: string;
  declare number: number;
  declare subjects: NonAttribute<Subject[]>;
  declare FacultyId: ForeignKey<Faculty["id"]>;
}

Semester.init(
  {
    id: {
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
    }
  },
  { sequelize }
);

export default Semester;
