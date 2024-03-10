const Courses=require("../model/Course")
const {createCustomError}=require('../custom-error/custom-error-handler')

const createCourse= async(req,res)=>{
    console.log("hello")
    const course= await Courses.create(req.body);
    console.log(course)
    res.status(201).json({course});
}

const getCourses= async(req,res)=>{
    const {name}=req.query;
    const queryobject={};
    queryobject.name={$regex:name,$options:'i'};
    const courses=await Courses.find(queryobject).sort({fees:1,rating:-1});
    if(!courses){
     return next(createCustomError(`No course with name: ${req.query.name}`,404));
    }
    console.log(courses)
    res.status(200).json({courses});
}

module.exports={createCourse,getCourses}