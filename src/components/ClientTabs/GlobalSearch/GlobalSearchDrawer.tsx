import React, { useState } from 'react';
import { Button, Card, Col, Drawer, Input, Row, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../store';
import { closeGlobalSearchDrawer } from '../../../store/Slices/OpenDrawerSlice';
import searchIcon from "../../../assets/icons/search.svg";
import { useGlobalSearchQuery } from '../../../store/Slices/Products';
import { Link, useNavigate } from 'react-router-dom';
import { debouncedSearch } from '../../../utils/utils';
import './GlobalSearch.scss'
const GlobalSearch = () => {
  const [globalSearch ,setGlobalSearch]=useState("")
  const dispatch = useDispatch();

  const isOpen = useAppSelector((state) => state.drawer.isOpenGlobalSearchDrawer);
  const onClose = () => {
    dispatch(closeGlobalSearchDrawer());
  }
  const paramsObj: any = {};
  if (globalSearch) paramsObj["name"] = globalSearch;
  const navigate = useNavigate();
 
  const query = "?" + new URLSearchParams(paramsObj).toString();
     const {data:dataProducts ,isSuccess:isSuccessProducts}=useGlobalSearchQuery({query})
     let productsData:any
     if(isSuccessProducts){
         productsData=dataProducts
     }
    //search
    const debouncedResults = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      debouncedSearch(value, setGlobalSearch);
    };
    
  return (
    <>
     
      <Drawer title="" width={"100%"} placement="right" className='drawer-main' onClose={onClose} open={isOpen} >
    <Row>
      <Col sm={24}>
      <Input
              className="search-input"
              placeholder="Search..."
              onChange={debouncedResults}
              prefix={
                <img
                  src={searchIcon}
                  alt="searchIcon"
                  width={22}
                  height={22}
                  style={{ marginRight: "0.623rem" }}
                />
              }
            />
      </Col>
      <Col sm={24} style={{textAlign:"center"}}>
    <Link to="">View All</Link>
      </Col>
    </Row>
     {globalSearch?.length>0 &&
    <Row gutter={[16,16]} style={{marginTop:"20px"}}>
      {
        productsData?.map((productData: any) => (
          <Col xs={24} md={12} lg={6} key={productData.id}>
            <Card 
              hoverable
              onClick={() => navigate("/productDetails", { state: { productDetails: productData } })}
              style={{  background: "linear-gradient(135deg, rgba(68,68,68,1) 6%, rgba(0,0,0,1) 95%)",border:"0px solid transparent"}}
           cover={  <img alt="example" src={productData?.thumbnail}  />}
            >
          <div style={{textAlign:"center",padding:"0"}}>
        
              <p style={{fontWeight:"bold",color:"white",padding:"0px",margin:"2px"}}> {productData?.name}</p>
              <p style={{color:"white",padding:"0px",margin:"2px"}}>{productData?.description}</p>
              <p style={{fontWeight:"bold",color:"#65cdf0",padding:"0px",margin:"2px"}}>$ {productData?.price}</p>
          </div>
            </Card>
          </Col>
       )) }
    </Row>}
      </Drawer>
    </>
  );
};

export default GlobalSearch;