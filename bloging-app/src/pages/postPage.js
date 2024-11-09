import React, { useEffect, useState } from 'react'
import Base from '../Component/Base'
import { useParams } from 'react-router-dom'
import { createComment, loadPost } from '../services/userServices'
import { Button, Card, CardBody, CardText, Input } from 'reactstrap'
import { Base_Url } from '../services/helper'
import { toast } from 'react-toastify'
import { isLoggedIn } from '../auth'
import profileImage from '../logo.svg';
const PostPage=()=> {
    const {postId }=useParams()
    const [post, setPost] = useState(null);
    const [content ,setComment]=useState({
        content:''
    })
    const submitComment=()=>{
        if(!isLoggedIn()){
            toast.error("Please Login First !")
            return
        }
       createComment(content,post.postId).then((data)=>{
        console.log(data)
        toast.success("comment added")
        setPost({
            ...post,comments:[...post.comments,data.data]
        })
        setComment({
            content:''
        })
       }).catch(error=>{
        console.log(error)
       })
    }

    useEffect(() => {
        loadPost(postId).then(data => {
            console.log(data)
            data.addedDate = new Date(data.addedDate).toLocaleString();
            setPost(data); // Set the post data received from the API response
        }).catch(error => {
            console.error('Error loading post:', error);
        });
    }, [postId]);
  return (
   
      <Base>
     
      <div>
        {
      (post)&&(
         <Card className='container  col-8 mt-2'>
         <CardBody> 
            
             Post By : <b> {post.user.name}</b>  {post.addedDate}
                           <CardText>
                            <span>{post.category.categoryTitle}</span>
                           </CardText>
                        <p></p>

                        <div className='image-container'>
                        {console.log(Base_Url)}
                        <img className='img-fluid shadow' src={Base_Url + '/api/v1/post/image/'+post.imageName} alt="Post Images" />
                         <CardText dangerouslySetInnerHTML={{__html:post.content}}>

                         </CardText>
                        </div>
         </CardBody>
      </Card>
      )
      }  
      <hr/>
        {post && (
    <h3>Comments {post.comments?.length}</h3>
)}
        {post && post.comments && post.comments ?.map((comment, index) => (
    <Card key={index} className="mb-3">
    <CardBody className="d-flex align-items-start">
    <img src={profileImage} alt="Profile Icon" style={{ width: '50px', height: '50px', marginRight: '15px', borderRadius: '50%' }} />
      <div>
        <CardText className="mb-0"><strong>{comment.userName}</strong></CardText>
        <CardText>{comment.content}</CardText>
      </div>
    </CardBody>
  </Card>
))}

<Card >
        <CardBody>
            <CardText>
<Input  required
    type='textarea' 
    placeholder='Enter Comment here' 
    value={content.content} 
    onChange={(event) => setComment({ content: event.target.value })} // Corrected event.target
/>
               <Button onClick={submitComment} type='button'  className='mt-2' color='primary'>Submit</Button>
            </CardText>
        </CardBody>
    </Card>
      </div>
      </Base>
    
  )
}

export default PostPage
