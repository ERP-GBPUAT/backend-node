import { Request, Response } from "express";
import Notice from "../../models/notices";
import path from "path";
import { validationResult } from "express-validator";

export const addNotice = async (req: Request, res: Response) => {
    const noticeBody = JSON.parse(req.body.data)
    let file = req.file
    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     return res.status(200).json({
    //         msg: "failureArr",
    //         data: null,
    //         error: errors.array(),
    //     });
    // }
    try {
        if (res.locals.user?.staff?.isAdmin) {
            let notice = await Notice.create({
                ...noticeBody,
                fileDocument: file
            })
            return res.status(200).json({
                msg: "success",
                data: notice,
                error: null,
            });
        }
        else{
            return res.status(400).json({
                msg: "failure",
                data: null,
                error: "access denied",
            });
        }
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            msg: "failure",
            data: null,
            error
        });
    }
}

export const getAllNotices = async (req: Request, res: Response) => {
    try {
        let notices = await Notice.findAll();
        return res.status(200).json({
            msg: "success",
            data: notices,
            error: null,
        });
    } catch (error) {
        return res.status(500).json({
            msg: "failure",
            data: null,
            error: "Not able to get the notices",
        });
    }
}
export const getAllNoticeByDept = async (req: Request, res: Response) => {
    const data = req.body
    try {
        let notices = await Notice.findAll({
            where:{
                type:data.type
            }
        });
        return res.status(200).json({
            msg: "success",
            data: notices,
            error: null,
        });
    } catch (error) {
        return res.status(500).json({
            msg: "failure",
            data: null,
            error: "Not able to get the notices",
        });
    }
}
export const getNoticeFile = async (req: Request, res: Response) => {
    try {
        const { noticeId } = req.params
        let notice = await Notice.findOne({
            where: {
                id: noticeId
            }
        })
        if (!notice) return res.status(404).json({
            msg: "failure",
            data:null,
            error: "notice not found"
        })
        if (!notice.fileDocument) return res.status(404).json({
            msg: "failure",
            data: null,
            error: "no file attached"
        })
        res.setHeader('Content-type', 'application/pdf');
        // const pathname = path.resolve(notice.fileDocument.path)
        // console.log("path",pathname);
        
        return res.status(200).sendFile(path.resolve(notice.fileDocument.path))
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            msg: "failure",
            data: null,
            error
        });
    }
}