const express=require('express');
const router=express.Router();

const {createStudent,getStudent,login,updateStudent}=require("../controllers/student-controllers")

router.route('/').post(createStudent).get(getStudent).patch(updateStudent);
router.route('/login').post(login)
module.exports=router;