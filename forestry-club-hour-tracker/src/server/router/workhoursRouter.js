import express from "express";
import {
    createWorkhourRecord,
    deleteWorkhourRecord,
    getAllWorkhourRecords,
    getWorkhoursByUsername,
    getWorkhoursById
} from "../controller/workhoursController.js";

const workhoursRouter = express.Router()

workhoursRouter.get('/', getAllWorkhourRecords)
workhoursRouter.get('/:id', getWorkhoursById)
workhoursRouter.get('/username/:username', getWorkhoursByUsername)
workhoursRouter.post('/', createWorkhourRecord)
workhoursRouter.delete('/:id', deleteWorkhourRecord)

export default workhoursRouter