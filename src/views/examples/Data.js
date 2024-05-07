import axios from 'axios';
import Header from 'components/Headers/Header';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap';
import Cards from './Login'';
const Data=()=> {
    const[data,setData]=useState();
    const api="http://localhost:9091/ratings/661fa59a42012074b5661c03";
    useEffect(()=>{
      axios.get(api).then((data)=>{
        setData(data.data.item);
        console.log(data)
      }).catch((er)=>{
        setData(er.response.data.item);
      })
    },)
  return (
        <>
          <Header />
          <Container style={{marginTop:"50px"}} fluid>
                <section className='iteam_section mt-4 container'>
                <div className="row mt-2 d-flex justify-content-around align-items-center">
                 <Cards data={data} /> 
                </div>
            </section>
          </Container>
        </>
      );
}

export default Data