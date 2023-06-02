import express from "express";
import  {
    submit_complaint,
    get_all_complaints,
    get_filtered_complaintsbylvl,
    get_stats
    ,approve_complaint,
    forward_complaint,
    reject_complaint,
    login,
    get_complaints_by_lvl,
    get_stats_student,
    get_student_complaint,
    get_filtered_complaintsby_id
    } from "../controllers/HostelAmmenties/hostelammeneties";
    const Route = express.Router();
    
    // students apis routes
    Route.post("/submit_complaint_hostel",submit_complaint);
    Route.get("/get_all_complaints_hostel",get_all_complaints);
    Route.get("/get_filtered_complaints_hostel",get_filtered_complaintsbylvl)
    
    
    //admin apis routes
    Route.get("/get_stats_hostel",get_stats);
    Route.post("/approve_complaint_hostel",approve_complaint);
    Route.post("/forward_complaint_hostel",forward_complaint);
    Route.post("/reject_complaint_hostel",reject_complaint);
    Route.get("/get_complaints_by_lvl",get_complaints_by_lvl);
    Route.get("/get_stats_student_hostel",get_stats_student);
    Route.get("/get_student_complaint_hostel",get_student_complaint);
    Route.get("/get_filtered_complaintsbyid_hostel",get_filtered_complaintsby_id);


    //login apis
    Route.post("/login",login);
    
export default Route;