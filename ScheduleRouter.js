const express=require('express');
const router=express.Router();

const {createSchedule,getSchedule}=require("../controllers/schedule-controller")

router.route('/').post(createSchedule).get(getSchedule);

module.exports=router;