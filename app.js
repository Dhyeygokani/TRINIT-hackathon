const express=require('express');
const app=express();
const connectDB=require('./db/connect');
require('dotenv').config();
require('express-async-errors');
 const StudentRouter=require('./routes/StudentRouter');
 const ScheduleRouter=require('./routes/ScheduleRouter');
 const TutorRouter=require('./routes/TutorRouter');
 const CourseRouter=require('./routes/CourseRouter');
const notFound=require('./middleware/notFound');
const errorHandlerMiddleWare=require('./error-handler');
app.set("view engine","ejs")
app.use(express.static('public'))
//
app.use(express.static('./public'))
 app.use(express.json());

//routes

app.get('/',(req,res)=>{
    res.render('SignUp');
})

app.get('/studentHome',(req,res)=>{
    res.render('studentHome');
})

app.get('/search',(req,res)=>{
    res.render('search');
})

app.use('/api/v1/student',StudentRouter);
app.use('/api/v1/schedules',ScheduleRouter);
app.use('/api/v1/tutors',TutorRouter)
app.use('/api/v1/courses',CourseRouter)

// app.use(notFound);
// app.use(errorHandlerMiddleWare);

port=process.env.PORT||4000;

const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=>console.log(`Server listening on port ${port}`));
    }catch(err){
        console.log(err);
    }
}

start();


