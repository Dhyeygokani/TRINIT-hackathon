const mongoose=require('mongoose');

const SchedulesSchema=mongoose.Schema({
    duration:{
        type:Number,
        default:60 
    },
    starttime:{
        type:Number,
        required:[true,'Please enter starttime']
    },
    
    tutorid:{
        type:String,
        required:[true,'Please enter tutor name']
    },
    studentid:{
        type:String,
        required:[true,'Please enter student name']
    },
    courseid:{
        type:String,
        required:[true,'Please enter course name']
    }

})

module.exports=mongoose.model('Schedules',SchedulesSchema);