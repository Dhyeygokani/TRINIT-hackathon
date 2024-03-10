const mongoose=require('mongoose');

const tutorSchema=mongoose.Schema({
    courses:{
        type:[String],
        default:[]
    },
    name:{
        type:String,
        required:[true,'Please enter the name'],
        maxlength:[20,'name cannot be more than 20 length']
    },
    password:{
        type:String,
        require:[true,'Please enter the password']
    }
})

module.exports=mongoose.model('Tutors',tutorSchema);