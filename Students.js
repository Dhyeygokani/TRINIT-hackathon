const mongoose=require('mongoose');



const studentSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter the name'],
        maxlength:[20,'name cannot be more than 20 length']
    },
    flashcards:{
        type:[String],
        default:[]
    },
    password:{
        type:String,
        require:[true,'Please enter the password']
    }

})








module.exports=mongoose.model('Students',studentSchema);