import axios from "axios";
import { config } from "localforage";
import { getToken } from "../auth";


export const Base_Url = 'http://13.127.36.83:9092';
export const myAxios = axios.create({
    baseURL: Base_Url // Corrected from baseUrl to baseURL
});

export const privateAxios = axios.create({
    baseURL: Base_Url // Corrected from baseUrl to baseURL
});

privateAxios.interceptors.request.use(config=>{
    const token=getToken();
    console.log(token)
    if(token){
        config.headers.Authorization=`Bearer ${token}`
        return config;
    }
    
},error=>Promise.reject(error))
