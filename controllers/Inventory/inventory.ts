import { Request, Response } from "express";
import Inventory from "../../models/inventory";

export const addItems = async (req: Request, res: Response) => {
  try {
    const { quantity, itemData } = req.body;
    let file = req.file;
    const dept = "IT";
    let count = await Inventory.count({
      where: {
        name: itemData.name,
        brand: itemData.brand,
      },
    });
    let promiseArr = [];
    for (let i = 0; i < quantity; i++) {
      count++;
      let serialNo = `${dept}-${itemData.name}-${itemData.brand}-${count}`;
      promiseArr.push(
        Inventory.create({
          ...itemData,
          serialNo,
          image: file,
        })
      );
    }
    let result = await Promise.all(promiseArr);
    return res.status(200).json({
      status: "success",
      data: result,
      error: null,
    });
  } catch (e) {
    return res.status(409).json({
      status: "failure",
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
    const serialNo = req.params.serialNo;
    const item = await Inventory.findOne({
      where: {
        serialNo,
      },
    });
    return res.status(200).json({
      status: "success",
      data: item,
      error: null,
    });
  } catch (e) {
    return res.status(409).json({
      status: "failure",
      data: null,
      error: e,
    });
  }
};
export const deleteItem = async (req: Request, res: Response) => {
  try {
    const serialNo = req.params.serialNo;
    let item = await Inventory.destroy({
      where: {
        serialNo,
      },
    });
    return res.status(200).json({
      status: "success",
      data: item,
      error: null,
    });
  } catch (e) {
    console.log(e);
    return res.status(409).json({
      status: "failure",
      data: null,
      error: e,
    });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    let { serialNo, ...itemData } = req.body;
    let item = await Inventory.findOne({
      where: {
        serialNo,
      },
    });
    if (!item) {
      return res.status(404).json({
        msg: "failure",
        data: null,
        error: "item not found",
      });
    }
    await Inventory.update(itemData, { where: { serialNo } });
    return res.status(200).json({
      msg: "success",
      data: null,
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

export const getItemsByFilter = async (req: Request, res: Response) => {
  try {
    let items = await Inventory.findAll({ where: req.body });
    return res.status(200).json({
      msg: "success",
      data: items,
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
