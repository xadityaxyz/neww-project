import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { loadAllCategories } from '../services/userServices';
import { Link } from 'react-router-dom';

function CategoriesSideMenu() {
    const [catagories,setcatagories]=useState([])
 useEffect(() => {
  loadAllCategories().then(data => {
    console.log(data)
    setcatagories([...data]);
  }).catch(error => {
      console.error('Error loading categories:', error);
  });
}, []);
  return (
    <div>
      <ListGroup>
          <ListGroupItem tag={Link} to={"/"} action={true}> 
            All Blogs
          </ListGroupItem>
          {
            catagories && catagories.map((cat,index)=>{
              return (
                <ListGroupItem tag={Link} to={"/categoreis/"+cat.categoryId} key={index} action={true}>
                  {cat.categoryTitle}
                </ListGroupItem>
              )
            })
          }
        </ListGroup>
    </div>
  )
}

export default CategoriesSideMenu
