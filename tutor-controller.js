const Tutors=require("../model/Tutor")
const {createCustomError}=require('../custom-error/custom-error-handler')

const createTutor= async(req,res)=>{
    console.log("hello")
    const tutor= await Tutors.create(req.body);
    //console.log(student)
    let d=tutor
    res.status(201).json({d});
}

const getTutor= async(req,res)=>{
    
    const tutor=await Tutors.findOne({_id:req.query.id});
    if(!tutor){
     return next(createCustomError(`No tutor with id: ${req.query.id}`,404));
    }
    res.status(200).json({tutor});
}

const logintutor=async(req,res)=>{
    const {name,password}=req.body;
    // console.log(email,password);
    if(!name||!password){
        // console.log('hi');
        return res.status(500).json({msg:"incomplete credentials"})
    }
    // console.log("hii")
    let queryobject={};
    queryobject.name=name;
    const tutor= await Tutors.find(queryobject);
    if(!tutor.length){
        return res.status(500).json({msg:"no name matched"})
    }
    // console.log(student)
    // if(student.password!==password){
    //     throw new UnauthenticatedError('Invalid Credentials');
    // }
    // // console.log('hi');
    
    // return res.send(200).json({student})
    console.log(name)
    console.log(password)
    let t=-1;
    for(i=0;i<tutor.length;i++){
      
        if(tutor[i].password===password)
        {
            
            t=i;
            break;
        }
    }
    console.log(t)
    if(t!=-1){
        let d=tutor[t]
        return res.status(200).json(({d}))
    }
    // console.log("p")
    return res.status(500).json({msg:"no password matched"})
}


const getAllTutor=async(req,res)=>{
    const tutors=await Tutors.find({})
    res.status(200).json({tutors})
}

module.exports={createTutor,getTutor,getAllTutor,logintutor}