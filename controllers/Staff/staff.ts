import { Request, Response } from "express";
import User from "../../models/user";
import Staff from "../../models/staff";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

export const addStaff = async (req: Request, res: Response) => {
  const err = validationResult(req);
  if(!err.isEmpty()){
    return res.status(400).json({
      msg: "failureArray",
      data: null,
      error: err.array(),
    });
  }
  try {
    const data = req.body;
    let user = await User.findOne({
      where: { email: data.user.email },
    });
    if (user) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "user already exists, please login",
      });
    }
    data.user.password = bcrypt.hashSync(data.user.password, 10);
    user = await User.create(data.user);
    data.user = user.toJSON();
    delete data.user.password;
    let staff;
    try {
      staff = await Staff.create({ ...data.staff, UserId: user.id });
    } catch (e) {
      console.log(e);
      user.destroy();
      return res.status(500).json({
        msg: "failure",
        data: null,
        error:
          "Unable to register! This may be due to invalid input, else try again after some time",
      });
    }
    data.staff = staff.toJSON();
    const token = jwt.sign(data, "supersecretkey");
    return res.json({
      msg: "success",
      data: { token, data },
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "failure",
      data: null,
      error,
    });
  }
}
