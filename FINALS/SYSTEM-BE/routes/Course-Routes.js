const express = require("express");
// Express routing component
const router = express.Router();
const courseController = require("../controllers/Course-Controller");

// Create Course
router.post('/', courseController.addCourse);

// Get all courses
router.get("/all", courseController.getAllCourses);

// Get all Active courses
router.get("/all/active", courseController.getAllActiveCourses);

// Get all Inactive courses
router.get("/all/inactive", courseController.getAllInactiveCourses);

// Get all Inactive courses
router.get("/search/:courseId", courseController.getSpecificCourse);

// Archive course
router.put("/archive/:courseId", courseController.archiveCourse);

// Unarchive course
router.put("/activate/:courseId", courseController.activateCourse);




module.exports = router;
  