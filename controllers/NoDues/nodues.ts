import { Request, Response } from "express";
import NoDues from "../../models/nodues";
import Student from "../../models/student";
import Faculty from "../../models/faculty";

export const applyNoDues = async (req: Request, res: Response) => {
  try {
    if (!res.locals.user.user.isStudent)
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied",
      });
    let data = { ...req.body, advisorCode: res.locals.user.student.FacultyId };
    let application = await NoDues.create(data);
    return res.status(200).json({
      msg: "success",
      data: application,
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

export const getNoDues = async (req: Request, res: Response) => {
  try {
    let applicationId = req.params.id;
    if (!res.locals.user.isStudent) {
      return res.status(400).json({
        msg: 'failure',
        data: null,
        error: "access denied"
      })
    }
    let application = await NoDues.findByPk(applicationId);
    if (res.locals.user.student.id !== application?.StudentId) {
      return res.status(400).json({
        msg: 'failure',
        data: null,
        error: "access denied"
      })
    }
    return res.status(200).json({
      msg: "success",
      data: application,
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

export const approveNoDues = async (req: Request, res: Response) => {
  try {
    const { approved, applicationId } = req.body;
    const isFaculty = res.locals.user.user.isFaculty;
    const isStaff = res.locals.user.user.isStaff;
    const application = await NoDues.findByPk(applicationId);
    if (!application) {
      return res.status(404).json({
        msg: "failure",
        data: null,
        error: "no dues application not found",
      });
    }
    let status: any = { ...application.status };
    let date = new Date()
    const name = res.locals.user.user.name
    if (isFaculty) {
      const student = await Student.findByPk(application.StudentId);
      if (res.locals.user.faculty.id === student?.FacultyId) {
        status.advisor = {
          approved,
          name,
          date,
        };
      }
      const department = res.locals.user.faculty.hodOfDepartment;
      if (department) {
        status[department] = {
          approved,
          name,
          date,
        };
      }
      const hostel = res.locals.user.faculty.wardenOfHostel;
      if (hostel) {
        status.warden = {
          approved,
          name,
          date
        }
      }
    }
    if (isStaff) {
      const staff = res.locals.user.staff;
      if (staff.isCCF) {
        status.CCF = {
          approved,
          name,
          date
        }
      }
      if (staff.isComptroller) {
        status.comptroller = {
          approved,
          name,
          date
        }
      }
      if (staff.isLibrarian) {
        status.library = {
          approved,
          name,
          date
        }
      }
      if (staff.isETS) {
        status.ets = {
          approved,
          name,
          date
        }
      }
      if (staff.isCBSH) {
        status.cbsh = {
          approved,
          name,
          date
        }
      }
      if (staff.isStadiumHead) {
        status.physicalEducation = {
          approved,
          name,
          date
        }
      }
      if (staff.isAccountant) {
        status.accountant = {
          approved,
          name,
          date
        }
      }
    }
    await NoDues.update(
      { status: status },
      {
        where: {
          id: applicationId,
        },
      }
    );
  } catch (e) {
    return res.status(500).json({
      msg: "failure",
      data: null,
      error: e,
    });
  }
};

export const getAllNoDues = async (req: Request, res: Response) => {
  try {
    if (!res.locals.user.user.isStaff && !(res.locals.user.user.isFaculty && res.locals.user.faculty.hodOfDepartment)) {
      return res.status(400).json({
        msg: "success",
        data: null,
        error: "access denied"
      })
    }
    let applications = await NoDues.findAll()
    return res.status(200).json({
      msg: "success",
      data: applications,
      error: null
    })
  } catch (e) {
    return res.status(500).json({
      msg: "success",
      data: null,
      error: e
    })
  }
}

export const getAdviseeNoDues = async (req: Request, res: Response) => {
  try {
    if (!res.locals.user.user.isFaculty) {
      return res.status(400).json({
        msg: "success",
        data: null,
        error: "access denied"
      })
    }
    let applications = await NoDues.findAll({
      where: {
        advisorCode: res.locals.user.faculty.id
      }
    })
    return res.status(200).json({
      msg: "success",
      data: applications,
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
