import { Request, Response } from "express";
import NoDues from "../../models/nodues";
import Student from "../../models/student";

export const applyNoDues = async (req: Request, res: Response) => {
  try {
    if (!res.locals.user.user.isStudent)
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied",
      });
    let data = {
      ...req.body,
      advisorCode: res.locals.user.student.FacultyId,
      StudentId: res.locals.user.student.id,
    };
    let application = await NoDues.create(data);
    return res.status(200).json({
      msg: "success",
      data: application,
      error: null,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "failure",
      data: null,
      error: e,
    });
  }
};

export const getNoDues = async (req: Request, res: Response) => {
  try {
    // let applicationId = req.params.id;
    if (!res.locals.user.user.isStudent) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied",
      });
    }
    let application = await NoDues.findAll();
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
    let date = new Date();
    const name = res.locals.user.user.name;
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
          date,
        };
      }
      const deanOfCollege = res.locals.user.faculty.deanOfCollege;
      if (deanOfCollege) {
        status.dean = {
          approved,
          name,
          date,
        };
      }
    }
    if (isStaff) {
      const staff = res.locals.user.staff;
      if (staff.isCCF) {
        status.CCF = {
          approved,
          name,
          date,
        };
      }
      if (staff.isComptroller) {
        status.comptroller = {
          approved,
          name,
          date,
        };
      }
      if (staff.isLibrarian) {
        status.library = {
          approved,
          name,
          date,
        };
      }
      if (staff.isETS) {
        status.ets = {
          approved,
          name,
          date,
        };
      }
      if (staff.isCBSH) {
        status.cbsh = {
          approved,
          name,
          date,
        };
      }
      if (staff.isStadiumHead) {
        status.physicalEducation = {
          approved,
          name,
          date,
        };
      }
      if (staff.isAccountant) {
        status.accountant = {
          approved,
          name,
          date,
        };
      }
    }
    await NoDues.update(
      { status },
      {
        where: {
          id: applicationId,
        },
      }
    );
    console.log(status);

    return res.status(200);
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
    if (
      !res.locals.user.user.isStaff &&
      !(
        res.locals.user.user.isFaculty &&
        (res.locals.user.faculty.hodOfDepartment ||
          res.locals.user.faculty.deanOfCollege)
      )
    ) {
      return res.status(400).json({
        msg: "success",
        data: null,
        error: "access denied",
      });
    }
    let applications = await NoDues.findAll();
    return res.status(200).json({
      msg: "success",
      data: applications,
      error: null,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "success",
      data: null,
      error: e,
    });
  }
};

export const getAdviseeNoDues = async (req: Request, res: Response) => {
  try {
    if (!res.locals.user.user.isFaculty) {
      return res.status(400).json({
        msg: "success",
        data: null,
        error: "access denied",
      });
    }
    let applications = await NoDues.findAll({
      where: {
        advisorCode: res.locals.user.faculty.id,
      },
    });
    return res.status(200).json({
      msg: "success",
      data: applications,
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
