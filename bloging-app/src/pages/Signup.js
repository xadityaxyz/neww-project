import { Card, CardBody, CardHeader, Container, FormFeedback, FormGroup, Input, Label } from "reactstrap";

import { useEffect, useState } from "react";
import { singup } from "../services/userServices"; 
import {toast} from "react-toastify"
const SignUp = () => {
const [data,setData]=  useState({
    name:'',
    email:'',
    password:'',
    about:''
  })
  const [error, setError] = useState({
    errors: {},
    isError: false
});
 
useEffect(() => {
  console.log(data);
}, [data]);

  const handeleChange=(event,property)=>{
   console.log("error change")
   // console.log(event.target.value)
   setData({...data,[property]:event.target.value})
  }

  const submitForm=(event)=>{
    event.preventDefault(); //
    if(error.isError){
      toast.error("Form having invalid Data ")
      setError({...error,isError:false})
      return ;
    }
    singup(data).then((resp)=>{
      console.log(resp)
      console.log("sucess")
      toast.success("User Registerd Succesfully")
      setData({
        name:'',
        email:'',
        password:'',
        about:''
      })
    }).catch((error)=>{
      console.log(error)
      setError({
        errors : error,
        isError : true
      })
    }
    
    )
  }

  return (
    <div>
      <Container>
        <Card>
          <CardHeader>
            <h3>Fill the registration form !!</h3>
          </CardHeader>
          <CardBody>
            <form onSubmit={submitForm}>
              <FormGroup>
                <Label htmlFor='name'>Enter Name</Label>
                <Input type="text" id="name" placeholder="Enter Name"  onChange={(e)=>handeleChange(e,'name')} value={data.name}
                invalid={error?.errors?.response?.data?.name? true:false}/>
                <FormFeedback>
                  {error?.errors?.response?.data?.name}
                </FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label htmlFor='email'>Enter Email</Label>
                <Input type="email" id="email" placeholder="Enter Email" onChange={(e)=>handeleChange(e,'email')} value={data.email}
                 invalid={error?.errors?.response?.data?.email? true:false}/>
                 <FormFeedback>
                  {error?.errors?.response?.data?.name}
                </FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label htmlFor='password'>Enter Password</Label>
                <Input type="password" id="password" placeholder="Enter Password" onChange={(e)=>handeleChange(e,'password')} value={[data.password]}
                 invalid={error?.errors?.response?.data?.password? true:false} />
                   <FormFeedback>
                  {error?.errors?.response?.data?.password}
                </FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="exampleText">Text Area</Label>
                <Input type="textarea" id="exampleText" rows="4" placeholder="Enter your message here" onChange={(e) => handeleChange(e, 'about')} value={data.about} invalid={error?.errors?.response?.data?.about ? 'true' : ''}/>
                <FormFeedback>{error?.errors?.response?.data?.about}</FormFeedback>
              </FormGroup>
              <Container>
                <button type="submit">Submit</button>
              </Container>

              <div>
  <Input
  />
</div>
            </form>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default SignUp;
