import { Request, Response } from "express";
import EmpNoDues from "../../models/empNoDues";

export const applyEmpNoDues = async (req: Request, res: Response) => {
  try {
    if (!res.locals.user.user.isFaculty) {
      return res.status(400).json({
        msg: "success",
        data: null,
        error: "access denied",
      });
    }
    let application = await EmpNoDues.create(req.body);
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

export const getAllEmpNoDues = async (req: Request, res: Response) => {
  try {
    if (
      !(
        res.locals.user.user.isFaculty &&
        (res.locals.user.faculty.hodOfDepartment ||
          res.locals.user.faculty.deanOfCollege)
      )
    ) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied",
      });
    }
    let applications = await EmpNoDues.findAll();
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

export const approveEmpNoDues = async (req: Request, res: Response) => {
  try {
    const { approved, applicationId } = req.body;
    if (!res.locals.user.user.isFaculty) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied",
      });
    }
    const department = res.locals.user.faculty.hodOfDepartment;
    const deanOfCollege = res.locals.user.faculty.deanOfCollege;
    if (!department && !deanOfCollege) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied",
      });
    }
    const application = await EmpNoDues.findByPk(applicationId);
    if (!application) {
      return res.status(404).json({
        msg: "failure",
        data: null,
        error: "no dues application not found",
      });
    }
    let status: any = { ...application.status };
    const date = new Date();
    const name = res.locals.user.user.name;
    if (department) {
      status[department] = {
        approved,
        name,
        date,
      };
    }
    if (deanOfCollege) {
      status.dean = {
        approved,
        name,
        date
      }
    }
    await EmpNoDues.update({status}, {
      where: {
        id: applicationId
      }
    })
    return res.status(200).json({
      msg: "success",
      data: {...application.dataValues, status},
      error: null
    })
  } catch (e) {
    return res.status(500).json({
      msg: "failure",
      data: null,
      error: e,
    });
  }
};
