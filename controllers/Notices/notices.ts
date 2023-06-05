import { Request, Response } from "express";
import Notice from "../../models/notices";
import path from "path";

export const addNotice = async (req: Request, res: Response) => {
    const noticeBody = req.body
    let file = req.file

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
    } catch (error) {
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