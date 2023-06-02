import { Request, Response } from "express";
import Complaint from "../../models/complaint";
// temporary apis

export const login = async(req:Request,res:Response)=>{
    if(req.body.email === "student@gmail.com" && req.body.password === "student"){
        return res.status(201).json({
            message:"sucess",
            data :{
                name : "Nitin Rayal",
                branch:"Information Technology",
                reg_id:55079,
                designation : "student",
                level : 0
            }
        })
    }
    else if(req.body.email === "assistantwarden@gmail.com" && req.body.password === "assistantwarden"){
            return res.status(201).json({
                message:"sucess",
                data :{
                    name : "Dhruv prathabh",
                    branch:"V.S bhawan",
                    reg_id:99080,
                    designation : "Assistant warden",
                    level : 1
                }
            })
        }
    else if(req.body.email === "warden@gmail.com" && req.body.password === "warden"){
        return res.status(201).json({
            message:"sucess",
            data :{
                name : "Dr. Sunil Kumar",
                branch:"V.S. Bhawan",
                reg_id:878682,
                designation : "Warden",
                level : 2
            }
        })
    } 
    else if(req.body.email === "dean@gmail.com" && req.body.password === "dean"){
        return res.status(201).json({
            message:"sucess",
            data :{
                name : "Dr. Alaknanda Ashok",
                branch:"College of technology",
                reg_id:870000,
                designation : "Dean & Chief Warden",
                level : 3
            }
        })
    }
    else return res.status(404).json({
        message:"failed"
    });
}
//end here

export const submit_complaint = async (req:Request,res : Response)=>{
    try{
      const data = await Complaint.create(req.body);
    return res.status(201).json({
        message:"Sucessfully inserted in DB",
        data : data
    });
    }
    catch(err){
    return res.status(500).json({
              msg: "failure",
              data: null,
              error: err,
    });
    }
}

export const get_all_complaints = async (req:Request,res:Response)=>{
    try{
    const data = await Complaint.findAll();
    console.log(data);
    res.status(201).json({
        message:"sucessfully fetched complaints",
        data : data
    }).status(201);
    }
    catch(err){
      return res.status(500).json({
        msg: "failure",
        data: null,
        error: err,
});
    }
}
export const getComplaintbystatus_id= async(req:Request,res:Response)=>{

    const status = req.query.status;
    const reg_id = req.query.reg_id;
    console.log(status);
    try{
      const data = await Complaint.findAll({
        where:{
            status:status,
            studentid :reg_id
        }
    })

    res.send({
        message:`sucessfully fetched filtered complaints : ${status}`,
        data : data
    }).status(201);
    }
    catch(err){
      return res.status(500).json({
        msg: "failure",
        data: null,
        error: err,
});
    }
}





export const getComplaintsbystatus_level = async (req:Request,res:Response)=>{
    const status = req.query.status;
    const level = req.query.level;
    console.log(status);
    try{
      const data = await Complaint.findAll({
        where:{
            status:status,
            level :level
        }
    })

    res.send({
        message:`sucessfully fetched filtered complaints : ${status}`,
        data : data
    }).status(201);
    }
    catch(err){
      return res.status(500).json({
        msg: "failure",
        data: null,
        error: err,
});
    }
}
export const get_complaints_by_lvl = async (req:Request,res:Response)=>{
    const lvl = req.query.lvl;
    try{
      const data = await Complaint.findAll({
        where:{
            level:lvl
        }
    })

    res.send({
        message:`sucessfully fetched filtered complaints : ${lvl}`,
        data : data
    }).status(201);
    }
    catch(err){
      return res.status(500).json({
        msg: "failure",
        data: null,
        error: err,
});
    }
}
export const getStatsbylvl = async (req:Request,res:Response)=>{
    const level = req.query.level;
    const rejected = await Complaint.findAll({
        where :{
            status:"rejected",
            level : level
        }
    });
    const approved = await Complaint.findAll({
        where :{
            status:"approved",
            level : level
        }
    });

    const pending = await Complaint.findAll({
        where :{
            status:"pending",
            level : level
        }
});

    res.send({
        message:"sucessfully fetched stats",
        data : JSON.stringify({
            rej_count : rejected.length,
            approved_count : approved.length,
            pending_count : pending.length
        })
    }).status(201);
}

export const getStudentComplaintbyid = async(req:Request,res:Response)=>{
    const reg_id = req.query.reg_id;
    try{
        const data = await Complaint.findAll({
            where:{
                studentid:reg_id
            }
        });
        console.log(data);
        res.status(201).json({
            message:"sucessfully fetched complaints",
            data : data
        }).status(201);
        }
        catch(err){
          return res.status(500).json({
            msg: "failure",
            data: null,
            error: err,
    });
        }
}


export const getStatsbyid = async (req:Request,res:Response)=>{
    const reg_id = req.query.reg_id;
    const rejected = await Complaint.findAll({
        where :{
            status:"rejected",
            studentid : reg_id
        }
    });
    const approved = await Complaint.findAll({
        where :{
            status:"approved",
            studentid:reg_id
        }
    });

    const pending = await Complaint.findAll({
        where :{
            status:"pending",
            studentid:reg_id
        }
});

    res.send({
        message:"sucessfully fetched stats",
        data : JSON.stringify({
            rej_count : rejected.length,
            approved_count : approved.length,
            pending_count : pending.length
        })
    }).status(201);
}


export const approve_complaint = async(req:Request,res:Response)=>{
    const complaint_id = req.body.complaint_id;
    const punishment = req.body.punishment;
   try{ 
    const data = await Complaint.update({
      status:"approved",
      punishment:punishment
    },{
        where:{
            id:complaint_id
        }
    });
  
    res.send({
      message:"complaint updated sucessfully",
      data : data
    }).status(201);
  }
    catch(err){
      return res.status(500).json({
        msg: "failure",
        data: null,
        error: err,
});
    }

    
}

export const forward_complaint = async(req:Request,res:Response)=>{
    const complaint_id = req.body.complaint_id;
    const note = req.body.forward_note;
    const currdata = await Complaint.findOne({
        where: {
          id:complaint_id
        }
    });
    if (!currdata) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "complaint not found"
      })
    }

    const data = await Complaint.update({
        level : currdata.level + 1,
        status:"pending",
        forward_note : note
    },{
        where:{
            id:complaint_id
        }
    });

    return res.status(201).json({
        message:`complaint forwarded successfully ${currdata.level + 1}`,
        data : data
    });
}

export const reject_complaint = async (req:Request,res:Response)=>{
    try{
      const complaint_id = req.body.complaint_id;
      const rej_note = req.body.reg_note;
      console.log("rej complaint id",complaint_id);
    const data = await Complaint.update({
        status:"rejected",
        rejection_note:rej_note
    },{
        where:{
            id:complaint_id
        }
    });

    res.status(200).json({
        message:"complaint rejected sucessfully",
        data : data
    });
    }
    catch(err){
      return res.status(500).json({
        msg: "failure",
        data: null,
        error: err,
    });
    }
}
