import { useEffect, useState } from "react";
import { getAllPosts, loadAllCategories } from "../services/userServices";
import { Card, CardBody, CardText, Col, ListGroup, ListGroupItem, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";
import { Link } from "react-router-dom";
import CategoriesSideMenu from "../Component/CategoriesSideMenu";
import '../css/pagination.css'; 
const Home = () => {
  const [postContent, setPostContent] = useState({
    content :[],
    totalPages : '',
    totalElement : '',
    pageSize : '',
    lastPage : false,
    pageNumber : ''

  });

  useEffect(() => {
    getAllPosts(0,8)
      .then((data) => {
       // console.log(data);
        setPostContent(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const changePage = (pageNumber = 0, pageSize = 8) => {
    getAllPosts(pageNumber, pageSize).then(data => {
      setPostContent(data);
    });
  };
//this functionuse to truncate content upto specific limit
  const truncateContent = (content, wordLimit) => {
    const words = content.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : content;
  };
  
 
  return (


       
<div >

  <div class="row">
    {/* <div class="col-md-2" style={{margin:'20px'}}>
      <h3>Categories</h3>
      
    <CategoriesSideMenu/>
    </div> */}
    <div className="row">
        <div className="col-md-12">
          <h1 className="text-center">Blog Content ({postContent?.totalElements})</h1>
          <Row className="justify-content-center">
            {postContent === null ? (
              <p>Loading...</p>
            ) : (
              postContent.content.map((post) => (
                <Col md="3" className="mb-4" key={post.postId}>
                  <Card>
                    <CardBody>
                      <h3>{post.title}</h3>
                      <hr />
                      <CardText>
                        {truncateContent(post.content, 70)}
                      </CardText>
                      <div className="text-center mt-3">
                        <Link to={`/posts/${post.postId}`} className="btn btn-primary">Read More</Link>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </div>
      </div>
    
  </div>
  <Pagination className="container">
<PaginationItem onClick={() => changePage(--postContent.pageNumber)} disabled={postContent.pageNumber === 0} >
<PaginationLink  previous>
  </PaginationLink>
</PaginationItem>


{[...Array(postContent.totalPages)].map((item, index) => (
      <PaginationItem onClick={() => changePage(index)} active={index===postContent.pageNumber} key={index}>
        <PaginationLink >{index + 1}</PaginationLink>
      </PaginationItem>
    ))}
<PaginationItem onClick={() => changePage(++postContent.pageNumber)} >
<PaginationLink disabled={postContent.lastPage=== true} next>
  </PaginationLink>
</PaginationItem>

</Pagination>
</div>

  );
};

export default Home;
