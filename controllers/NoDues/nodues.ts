import { Request, Response } from "express";
import NoDues from "../../models/nodues";
import Student from "../../models/student";
import Faculty from "../../models/faculty"

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
export const approveNoDues = async (req: Request, res: Response) => {
  try {
    const applicationId = req.params.id;
    const isFaculty = res.locals.user.user.isFaculty;
    const isStaff = res.locals.user.user.isStaff;
    const application = await NoDues.findByPk(applicationId);
    if (!application) return res.status(404).json({
      msg: "failure",
      data: null,
      error: "no dues application not found"
    })
    if (isFaculty) {
      const student = await Student.findByPk(application.StudentId)
      if (res.locals.user.faculty.id === student?.FacultyId) {
        let data = {status: {...application.status, advisor: {
          approved: true,
          date: new Date()
        }}}
        await NoDues.update(data, {
          where: {
            id: applicationId
          }
        })
      }
    }
  } catch (e) {
    return res.status(500).json({
      msg: "failure",
      data: null,
      error: e
    })
  }

}
