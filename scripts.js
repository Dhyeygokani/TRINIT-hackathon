const name_=document.querySelector('#email');
const password=document.querySelector('#password')
const checkbox=document.querySelector('#isTutor')
const header=document.querySelector('.form-container h2')
const para=document.querySelector('.form-container p')
// const link=document.querySelector('.form-container a')
let loginFlag=1;

 const login =async() =>{
    console.log(checkbox.checked)
    const nameValue=name_.value;
    const passValue=password.value;
    const a=checkbox.checked;
    try {
        // console.log(nameInput.value,email,password);
        if(!a)
        {
        const {data:{d:{name,_id:userId,flashcards}}}= await axios.post('/api/v1/student/login',{
            name:nameValue,password:passValue
        })
       console.log(name)
       console.log(userId)
       console.log(flashcards)
       console.log(Array.isArray(flashcards))
       localStorage.setItem("name",name);
       localStorage.setItem("userId",userId);
       localStorage.setItem("flashcards",flashcards);
       window.open("studentHome",target="_self");
    }
    else{
        const {data:{d:{name,_id:userId,courses}}}= await axios.post('/api/v1/tutors/login',{
            name:nameValue,password:passValue
        })
       console.log(name)
       console.log(userId)
       console.log(courses)
       localStorage.setItem("name",name);
       localStorage.setItem("userId",userId);
       localStorage.setItem("courses",courses);
    }
       ///localStorage.setItem("token",token);
        // console.log('hi');
    } catch (error) {
        console.log(error);
        
       
    }
}

const register=async()=>{
    // event.preventDefault();
console.log('hi');
const nameValue=name_.value;
const passValue=password.value;
const a=checkbox.checked;
try {
    // console.log(nameInput.value,email,password);
    if(!a){
        const {data:{d:{name,_id:userId,flashcards}}}= await axios.post('/api/v1/student/',{
            name:nameValue,password:passValue
        })
        
       console.log(name)
       console.log(userId)
       console.log(flashcards)
       localStorage.setItem("name",name);
       localStorage.setItem("userId",userId);
       localStorage.setItem("flashcards",flashcards);
       window.open("studentHome",target="_self");
    // window.open("index.html",target="_self");
}
else {
    const {data:{d:{name,_id:userId,courses}}}= await axios.post('/api/v1/tutors/',{
        name:nameValue,password:passValue
    })
        
    console.log(name)
    console.log(userId)
    console.log(courses)
    localStorage.setItem("name",name);
    localStorage.setItem("userId",userId);
    localStorage.setItem("courses",courses);
}

    // console.log('hi');
} catch (error) {
    console.log(error);
   
   
}
}

function logSign(){
    if(loginFlag){
        login();
    }
    else register();
    
}


function Toggle(){
    if(loginFlag){
        header.innerHTML="Sign Up"
        para.innerHTML='Already have an account?  <a onclick="Toggle()">Log In</a>';
        // link.innerHTML="log in"
        loginFlag=0
    }
    else{
        header.innerHTML="Log In"
        para.innerHTML='Dont have an account?  <a onclick="Toggle()">Sign Up</a>';
        // link.innerHTML="Sign Up"
        loginFlag=1
    }
   
}

