import Faculty from "../../models/faculty";
import Semester from "../../models/semester";
import Subject from "../../models/subject";
import { Request, Response } from "express";

export const registerSemester = async (req: Request, res: Response) => {
  try {
    const { subjectIds, ...data } = req.body;
    console.log(req.body);
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
    let sem = await Semester.findOne({
      where:{
        number:data.number,
        session:data.session
      }
    })
    if(sem){
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "Already registered for courses this semester"
      })
    }
    // let subjects: Subject[] = [];
    let subjects = [];
    for (let i = 0; i < subjectIds.length; i++) {
      let subject = await Subject.findByPk(subjectIds[i])
      if (!subject) {
        return res.status(400).json({
          msg: "failure",
          data: null,
          error: `subject ${subjectIds[i]} not found`
        })
      }
      // console.log("Subject",subject?.dataValues);
      
      subjects.push(subject.dataValues)
    }
    
    let semester = await Semester.create({
      ...data,
      subjects,
      FacultyId: res.locals.user.faculty.id,
    })
    // faculty.semesters.push(semester);
    // faculty.save()
    return res.status(200).json({
      msg: "success",
      data: semester,
      error: null
    })
  } catch (e) {
    console.log(e);
    
    return res.status(500).json({ msg: "success", data: null, error: "Internal Server" })
  }
}

export const getSemester = async (req: Request, res: Response) => {
  try {
    if (!res.locals.user.user.isFaculty) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied not faculty"
      })
    }
    let faculty = await Faculty.findByPk(res.locals.user.faculty.id);
    if (!faculty) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied faculty not found"
      })
    }
    let semesters = await Semester.findAll({
      where: {
        FacultyId: res.locals.user.faculty.id
      }
    })
    
    if (!semesters) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "no semester found"
      })
    }
    // console.log(sems)
    // let semester = faculty?.semesters?.slice(-1)[0]
    // console.log(semester);
    
    return res.status(200).json({
      msg: "success",
      data: semesters,
      error: null
    })
  } catch (e) {
    console.log(e);
    
    return res.status(500).json({
      msg: "failure",
      data: null,
      error: "Internal server error"
    })
  }
}

export const getPrevSemester = async (req: Request, res: Response) => {
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
    let semester = faculty.semesters.slice(-2)[0]
    return res.status(200).json({
      msg: "success",
      data: {...semester.dataValues, subjects: semester.subjects},
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

export const subjectReg = async (req: Request, res: Response) => {
  try {
    
    let subject = await Subject.create(req.body);
    return res.status(200).json({
      msg: "success",
      data: subject,
      error: null
    })
  } catch (error) {
    return res.status(200).json({
      msg: "failure",
      data: null,
      error: error
    })
  }

}
