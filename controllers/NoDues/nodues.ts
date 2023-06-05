import { Request, Response } from "express";
import NoDues from "../../models/nodues";

export const applyNoDues = async (req: Request, res: Response) => {
  try {
    if (!res.locals.user.user.isStudent) return res.status(400).json({
      msg: "failure",
      data: null,
      error: "access denied"
    })
    let data = req.body;
    let application = await NoDues.create(data)
    return res.status(200).json({
      msg: "success",
      data: application,
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

export const getNoDues = async (req: Request, res: Response) => {
  try {
    let applicationId = req.params.id;
    let application = await NoDues.findByPk(applicationId)
    return res.status(200).json({
      msg: "success",
      data: application,
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
