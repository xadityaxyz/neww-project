import React from 'react'
import { Outlet ,Navigate} from 'react-router-dom';
import { isLoggedIn } from '../auth';
const privateRoute=()=> {
    
    if(isLoggedIn()){
       return <Outlet/>
    }else{
        return <Navigate to={"/login"}/>
    }
//   return (
//     <div>
//       <h1>This is private route</h1>
//       <Outlet/>
//     </div>
//   )
}

export default privateRoute;