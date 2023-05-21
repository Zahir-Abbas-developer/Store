import { useState } from "react";
import { Card, Col, Row, Select } from 'antd';
import { useGetAllProductsQuery } from '../../../store/Slices/Products';
import CollectionTabFilter from '../CollectionTabFilter/CollectionTabFilter';
import { useNavigate } from "react-router-dom";

import './OurCollectionDetails.scss'
import { text } from "stream/consumers";

const { Meta } = Card;

 const OurCollectionTabDetails=()=>{
  const [styleFilter ,setStyleFilter]=useState("")
  const [materialFilter ,setMaterialFilter]=useState("")
  const [colorFilter ,setColorFilter]=useState("")
  const [sortFilter ,serSortFilter]=useState("")
 //query parameters of search and filter

 const paramsObj: any = {};
 if (styleFilter) paramsObj["categoryName"] = styleFilter;
 if (materialFilter) paramsObj["materialName"] = materialFilter;
 if (colorFilter) paramsObj["colorName"] = colorFilter;
 if (sortFilter) paramsObj["sortBy"] = sortFilter;

 const query = "?" + new URLSearchParams(paramsObj).toString();
    const {data ,isSuccess}=useGetAllProductsQuery({query})
    let productsData:any
    if(isSuccess){
        productsData=data
    }
    const handleApplicationStage=(applicationStageValue:any)=>{
      serSortFilter(applicationStageValue)
    }
    const navigate = useNavigate();
    return (
        <>
       <div className="header-image">
  <div className="image-content">
    <h1 className="image-heading-title">BROWSE COLLECTION</h1>
    <p className="image-heading-subheading">Shop from our range of finest leather shoes crafted to perfection</p>
    <p className="image-heading-subheading">We design footwear to last you a lifetime. The finest designs — a pinnacle of elegance.</p>
  </div>
</div>

        <Row style={{margin:"20px 0px"}}>
            <Col offset={18} lg={6}>
            <Select
          defaultValue="SORT..."
            className="select-onboarding"
            onChange={(value:any)=>handleApplicationStage(value)}
            style={{ width: "100%" }}
            // suffixIcon={<img src={Arrow} />}
            options={[
         
              { value: "popularity", label: "By Popularity" },
              { value: "from_a-z", label: "From A-Z" },
              { value: "from_z-a", label: "From Z-A" },
             
            ]}
          />
         
            </Col>
        </Row>
        <Row >
  <Col xs={24} md={24} lg={6} style={{backgroundColor:"#000000"}}>
    <CollectionTabFilter
      setStyleFilter={setStyleFilter}
      setMaterialFilter={setMaterialFilter}
      setColorFilter={setColorFilter}
    />
  </Col>

  <Col xs={24} md={24} lg={18}>
    <Row gutter={[80, 80]}>
      {isSuccess &&
        productsData?.map((productData: any) => (
          <Col xs={24} md={12} lg={8} key={productData.id}>
            <Card className="product-card-details"
              hoverable
              onClick={() => navigate("/productDetails", { state: { productDetails: productData } })}
              style={{ width: 240 }}
              cover={<img alt="example" src={productData?.thumbnail} />}
            >
              <Meta title={productData?.name} description={productData?.description} />
              <p>{productData?.price}</p>
            </Card>
          </Col>
        ))}
    </Row>
  </Col>
     </Row>
        
        </>
      
    )

}
export default OurCollectionTabDetails