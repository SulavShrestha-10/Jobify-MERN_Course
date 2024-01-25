import { Router } from "express";
import { createJob, deleteJob, getAllJobs, getSingleJob, updateJob } from "../controllers/jobController.js";
const router = Router();

// ! This is not the final api code for CRUD operations
// * ------------------CRUD Operations for Jobify----------------------
// * The CRUD operations are currently done using the local data above

// * Adding get and post methods for getting all jobs and creating a new job to same url
router.route("/").get(getAllJobs).post(createJob);

// * Adding get,delete and patch methods for getting single job,updating a job and deleting a job to same url
router.route("/:id").get(getSingleJob).patch(updateJob).delete(deleteJob);

// * Get all jobs
// router.get("/", getAllJobs);

// * Create job
// router.post("/", createJob);

// * Get single job
// router.get("/:id", getSingleJob);

// * Edit job
// router.patch("/:id", updateJob);

// * Delete job
// router.delete("/:id", deleteJob);

export default router;
