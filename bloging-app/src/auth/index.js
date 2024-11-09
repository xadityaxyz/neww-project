import { json } from "react-router-dom"
//isLoggedIn

export const isLoggedIn=()=>{
    let data=localStorage.getItem("data");
    if(data==null){
        return false
    }else{
        return true
    }
}

//doLogin

export const doLogin=(data,next)=>{
    localStorage.setItem("data",JSON.stringify(data))
    next();
}

//doLogout

export const  doLogout=(next)=>{
    localStorage.removeItem("data")
    next();
}

//getUserDetail{
export const getUserDetail=()=>{
    if (doLogin) {
       
      
            return JSON.parse(localStorage.getItem("data"))?.user;
       
    } else {
        return undefined;
    }
}

export const getToken=()=>{
    if (isLoggedIn) {
        return JSON.parse(localStorage.getItem("data"))?.token;
   
} else {
    return undefined;
}
}