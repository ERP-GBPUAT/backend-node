import { Model, DataTypes, CreationOptional } from "sequelize";
import sequelize from "./indexModel";

class InventoryLog extends Model {
  declare id: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare change: number;
  declare itemId: string;
}

InventoryLog.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    createdAt: DataTypes.DATE,
    itemId: {
      type: DataTypes.UUID,
      references: {
        model: "Inventories",
        key: "itemId",
      },
    },
    change: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  { sequelize }
);

export default InventoryLog;
