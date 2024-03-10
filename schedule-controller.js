const Schedules=require("../model/Schedules")
const {createCustomError}=require('../custom-error/custom-error-handler')

const getSchedule= async(req,res)=>{
    
    const {tutorid,studentid}=req.query;
    const queryobject={}
    if(tutorid)
    queryobject.tutorid=tutorid;
    if(studentid)
    queryobject.studentid=studentid;
    const schedules=Schedules.find(queryobject)
    if(!schedules){
     return next(createCustomError(`No task with id: ${req.params.id}`,404));
    }
    res.status(200).json({schedules});
}

const createSchedule=async(req,res)=>{
    const {starttime,duration,tutorid,studentid,courseid}=req.body;
    const queryobject={}
    if(tutorid)
    queryobject.tutorid=tutorid;

    const schedules=await Schedules.find(queryobject)
    flag=0
    if(schedules){
        console.log(schedules)
    }
    for(i=0;i<schedules.length;i++){
        let stime=schedules[i].starttime;
        let endtime=stime+schedules[i].duration/60;
        if(stime<=starttime && endtime>starttime)
        {
            flag=1;
            break;
        }
    }
    if(flag){
        return next(createCustomError(`Not possible to book the slot `,404));
    }

    let max=1000;
    let next=-1;
    for(i=0;i<schedules.length;i++){
        let stime=schedules[i].starttime;
        
        if(stime<max && stime>starttime)
        {
            next=stime;
            //break;
            max=next;
        }
    }

    if(max-starttime<duration/60){
        return next(createCustomError(`Not possible to book the slot `,404));
    }

    const schedule= await Schedules.create(req.body);
    //console.log(s)
    res.status(201).json({schedules});
}


module.exports={createSchedule,getSchedule}