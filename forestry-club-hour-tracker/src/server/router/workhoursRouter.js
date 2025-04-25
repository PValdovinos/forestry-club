import express from "express";
import {
    createWorkhourRecord,
    deleteWorkhourRecord,
    getAllWorkhourRecords,
    getWorkhoursByUsername,
    updateWorkRecord,
    getWorkhoursById,
    putWorkhourRecord
} from "../controller/workhoursController.js";

const workhoursRouter = express.Router()

workhoursRouter.get('/', getAllWorkhourRecords)
workhoursRouter.get('/:id', getWorkhoursById)
workhoursRouter.get('/username/:username', getWorkhoursByUsername)
workhoursRouter.put('/', putWorkhourRecord)
workhoursRouter.put('/:id', updateWorkRecord)
workhoursRouter.post('/', createWorkhourRecord)
workhoursRouter.delete('/:id', deleteWorkhourRecord)

export default workhoursRouter