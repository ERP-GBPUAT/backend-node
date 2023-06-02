import { Request, Response } from "express";
import InventoryLog from "../../models/inventoryLog"

export const getLogsByItemId = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.itemId;
    const logs = await InventoryLog.findAll({
      where: {
        itemId
      }
    })
    return res.status(200).json({
      msg: "success",
      data: logs,
      error: null
    })
  } catch (e) {
    return res.status(500).json({
      msg: "failure",
      data: null,
      error: e
    })
  }
}
