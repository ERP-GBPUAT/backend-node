import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
} from "sequelize";
import sequelize from "./indexModel";
import Faculty from "./faculty";

class EmpNoDues extends Model<
  InferAttributes<EmpNoDues>,
  InferCreationAttributes<EmpNoDues>
> {
  declare id: string;
  declare accountName: string;
  declare accountNumber: string;
  declare bankName: string;
  declare bankBranch: string;
  declare FacultyId: ForeignKey<Faculty["id"]>;
  declare status: JSON;
}

EmpNoDues.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    accountName: {
      type: DataTypes.STRING,
    },
    accountNumber: {
      type: DataTypes.STRING,
    },
    bankName: {
      type: DataTypes.STRING,
    },
    bankBranch: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.JSON,
    },
  },
  { sequelize }
);

export default EmpNoDues;
