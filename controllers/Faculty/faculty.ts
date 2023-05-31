import { Request, Response } from "express";
import Faculty from "../../models/faculty";
import User from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

export const addFacultyDetails = async (
  req: Request,
  res: Response
): Promise<Response> => {
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
    let faculty;
    try {
      faculty = await Faculty.create({ ...data.faculty, UserId: user.id });
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
    const token = jwt.sign(data, "supersecretkey");
    data.faculty = faculty.toJSON();
    return res.status(200).json({
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
};

export const getFaculty = async (req: Request, res: Response) => {
  try {
    const facultyId = req.params.facultyId;
    let faculty = await Faculty.findOne({
      include: User,
      where: { id: facultyId },
    });
    if (!faculty) {
      return res.status(404).json({
        msg: "failure",
        data: null,
        error: "faculty not found",
      });
    }
    return res.status(200).json({
      msg: "success",
      data: faculty,
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

export const getAllFaculty = async (req: Request, res: Response) => {
  try {
    let faculties = await Faculty.findAll();
    return res.status(200).json({
      msg: "success",
      data: faculties,
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

export const getFacultyByDept = async (req: Request, res: Response) => {
  try {
    if (!res.locals.user.isFaculty)
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied",
      });
    const hodOfDept = res.locals.user.faculty.hodOfDepartment;
    if (!hodOfDept)
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied",
      });
    const faculties = await Faculty.findAll({
      where: {
        department: hodOfDept,
        id: {
          [Op.ne]: res.locals.user.faculty.id
        },
      },
    });
    return res.status(200).json({
      msg: "success",
      data: faculties,
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
