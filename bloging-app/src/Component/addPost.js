import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap'
import { doCreatPost, loadAllCategories } from '../services/userServices'
import { getUserDetail } from '../auth'

const  AddPost=()=> {
  const [categories,setCategories]= useState([]) 
  const [user,setUser]= useState(undefined)

const[post,setPost]=   useState({
   title:'',
   content:'',
   categoryId :0

  })

  useEffect(() => {
    setUser(getUserDetail())
    loadAllCategories().then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch(error=>{
        console.error(error);
      })
  }, []);

 const fieldChange=(event)=>{
      console.log(event.target.value)
      setPost({...post,[event.target.name]:event.target.value})
    }

    const createPost = (event) => {
      event.preventDefault();
      console.log(post)
      if(post.title.trim()===''){
        alert("Title Required")
        return
      }
      if(post.content.trim()===''){
        alert("Content Required")
        return
      }
      console.log(user)
      post['userId']=user.id
      doCreatPost(post).then(data=>{
        console.log("post add susuufully")
        alert("Post Crated")
      }).catch((error)=>{
        console.log(error);
      })
    }

  return (
    <div className='wrapper m-5'>
     
     <Card>
      <CardBody className='container mt-2'>
      <h1>Whats in Your idea</h1>
      <Form onSubmit={createPost}>
        <div>
        <Label for="title">Post Title</Label>
        <Input type='text' id="title" placeholder='enter title' name='title' onChange={fieldChange}/>
        </div>

        <div className='mt-2  '>   
        <Label for="content">Post Cotent</Label>
        <Input type='textarea'  style={{height:'275px'}} id="content" placeholder='enter content' name='content' onChange={fieldChange}/>
        </div>

        <div>
        <Label for="categary">Post Categary</Label>
        <Input type='select' id="categary" placeholder='enter content' name='categoryId' onChange={fieldChange}>
          {
            categories.map(catgory=>(
              <option value={catgory.categoryId} key={catgory.categoryId}>{
                catgory.categoryTitle}</option>
            ))
          }
          {/* <option>Testing</option>
          <option>Typing</option> */}
        </Input>
        </div>
        <Container className='text-center mt-2'>
          <Button type='submit' color='primary'>Creat Post</Button>
        </Container>
      </Form>
      </CardBody>
     </Card>
    </div>
  )
}

export default AddPost
