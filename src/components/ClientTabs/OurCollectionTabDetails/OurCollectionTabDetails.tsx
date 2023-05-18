import { useState } from "react";
import { Card, Col, Row } from 'antd';
import { useGetAllProductsQuery } from '../../../store/Slices/Products';
import CollectionTabFilter from '../CollectionTabFilter/CollectionTabFilter';

const { Meta } = Card;

 const OurCollectionTabDetails=()=>{
  const [styleFilter ,setStyleFilter]=useState("")
  const [materialFilter ,setMaterialFilter]=useState("")
  const [colorFilter ,setColorFilter]=useState("")
  console.log(styleFilter)
    const {data ,isSuccess}=useGetAllProductsQuery({})
    let productsData:any
    if(isSuccess){
        productsData=data
    }

    return (
        <>
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
                    style={{ width: 240 }}
                    cover={<img alt="example" src={productsData?.thumbnail        } />}
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