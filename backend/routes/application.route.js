import express from "express";
import { applyJob, getAplicants, getAppliedJobs, updateStatus } from "../controller/application.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route('/apply/:id').post(isAuthenticated,applyJob);
router.route('/get').get(isAuthenticated,getAppliedJobs);
router.route('/:id/applicants').get(isAuthenticated,getAplicants);
router.route('/status/:id/update').post(isAuthenticated,updateStatus);

export default router;