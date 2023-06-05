import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey
} from "sequelize";
import sequelize from "./indexModel";
import Student from "./student";

class NoDues extends Model<
  InferAttributes<NoDues>,
  InferCreationAttributes<NoDues>
> {
  declare id: string;
  declare advisorCode: string;
  declare accountName: string;
  declare accountNumber: string;
  declare bankName: string;
  declare bankBranch: string;
  declare ledger: number;
  declare year: number;
  declare admissionFees: number;
  declare tutionFees: number;
  declare roomRent: number;
  declare tourMoney: number;
  declare fine: number;
  declare miscCharges: number;
  declare foodCharges: number;
  declare other: number;
  declare totalAmount: number;
  declare tour1: string;
  declare year1: number;
  declare lf1: number;
  declare amount1: number;
  declare tour2: string;
  declare year2: number;
  declare lf2: number;
  declare amount2: number;
  declare tour3: string;
  declare year3: number;
  declare lf3: number;
  declare amount3: number;
  declare foodAdvance: number;
  declare foodCharges2: number;
  declare other2: number;
  declare balance: number;
  declare status: JSON;
  declare StudentId: ForeignKey<Student["id"]>;
  // declare approved: string[];
  // declare rejected: string[];
  // declare ITDepartment: string;
  // declare CSEDepartment: string;
  // declare CEDepartment: string;
  // declare MechDepartment: string;
  // declare EEDepartment: string;
  // declare ECEDepartment: string;
  // declare IPDepartment: string;
  // declare FMPDepartment: string;
  // declare SWCDepartment: string;
  // declare PHPFEDepartment: string;
  // declare library: string;
  // declare CCF: string;
  // declare ETS: string;
  // declare physicalEducation: string;
  // declare hostelWarden: string;
  // declare accountant: string;
  // declare deanCOT: string;
  // declare comptroller: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

NoDues.init(
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
    ledger: {
      type: DataTypes.INTEGER,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    admissionFees: {
      type: DataTypes.FLOAT,
    },
    tutionFees: {
      type: DataTypes.FLOAT,
    },
    roomRent: {
      type: DataTypes.FLOAT,
    },
    tourMoney: {
      type: DataTypes.FLOAT,
    },
    fine: {
      type: DataTypes.FLOAT,
    },
    miscCharges: {
      type: DataTypes.FLOAT,
    },
    foodCharges: {
      type: DataTypes.FLOAT,
    },
    other: {
      type: DataTypes.FLOAT,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
    },
    tour1: {
      type: DataTypes.STRING,
    },
    year1: {
      type: DataTypes.INTEGER,
    },
    lf1: {
      type: DataTypes.INTEGER,
    },
    amount1: {
      type: DataTypes.INTEGER,
    },
    tour2: {
      type: DataTypes.STRING,
    },
    year2: {
      type: DataTypes.INTEGER,
    },
    lf2: {
      type: DataTypes.INTEGER,
    },
    amount2: {
      type: DataTypes.FLOAT,
    },
    tour3: {
      type: DataTypes.STRING,
    },
    year3: {
      type: DataTypes.INTEGER,
    },
    lf3: {
      type: DataTypes.INTEGER,
    },
    amount3: {
      type: DataTypes.FLOAT,
    },
    foodAdvance: {
      type: DataTypes.FLOAT,
    },
    foodCharges2: {
      type: DataTypes.FLOAT,
    },
    other2: {
      type: DataTypes.FLOAT,
    },
    balance: {
      type: DataTypes.FLOAT,
    },
    status: {
      type: DataTypes.JSON,
      defaultValue: {}
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  { sequelize }
);

export default NoDues;
