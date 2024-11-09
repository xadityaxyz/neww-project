import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardText, ListGroup, ListGroupItem, Row } from 'reactstrap';
import CategoriesSideMenu from './CategoriesSideMenu';
import { Link, useParams } from 'react-router-dom';
import { loadPostCategoryWise } from '../services/userServices';

function BlogCatogriesById() {
    const { categoryId } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        console.log(categoryId);
        loadPostCategoryWise(categoryId)
            .then(data => {
                // Assuming data is an array of posts
                if (Array.isArray(data)) {
                    setPosts(data);
                } else if (data.posts && Array.isArray(data.posts)) {
                    setPosts(data.posts);
                } else {
                    console.error('Unexpected data format:', data);
                    setPosts([]);
                }
            })
            .catch(error => {
                console.error('Error loading posts:', error);
                setPosts([]); // Handle error by setting posts to an empty array
            });
    }, [categoryId]);

    return (
        <div>
            <Row>
                <div className='col-md-3'>
                    <CategoriesSideMenu />
                </div>
                <div className='col-md-9'>
                    {posts.length > 0 ? (
                        posts.map((post, index) => (
                            <div key={post.postId} className="col-md-8 mb-4">
                            <Card>
                              <CardBody>
                                <h3>{post.title}</h3>
                                <hr />
                                <CardText>
                                  {post.content}
                                </CardText>
                                <div className="text-center mt-3">
                                  <Link to={`/posts/${post.postId}`} className="btn btn-primary">Read More</Link>
                                </div>
                              </CardBody>
                            </Card>
                          </div>
                            
                            
                        ))
                    ) : (
                        <p>No posts available for this category.</p>
                    )}
                </div>
            </Row>
        </div>
    );
}

export default BlogCatogriesById;
