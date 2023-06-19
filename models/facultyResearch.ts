import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";
import Faculty from "./faculty";
import sequelize from "./indexModel";

class Research extends Model<
  InferAttributes<Research>,
  InferCreationAttributes<Research>
> {
  declare id: CreationOptional<string>;
  declare researchType: string;
  declare journalISBNNo: string;
  declare eISSNNo: string;
  declare pISSNNo: string;
  declare applicationNo: string;
  declare sciImpactFactor: string;
  declare authorsName: string;
  declare researchTitle: string;
  declare journalName: string;
  declare conferenceName: string;
  declare bookName: string;
  declare publishedYear: string;
  declare editionOfBook:number;
  declare volNo: number;
  declare issueNo:string;
  declare totalPageNo:string;
  declare pageNo: string;
  declare researchLink: string;
  declare FacultyId: ForeignKey<Faculty["id"]>;
}

Research.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    researchType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    journalISBNNo: {
      type: DataTypes.STRING,
      unique: true,
    },
    eISSNNo:{
      type:DataTypes.STRING,
      unique:true,
    },
    pISSNNo:{
      type:DataTypes.STRING,
      unique:true
    },
    applicationNo:{
      type:DataTypes.STRING,
      unique:true
    },
    sciImpactFactor:{
      type:DataTypes.STRING,
    },
    authorsName: {
      type: DataTypes.STRING,
    },
    researchTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    journalName: {
      type: DataTypes.STRING,
    },
    conferenceName: {
      type: DataTypes.STRING,
    },
    bookName: {
      type: DataTypes.STRING,
    },
    publishedYear: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    editionOfBook:{
      type:DataTypes.NUMBER,
    },
    volNo: {
      type: DataTypes.NUMBER,
    },
    issueNo:{
      type:DataTypes.STRING,
    },
    totalPageNo:{
      type:DataTypes.NUMBER,
    },
    pageNo: {
      type: DataTypes.STRING,
    },
    researchLink: {
      type: DataTypes.STRING,
    },
  },
  { sequelize }
);

export default Research;
