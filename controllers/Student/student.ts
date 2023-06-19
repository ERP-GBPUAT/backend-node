import { Request, Response } from "express";
import Student from "../../models/student";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user";
import Faculty from "../../models/faculty";
import { validationResult } from "express-validator";

export const addStudent = async (req: Request, res: Response) => {
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
    let faculty = await Faculty.findOne({
      where:{id:req.body.student.FacultyId}
    })
    if (!faculty) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "Faculty Id is not correct",
      });
    }
    data.user.password = bcrypt.hashSync(data.user.password, 10);
    user = await User.create(data.user);
    data.user = user.toJSON();
    delete data.user.password;
    let student;
    try {
      student = await Student.create({ ...data.student, UserId: user.id });
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
    data.student = student.toJSON();
    const token = jwt.sign(data, "supersecretkey");
    return res.json({ msg: "success", data:{token,data}, error:null });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "failure",
      data: null,
      error,
    });
  }
};

export const getStudent = async (req: Request, res: Response) => {
  try {
    let studentId = req.params.studentId;
    const isStudent = res.locals.user.user.isStudent;
    const isFaculty = res.locals.user.user.isFaculty;
    const isStaff = res.locals.user.user.isStaff;
    if (isStudent === true) {
      if (!studentId) {
        studentId = res.locals.user.student.id
      }
      
      if (studentId != res.locals.user.student.id){
        return res.status(400).json({
          msg: "failure",
          data: null,
          error: "access denied"
        })
      }
    }
    let student = await Student.findOne({
      where: { id: studentId },
      include: User,
    });
    if (!student) {
      return res.status(404).json({
        msg: "failure",
        data: null,
        error: "Student details not found",
      });
    }
    if (isStudent && studentId == res.locals.user.student.id){
      return res.status(400).json({
        msg: "success",
        data: student,
        error: null
      })
    }
    if (isStaff) {
      console.log("admin");
      
      if (res.locals.user.staff.isAdmin) {
        return res.status(200).json({
          msg: "success",
          data: student,
          error: null
        })
      }
    }
    if (isFaculty === true) {
      if (res.locals.user.faculty.id == student.FacultyId) {
        return res.status(200).json({
          msg: "success",
          data: student,
          error: null
        })
      }
    }
    student = await Student.findByPk(studentId, {
      attributes: ["id"],
      include: {
        model: User,
        attributes: ["name", "email", "phoneNo"]
      }
    })
    return res.status(200).json({
      msg: "success",
      data: student,
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

export const getStudentsByFilter = async (req: Request, res: Response) => {
  // const batch = req.params.year;
  const filter = req.body;
  try {
    if (!res.locals.user.user.isStaff) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied"
      })
    }
    if (!res.locals.user.staff.isAdmin) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied"
      })
    }
    let student = await Student.findAll({
      // include: User,
      where: filter,
      include:User
    });
    if (!student) {
      return res.status(404).json({
        msg: "failure",
        data: null,
        error: "student not found",
      });
    }
    return res.status(200).json({
      msg: "success",
      data: student,
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

export const updateStudent = async (req: Request, res: Response) => {
  try {
    if (!res.locals.user.user.isStaff) return res.status(400).json({
      msg: "failure",
      data: null,
      error: "access denied"
    })
    if (!res.locals.user.staff.isAdmin) return res.status(400).json({
      msg: "failure",
      data: null,
      error: "access denied"
    })
    let student = req.body;
    const studentId = student.id;
    delete student["id"];
    await Student.update(student, {
      where: { id: studentId },
    });
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

export const getAdvisees = async (req: Request, res: Response) => {
  try {
    // if (!res.locals.user.user.isFaculty) {
    //   return res.status(400).json({
    //     msg: "failure",
    //     data: null,
    //     error: "access denied"
    //   })
    // }
    // if (!res.locals.user.faculty.isAdvisor) {
    //   return res.status(400).json({
    //     msg: "failure",
    //     data: null,
    //     error: "access denied"
    //   })
    // }
    let facultyId
    // console.log(res.locals.user.user.isFaculty);
    // console.log(res.locals.user.user.isStudent);

    if (res.locals.user.user.isFaculty){
      console.log("faculty");

      if(res.locals.user.faculty.hodOfDepartment) facultyId=req.body.facultyId
      else facultyId = res.locals.user.faculty.id
    }
    else if (res.locals.user.user.isStudent){console.log("student");
     facultyId = res.locals.user.student.FacultyId}
    let students = await Student.findAll({
      include: User,
      where: {
        FacultyId: facultyId,
      },
    });
    return res.status(200).json({
      msg: "success",
      data: students,
      error: null,
    });
  } catch (e) {
    return res.status(200).json({
      msg: "failure",
      data: null,
      error: e,
    });
  }
};
