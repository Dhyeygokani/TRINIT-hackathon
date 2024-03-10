const express=require('express');
const router=express.Router();

const {createTutor,getTutor,getAllTutor,logintutor}=require("../controllers/tutor-controller")

router.route('/').post(createTutor).get(getTutor);
router.route('/all').get(getAllTutor)
router.route('/login').post(logintutor)

module.exports=router;