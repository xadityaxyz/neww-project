import { useState } from "react";
import { Card, CardBody, CardHeader, Container, FormGroup, Input, Label } from "reactstrap";
import { loginUser } from "../services/userServices";
import { toast } from "react-toastify";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css"
// import '../css/login.css'; 
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
  
}
from 'mdb-react-ui-kit';
const Login=()=>{

  const navigate=useNavigate();
 const [loginDetail,setLoginDetail] =useState({
    username :'',
    password :''

  })
  const handleChange=(event,field)=>{
    let actualValue=event.target.value;
    setLoginDetail({
      ...loginDetail,[field]:actualValue
    })
  }
  const submitForm = (event) => {
    event.preventDefault(); 
    console.log(loginDetail);

    // Submit the data to the server to generate the token
    loginUser(loginDetail)
        .then((data) => {
            console.log("user data !");
            console.log(data.jwtTokenDate);

             //save login detail to localstorage
           doLogin(data,()=>{
            console.log("login details save to local storage")
            navigate("/user/dashboard")
           })
           
          toast.success("suecessful login ")
        })
        .catch(error => {
            if (error && error.response && (error.response.status === 404 || error.response.status === 400)) {
                // Handle specific error codes
                toast.error(error.response.data.message.toString());
            } else if (error && error.response) {
                // Handle other response errors
                toast.error(`Error: ${error.response.data.message}`);
            } else {
                // Handle other errors
                toast.error("Something went wrong");
            }
            console.error(error);
        });
};
    return (
        <div>
           {/* <Container>
        <Card>
          <CardHeader>
            <h3>Fill the registration form !!</h3>
          </CardHeader>
          <CardBody>
            <form onSubmit={submitForm}>
          
              <FormGroup>
                <Label htmlFor='email'>Enter Email</Label>
                <Input type="email" id="email" placeholder="Enter Email" value={loginDetail.username} onChange={(e)=>handleChange(e,'username')}/>
              </FormGroup>
              <FormGroup>
                <Label htmlFor='password'>Enter Password</Label>
                <Input type="password" id="password" placeholder="Enter Password" value={loginDetail.password}  onChange={(e)=>handleChange(e,'password')} />
              </FormGroup>
           
              <Container>
                <button type="submit" color="redn">Login</button>
              </Container>
              <div>
  
</div>
            </form>
          </CardBody>
        </Card>
      </Container> */}

      <MDBContainer className="my-5 col-md-8" >

<MDBCard>
  <MDBRow className='g-0'>

    <MDBCol md='6'>
      <MDBCardImage style={{ height: '80vh' }}  src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100'/>
    </MDBCol>

    <MDBCol md='6'>
      <MDBCardBody className='d-flex flex-column'>

        <div className='d-flex flex-row mt-2'>
          <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
          <span className="h1 fw-bold mb-0">OWN-BLOGS</span>
        </div>

        <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
        <form onSubmit={submitForm}>
          <MDBInput wrapperClass='mb-4' label='Email address'  type='email' size="lg" id="email"  value={loginDetail.username} onChange={(e)=>handleChange(e,'username')}/>
          <MDBInput wrapperClass='mb-4' label='Password' type="password" id="password"  value={loginDetail.password}  onChange={(e)=>handleChange(e,'password')}/>

        <MDBBtn type="submit" className="mb-4 px-5 w-100" color='dark' size='lg'>Login</MDBBtn>
        </form>
        <a className="small text-center" href="#!">Forgot password?</a>
        <p className="mb-5 pb-lg-2 text-center" style={{color: '#393f81'}}>Don't have an account? <a href="#!" style={{color: '#393f81'}}>Register here</a></p>

        <div className='d-flex flex-row justify-content-center'>
          <a href="#!" className="small text-muted me-1">Terms of use.</a>
          <a href="#!" className="small text-muted">Privacy policy</a>
        </div>

      </MDBCardBody>
    </MDBCol>

  </MDBRow>
</MDBCard>

</MDBContainer>
      
        </div>
    );
};

export default Login;