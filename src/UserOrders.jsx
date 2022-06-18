import React from 'react'  
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';  
import axios from 'axios';  
import { useState, useEffect } from 'react' 
import Foot from './Foot';
import {BrowserRouter,Route,Link,useHistory} from "react-router-dom";
import Toolbaradmin from './Toolbaradmin';
function OrderList(props) {  
    const history=useHistory();
   const [data, setData] = useState([]);  
  const [userName,setName] = useState('');
  const [userId,setId] = useState('');
  

  useEffect(() => {  
    const GetData = async () => {  
      const result = await axios('https://pharmacymanagementwebapiservice20220617105735.azurewebsites.net/api/Order');  
      setData(result.data);  
    };  
  
    GetData();  
  }, []);  
  console.log(data)
  useEffect(() =>{
    (
    async () =>{
      const response =  await fetch('https://pharmacymanagementwebapiservice20220617105735.azurewebsites.net/api/User',{
                method:'GET',
                     headers:{'Content-Type':'application/json'},
                    credentials:'include',
                    
                 });
                 const content = await response.json();
                 // console.log(content.name);
                 console.log(content.userName);
                 console.log(content.userId);
                 setName(content.userName);
                 setId(content.userId)
             }
        )();
    },[]);
 
  const placeorder = (orderId) => {  
    props.history.push({ 
      pathname: '/verify/' + orderId
    });  
  };  
  
  return (  
    <div class="bg_image">
   <Toolbaradmin/>
        <div class="container"> 
        <h2 class="text-primary">Order Details: {userName}{userId}</h2>
      <Row>  
        <Col>  
           
              <table class="table table-success table-striped">  
                <thead>  
                  <tr>  
                  
                    <th scope="col">Oredr Id</th>
                    <th scope="col">Drug Id</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total Amount</th>
                    <th scope="col">Drug Name</th>
                    <th scope="col">Expiry Date</th>
                    <th scope="col">Action</th>
                  
                  </tr>  
                </thead>  
                <tbody>  
                    {data.map(emp=>
                             <tr>
                             <th scope="row">{emp.orderId}</th>
                             <td>{emp.drugId}</td>
                             <td>{emp.quantity}</td>
                             <td>{emp.totalAmount}</td>
                             <td>{emp.drug.drugName}</td>
                             <td>{emp.drug.expiryDate}</td>
                             <td>
                             <button className="btn btn-success" onClick={() => { placeorder(emp.orderId)}}>Confirm</button> 
                              </td>
                           </tr>
                     )}    
                </tbody>  
              </table>  
            
        </Col>  
      </Row>  
      </div>
    <Foot/>
    </div> 
  )  
}  
  
export default OrderList  