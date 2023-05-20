import { useState } from "react";
import { Card, Col, Row } from 'antd';
import { useGetAllProductsQuery } from '../../../store/Slices/Products';
import CollectionTabFilter from '../CollectionTabFilter/CollectionTabFilter';
import { useNavigate } from "react-router-dom";

import './OurCollectionDetails.scss'

const { Meta } = Card;

 const OurCollectionTabDetails=()=>{
  const [styleFilter ,setStyleFilter]=useState("")
  const [materialFilter ,setMaterialFilter]=useState("")
  const [colorFilter ,setColorFilter]=useState("")
 //query parameters of search and filter

 const paramsObj: any = {};
 if (styleFilter) paramsObj["categoryName"] = styleFilter;
 if (materialFilter) paramsObj["materialName"] = materialFilter;
 if (colorFilter) paramsObj["colorName"] = colorFilter;
 const query = "?" + new URLSearchParams(paramsObj).toString();
    const {data ,isSuccess}=useGetAllProductsQuery({query})
    let productsData:any
    if(isSuccess){
        productsData=data
    }
    const navigate = useNavigate();
    return (
        <>
         <p className="header-image">

            <h1 className="image-heading-title">BROWSE COLLECTION</h1>
            <p className="image-heading-subheading">Shop from our range of finest leather shoes crafted to perfection</p>
         </p>
        <Row>
            <Col>
           
         
            </Col>
        </Row>
       <Row >
        <Col  xs={24}  md={24} lg={12}>
        <CollectionTabFilter setStyleFilter={setStyleFilter} setMaterialFilter={setMaterialFilter}setColorFilter={setColorFilter} />
        </Col>
        
               { isSuccess &&
            productsData?.map((productsData:any)=>{
                return (
                   <Col xs={24}  md={24} lg={12}>
                    <Card
                    hoverable
                    onClick={()=>navigate("/productDetails" ,{state:{productDetails:productsData}})}
                    style={{ width: 240 }}
                    
                    cover={<img alt="example" src={productsData?.thumbnail } />}
                  >
                    <Meta title={productsData?.name} description={productsData?.description}  />
                    <p>{productsData?.price}</p>

                  </Card>
                   </Col>
                )
               
            })
        }
       </Row>
        
        </>
      
    )

}
export default OurCollectionTabDetails