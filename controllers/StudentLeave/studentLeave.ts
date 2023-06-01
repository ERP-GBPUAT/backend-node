import Student from "../../models/student";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import StudentLeave from "../../models/studentLeave";

export const applyLeave = async (req: Request, res: Response) => {
  try {
    if (!res.locals.user.user.isStudent) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied",
      });
    }
    const studentId = res.locals.user.student.id;
    const leaveData = req.body;
    let file = req.file;

    let student = await Student.findOne({
      where: { id: studentId },
      // include: [{ model: Faculty}, {model: User}],
    });
    if (!student) {
      // return res.status(400).json({ success: false, error: "Login First" })
      return res.status(404).json({
        msg: "failure",
        data: null,
        error: "student does not exist. Something wrong must have happened",
      });
    }
    let leave = await StudentLeave.create({
      ...leaveData,
      StudentId: studentId,
      advisorCode: student.FacultyId,
      fileDocument: file,
    });
    return res.status(200).json({ msg: "success", data: leave, error: null });
  } catch (e) {
    return res.status(500).json({ msg: "failure", data: null, error: e });
  }
};

// Get All Leaves Details of One Student using college id for student
export const getStudentLeaves = async (req: Request, res: Response) => {
  try {
    if (!res.locals.user.user.isStudent) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied",
      });
    }
    const studentId = res.locals.user.student.id;
    let student = await Student.findOne({
      where: { id: studentId },
    });
    if (!student) {
      return res.status(404).json({
        msg: "failure",
        data: null,
        error: "student does not exist. Something wrong must have happened",
      });
    }
    // const leaves = await student.getLeaves();
    const leaves = await StudentLeave.findAll({
      where: {
        StudentId: student.id
      }
    })
    return res.status(200).json({
      msg: "success",
      data: leaves,
      error: null,
    });
  } catch (e) {
    return res.status(500).json({ msg: "failure", data: null, error: e });
  }
};

// Get All Leaves Details of One Student using Advisor Code for advisor
export const getAdviseesLeaves = async (req: Request, res: Response) => {
  try {
    if (!res.locals.user.user.isFaculty) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied",
      });
    }
    if (!res.locals.user.faculty.isAdvisor) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied",
      });
    }
    const leaves = await StudentLeave.findAll({
      where: {
        advisorCode: res.locals.user.faculty.id,
      },
    });
    return res.status(200).json({
      msg: "success",
      data: leaves,
      error: null,
    });
  } catch (e) {
    return res.status(500).json({ msg: "failure", data: null, error: e });
  }
};

// Get All Leaves Details of One Student using college id for student and warden
export const getHostelLeaves = async (req: Request, res: Response) => {
  try {
    if (!res.locals.user.user.isFaculty) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied",
      });
    }
    if (!res.locals.user.faculty.wardenOfHostel) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied",
      });
    }
    const leaves = await StudentLeave.findAll({
      include: [
        {
          model: Student,
          where: { hostel: res.locals.user.faculty.wardenOfHostel },
        },
      ],
    });
    return res.status(200).json({
      msg: "success",
      data: leaves,
      error: null,
    });
  } catch (e) {
    return res.status(500).json({ msg: "failure", data: null, error: e });
  }
};

// FOR ADVISOR
// router.get(
//   "/advisorApproval/:id",
//   authentication,
export const advisorApproval = async (req: Request, res: Response) => {
  try {
    const { leaveId, advisorApproval } = req.body;
    if (!res.locals.user.user.isFaculty) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied",
      });
    }
    if (!res.locals.user.faculty.isAdvisor) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied",
      });
    }
    let success = await StudentLeave.update(
      {
        advisorApproval,
      },
      {
        where: {
          id: leaveId,
        },
      }
    );
    return res.status(200).json({
      msg: "success",
      data: success,
      error: null,
    });
  } catch (e) {
    return res.status(500).json({ msg: "failure", data: null, error: e });
  }
};

// FOR Warden Aproval
// router.get(
//   "/wardenApproval/:id",
//   authentication,
export const wardenApproval = async (req: Request, res: Response) => {
  try {
    const { leaveId, wardenApproval } = req.body;
    if (!res.locals.user.user.isFaculty) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied",
      });
    }
    if (!res.locals.user.faculty.wardenOfHostel) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied",
      });
    }
    let success = await StudentLeave.update(
      {
        wardenApproval
      },
      {
        where: {
          id: leaveId
        },
      }
    );
    return res.status(200).json({
      msg: "success",
      data: success,
      error: null,
    });
  } catch (e) {
    return res.status(500).json({ msg: "failure", data: null, error: e });
  }
};
