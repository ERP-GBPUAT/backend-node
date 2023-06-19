import Faculty from "../../models/faculty";
import Semester from "../../models/semester";
import Subject from "../../models/faculty";
import { Request, Response } from "express";

export const registerSemester = async (req: Request, res: Response) => {
  try {
    const {subjectIds, ...data} = req.body;
    if (!res.locals.user.user.isFaculty) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied"
      })
    }
    let faculty = await Faculty.findByPk(res.locals.user.faculty.id);
    if (!faculty) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied"
      })
    }
    let subjects: Subject[] = [];
    for (let i = 0; i < subjectIds.length; i++) {
      let subject = await Subject.findByPk(subjectIds[i])
      if (!subject) {
        return res.status(400).json({
          msg: "failure",
          data: null,
          error: `subject ${subjectIds[i]} not found`
        })
      }
      subjects.push(subject)
    }
    let semester = await Semester.create({
      ...data,
      subjects,
      FacultyId: res.locals.user.faculty.id,
    })
    return res.status(200).json({
      msg: "success",
      data: semester,
      error: null
    })
  } catch (e) {
    return res.status(500).json({msg: "success", data: null, error: "Internal Server"})
  }
}

export const getSemester = async (req: Request, res: Response) => {
  try {
    if (!res.locals.user.user.isFaculty) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied"
      })
    }
    let faculty = await Faculty.findByPk(res.locals.user.faculty.id);
    if (!faculty) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied"
      })
    }
    let semester = faculty.semesters.slice(-1)[0]
    return res.status(200).json({
      msg: "success",
      data: semester,
      error: null
    })
  } catch (e) {
    return res.status(500).json({
      msg: "failure",
      data: null,
      error: "Internal server error"
    })
  }
}
