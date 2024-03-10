const mongoose=require('mongoose');

const CourseSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter the name'],
        maxlength:[20,'name cannot be more than 20 length']
    },
    tutorname:{
        type:String,
        required:[true,'Please enter the name'],
        maxlength:[20,'name cannot be more than 20 length']
    },
    fees:{
        type:Number,
        default:1000
    },
    rating:{
        type:Number,
        default:4
    }
})


module.exports=mongoose.model('Courses',CourseSchema);