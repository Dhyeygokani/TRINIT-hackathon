const Student=require("../model/Students")
const {createCustomError}=require('../custom-error/custom-error-handler')

const createStudent= async(req,res)=>{
    console.log("hello")
    const student= await Student.create(req.body);
    // console.log(student)
    let d=student
    res.status(201).json({d});
}

const updateStudent=async(req,res)=>{
    const {name,userId,flashcards}=req.body;
    console.log(req.body)
    const student=await Student.findByIdAndUpdate({
        _id:userId
        },req.body,{
            new:true,
            runValidators:true
        });
        if(!student){
            res.status(404).send('user not found')
        }
        let d=student
        res.status(200).json({d});
}

const login=async(req,res)=>{
    const {name,password}=req.body;
    // console.log(email,password);
    if(!name||!password){
        // console.log('hi');
        return res.status(500).json({msg:"incomplete credentials"})
    }
    // console.log("hii")
    let queryobject={};
    queryobject.name=name;
    const student= await Student.find(queryobject);
    if(!student.length){
        return res.status(500).json({msg:"no name matched"})
    }
    // console.log(student)
    // if(student.password!==password){
    //     throw new UnauthenticatedError('Invalid Credentials');
    // }
    // // console.log('hi');
    
    // return res.send(200).json({student})
    // console.log(name)
    // console.log(password)
    let t=-1;
    for(i=0;i<student.length;i++){
      
        if(student[i].password===password)
        {
            
            t=i;
            break;
        }
    }
   // console.log(t)
    if(t!=-1){
        let d=student[t]
        return res.status(200).json(({d}))
    }
    // console.log("p")
    return res.status(500).json({msg:"no password matched"})
}

const getStudent= async(req,res)=>{
    // console.log("fhfhhf")
    // console.log(req.query)
    const student=await Student.findOne({_id:req.query.id});
    if(!student){
     return next(createCustomError(`No task with id: ${req.params.id}`,404));
    }
    res.status(200).json({student});
}

module.exports={createStudent,getStudent,login,updateStudent}