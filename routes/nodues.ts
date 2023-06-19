import express from "express";
import { applyNoDues, approveNoDues, getAdviseeNoDues, getAllNoDues, getNoDues, getOneNoDue, getStatus } from "../controllers/NoDues/nodues";
import authentication from "../middleware/authentication";
import { applyEmpNoDues, approveEmpNoDues, getAllEmpNoDues } from "../controllers/NoDues/empNoDues";
import { body } from "express-validator";

const router = express.Router();

router.post("/applyEmpNodue", authentication, applyEmpNoDues)
router.post("/applyNodue", [
    body("accountName","Enter a valid account name").trim().matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/).isLength({min:3}),
  body("accountNumber").trim().isNumeric().isLength({min:11}).withMessage("Bank account number cannot be less than 11 digits").isLength({max:16}).withMessage("Bank account number cannot be more than 16 digits"),
  body("bankName").trim().matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/).isLength({min:10}).withMessage("Enter a valid bank name"),
  body("bankBranch").trim().matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/).withMessage("Enter a valid bank name"),
  body("ledger").trim().isNumeric().withMessage("Enter a valid ledger number"),
  body('year').trim().isNumeric().isLength({ min: 4, max: 4 }).withMessage("Year is invalid").custom((value) => {
    let cDate = new Date();
    let year = cDate.getFullYear();
    if (value > year) throw new Error("Year should be current year or in past")
    return true
  }),
  body("admissionFees").trim().isNumeric().isLength({min:2}).withMessage("Admission fees is too small").isLength({max:6}).withMessage("Admission fees is too large"),
  body("tutionFees").trim().isNumeric().isLength({min:2}).withMessage("Tuition fees is too small").isLength({max:6}).withMessage("Tuition fees is too large"),
  body("roomRent").trim().isNumeric().isLength({min:2}).withMessage("Room rent is too small").isLength({max:6}).withMessage("Room rent is too large"),
  body("tourMoney").trim().isNumeric().isLength({max:6}).withMessage("Tour money is too large"),
  body("fine").trim().isNumeric().isLength({max:6}).withMessage("Fine is too large"),
  body("miscCharges").trim().isNumeric().isLength({max:6}).withMessage("Misc Charges are too large"),
  body("foodCharges").trim().isNumeric().isLength({max:6}).withMessage("Food Charges are too large"),
  body("other").trim().isNumeric().isLength({max:6}).withMessage("Other charges has too large value"),
  body("totalAmount").trim().isNumeric().withMessage("Invalid total amount"),
  body("tour1").trim().matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/).isLength({min:3}).withMessage("Enter a valid Tour 1 name"),
  body("year1").trim().isNumeric().isLength({ min: 4, max: 4 }).withMessage("Year is invalid").custom((value) => {
    let cDate = new Date();
    let year = cDate.getFullYear();
    if (value > year) throw new Error("Tour 1 year should be current year or in past")
    return true
  }),
  body("lf1").trim().isNumeric().withMessage("Enter a valid LF number for first tour"),
  body("amount1").trim().isNumeric().withMessage("Enter a valid amount for first tour").isLength({max:6}).withMessage("Amount for first tour is too large"),
  body("tour2").trim().matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/).isLength({min:3}).withMessage("Enter a valid Tour 2 name"),
  body("year2").trim().isNumeric().isLength({ min: 4, max: 4 }).withMessage("Year is invalid").custom((value) => {
    let cDate = new Date();
    let year = cDate.getFullYear();
    if (value > year) throw new Error("Tour 2 year should be current year or in past")
    return true
  }),
  body("lf2").trim().isNumeric().withMessage("Enter a valid LF number for second tour"),
  body("amount2").trim().isNumeric().withMessage("Enter a valid amount for second tour").isLength({max:6}).withMessage("Amount for second tour is too large"),
  body("tour3").trim().matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/).isLength({min:3}).withMessage("Enter a valid Tour 3 name"),
  body("year3").trim().isNumeric().isLength({ min: 4, max: 4 }).withMessage("Year is invalid").custom((value) => {
    let cDate = new Date();
    let year = cDate.getFullYear();
    if (value > year) throw new Error("Tour 3 year should be current year or in past")
    return true
  }),
  body("lf3").trim().isNumeric().withMessage("Enter a valid LF number for third tour"),
  body("amount3").trim().isNumeric().withMessage("Enter a valid amount for third tour").isLength({max:6}).withMessage("Amount for third tour is too large"),
  body("foodAdvance").trim().isNumeric().withMessage("Food advance is invalid").isLength({max:6}).withMessage("Food advance is too large"),
  body("foodCharges2").trim().isNumeric().withMessage("Food charges 2 is invalid").isLength({max:6}).withMessage("Food charges 2 is too large"),
  body("other2").trim().isNumeric().withMessage("Other 2 charge amount is invalid").isLength({max:6}).withMessage("Other 2 charge value is too large"),
  body("balance").trim().isNumeric().withMessage("Enter a balance amount for first tour").isLength({max:6}).withMessage("Balance amount is too large"),
], authentication, applyNoDues)
router.get("/getNodueAdvisor", authentication, getAdviseeNoDues)
router.get("/getAllNodue", authentication, getAllNoDues)
router.get("/getNodue", authentication, getNoDues)
router.get("/getOneNodue/:applicationId", authentication, getOneNoDue)
router.get("/getStatus/:applicationId", authentication, getStatus)
router.post("/approveNodue", authentication, approveNoDues)
router.get("/getAllEmpNddue", authentication, getAllEmpNoDues)
router.post("/approveEmpNodue", authentication, approveEmpNoDues)

export default router

// {
//   body("accountName")
//   body("accountNumber")
//   body("bankName")
//   body("bankBranch")
//   body("ledger")
//   body("year")
//   body("admissionFees")
//   body("tutionFees")
//   body("roomRent")
//   body("tourMoney")
//   body("fine")
//   body("miscCharges")
//   body("foodCharges")
//   body("other")
//   body("totalAmount")
//   body("tour1")
//   body("year1")
//   body("lf1")
//   body("amount1")
//   body("tour2")
//   body("year2")
//   body("lf2")
//   body("amount2")
//   body("tour3")
//   body("year3")
//   body("lf3")
//   body("amount3")
//   body("foodAdvance")
//   body("foodCharges2")
//   body("other2")
//   body("balance")
// }