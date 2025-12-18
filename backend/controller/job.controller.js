import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {
        const {
            title,
            description,
            requirements,
            jobType,
            location,
            experienceLevel,
            salary,
            position,
            companyId
        } = req.body;

        if (
            !title ||
            !description ||
            !requirements ||
            !jobType ||
            !location ||
            !experienceLevel ||
            !salary ||
            !position ||
            !companyId
        ) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel,
            position,
            company: companyId,
            created_by: req.id
        });

        res.status(201).json({
            message: "Job created successfully",
            job,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Get all jobs without any filters
export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate("company")
            .sort({ createdAt: -1 })
            .lean();

        res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error("Error in getAllJobs:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const searchJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword ? decodeURIComponent(req.query.keyword) : "";
        const location = req.query.location ? decodeURIComponent(req.query.location) : "";
        const industry = req.query.industry ? decodeURIComponent(req.query.industry) : "";
        const salary = req.query.salary ? decodeURIComponent(req.query.salary) : "";

        const query = {};

        if (keyword) {
            query.$or = [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { location: { $regex: keyword, $options: "i" } }
            ];
        }

        if (location) {
            if (query.$or) {
                query.$and = [
                    { $or: query.$or },
                    { location: { $regex: location, $options: "i" } }
                ];
                delete query.$or;
            } else {
                query.location = { $regex: location, $options: "i" };
            }
        }

        if (industry) {
            const industryQuery = {
                $or: [
                    { title: { $regex: industry, $options: "i" } },
                    { description: { $regex: industry, $options: "i" } }
                ]
            };

            if (query.$and) {
                query.$and.push(industryQuery);
            } else if (query.$or) {
                query.$and = [
                    { $or: query.$or },
                    industryQuery
                ];
                delete query.$or;
            } else {
                Object.assign(query, industryQuery);
            }
        }

        if (salary) {
            if (salary.includes("-")) {
                const [min, max] = salary.split("-").map(Number);
                if (!isNaN(min) && !isNaN(max)) {
                    query.salary = { $gte: min, $lte: max };
                }
            } else if (salary.startsWith(">")) {
                const min = parseInt(salary.substring(1));
                if (!isNaN(min)) {
                    query.salary = { $gte: min };
                }
            } else {
                const max = parseInt(salary);
                if (!isNaN(max)) {
                    query.salary = { $lte: max };
                }
            }
        }

        const jobs = await Job.find(query)
            .populate("company")
            .sort({ createdAt: -1 })
            .lean();

        res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error("Error in searchJobs:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({ path: "applications" });
        if (!job) {
            return res.status(404).json({
                message: "no jobs found",
                success: false
            })
        }

        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'company',
            createdAt: -1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "no jobs found",
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}