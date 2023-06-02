import { Request, Response } from "express";
import Inventory from "../../models/inventory";
import InventoryLog from "../../models/inventoryLog";

export const addItem = async (req: Request, res: Response) => {
  try {
    const { name, brand, quantity, costPerItem, category } = req.body;
    let file = req.file;
    if (!name || !brand || !quantity || !costPerItem || !category) { // || !image
      return res.status(200).json({
        status: "fail",
        data: null,
        error: "One or more mandatory field is issing",
      });
    }
    const oldItem = await Inventory.findOne({ where: { name, brand } });
    if (oldItem) {
      return res.status(200).json({
        status: "fail",
        data: null,
        error: "Item with this name and brand already exist",
      });
    }
    let item = await Inventory.create({
      name,
      brand,
      quantity,
      costPerItem,
      category,
      price: quantity * costPerItem,
      image: file,
    });
    let log = await InventoryLog.create({ itemId: item.id, change: quantity });
    return res.status(200).json({
      status: "pass",
      data: { item, log },
      error: null,
    });
  } catch (e) {
    return res.status(409).json({
      status: "fail",
      data: null,
      error: e,
    });
  }
};
export const getAllItems = async (req: Request, res: Response) => {
  try {
    let items = await Inventory.findAll();
    return res.status(200).json({
      status: "pass",
      data: items,
      error: null,
    });
  } catch (e) {
    console.log(e);
    return res.status(409).json({
      status: "fail",
      data: null,
      error: e,
    });
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.itemId;
    const item = await Inventory.findOne({
      where: {
        id: itemId,
      },
    });
    return res.status(200).json({
      status: "pass",
      data: item,
      error: null,
    });
  } catch (e) {
    return res.status(409).json({
      status: "pass",
      data: null,
      error: e,
    });
  }
};
export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { name, brand } = req.body;
    if (!name || !brand) {
      return res.status(200).json({
        status: "fail",
        data: null,
        error: "One or more mandatory field is missing",
      });
    }
    let items = await Inventory.destroy({
      where: {
        name,
        brand,
      },
    });
    return res.status(200).json({
      status: "pass",
      data: items,
      error: null,
    });
  } catch (e) {
    console.log(e);
    return res.status(409).json({
      status: "fail",
      data: null,
      error: e,
    });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    let itemId = req.body.id;
    let item = await Inventory.findOne({
      where: {
        id: itemId,
      },
    });
    if (!item) {
      return res.status(404).json({
        msg: "failure",
        data: null,
        error: "item not found",
      });
    }
    let change = req.body.quantity - item.quantity;
    let log = await InventoryLog.create({ itemId: item.id, change });
    await Inventory.update(req.body, { where: { id: itemId } });
    return res.status(200).json({
      msg: "success",
      data: log,
      error: null,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "failure",
      data: null,
      error: e,
    });
  }
};
