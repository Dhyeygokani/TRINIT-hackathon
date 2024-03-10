const express=require('express');
const router=express.Router();

const {createCourse,getCourses}=require("../controllers/course-controller")

router.route('/').post(createCourse).get(getCourses);

module.exports=router

