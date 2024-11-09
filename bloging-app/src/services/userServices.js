import SignUp from "../pages/Signup";
import { myAxios } from "./helper";
import { privateAxios } from "./helper";
 export const singup=(user)=>{
    return myAxios
    .post("/api/v1/auth/register",user)
    .then((response)=>response.data)
 }

 export const loginUser = (loginDetail) => {
   return myAxios.post("/api/v1/auth/login", loginDetail).then((response) => response.data);
}

export const loadAllCategories=(user)=>{
   return myAxios
   .get("/api/v1/categories/",user)
   .then((response)=>response.data)
}

export const doCreatPost=(addPost)=>{
  // console.log(addPost)
   return privateAxios
   .post(`/api/v1/user/${addPost.userId}/category/${addPost.categoryId}/posts`, addPost)
   .then((response)=>response.data)
}


//get all posts

// export const getAllPosts=()=>{
//    return myAxios
//    .get("/api/v1/posts")
//    .then((response)=>response.data)
// }

export const getAllPosts = (pageNumber, pageSize) => {
   return myAxios
     .get(`/api/v1/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`)
     .then((response) => response.data);
 };

 // load post by id

export const loadPost = (postId) => {
   return myAxios
     .get(`/api/v1/posts/${postId}`)
     .then((response) => response.data);
 };

 //create commnet
 export const createComment=(content,postId)=>{
     return privateAxios.post(`/api/v1/post/${postId}/comments`,content)
 }

 //load post categorywise
 export const loadPostCategoryWise=(categoryId)=>{
   return privateAxios.get(`/api/v1/category/${categoryId}/posts`).then(res=>res.data)
  }


