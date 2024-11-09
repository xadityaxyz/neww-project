import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Base from './Component/Base'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import SignUp from './pages/Signup'
import AboutUs from './pages/aboutUs';
import Login from './pages/Login';
import Create from './pages/create'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Userdashboard from "./pages/User-route/userdashboard";
import PrivateRoute from './Component/privateRoute';
import Profile from './pages/User-route/profile';
import CustomNavbar from './Component/CustomNavbar'; // Import CustomNavbar component
import PostPage from './pages/postPage';
import BlogCatogriesById from './Component/blogCatogriesById';
function App() {
  return (
    <Base>
      <BrowserRouter>
        <CustomNavbar /> {/* Render CustomNavbar within BrowserRouter */}
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/kartik" element={<SignUp />} />
          <Route path="/posts/:postId" element={<PostPage />} />
          <Route path="/categoreis/:categoryId" element={<BlogCatogriesById />} />
          <Route path="/user" element={<PrivateRoute />} >
            <Route path="dashboard" element={<Userdashboard />} />
            <Route path="profile" element={<Profile />} />
           
          </Route>
        </Routes>
      </BrowserRouter>
    </Base>
  );
}

export default App;
