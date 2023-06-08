import express from "express";
import  {
    submit_complaint,
    get_all_complaints,
    getComplaintsbystatus_level,
    getStatsbylvl
    ,approve_complaint,
    forward_complaint,
    reject_complaint,
    login,
    get_complaints_by_lvl,
    getStatsbyid,
    getStudentComplaintbyid,
    getComplaintbystatus_id,
    signup
    } from "../controllers/CDB/cdb";
    const Route = express.Router();
    
    // students apis routes
    Route.post("/submit_complaint",submit_complaint);
    Route.get("/get_all_complaints",get_all_complaints);
    Route.get("/get_filtered_complaints",getComplaintsbystatus_level)
    
    
    //admin apis routes
    Route.get("/get_stats",getStatsbylvl);
    Route.post("/approve_complaint",approve_complaint);
    Route.post("/forward_complaint",forward_complaint);
    Route.post("/reject_complaint",reject_complaint);
    Route.get("/get_complaints_by_lvl",get_complaints_by_lvl);
    Route.get("/get_stats_student",getStatsbyid);
    Route.get("/get_student_complaint",getStudentComplaintbyid);
    Route.get("/get_filtered_complaintsbyid",getComplaintbystatus_id);


    //login apis
    Route.post("/login",login);
    Route.post("/signup",signup);
    
export default Route;