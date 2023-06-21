import { useState } from "react";
import { Card,  Col, Row, Select, Spin } from 'antd';
import { useGetAllCategoriessQuery, useGetAllColorsQuery, useGetAllMaterialsQuery, useGetAllProductsQuery } from '../../../store/Slices/Products';
import CollectionTabFilter from '../CollectionTabFilter/CollectionTabFilter';
import { useNavigate } from "react-router-dom";
import Arrow  from "../../../assets/images/OnBoarding/arrow.svg"
import './OurCollectionDetails.scss'
import { text } from "stream/consumers";

const { Meta } = Card;

 const OurCollectionTabDetails=()=>{
  const [styleFilter ,setStyleFilter]=useState("")
  const [materialFilter ,setMaterialFilter]=useState("")
  const [colorFilter ,setColorFilter]=useState("")
  const [sortFilter ,serSortFilter]=useState("")

   const {data ,isSuccess}=useGetAllCategoriessQuery({})
  
  const {data:isDataMaterial ,isSuccess:isSuccessMaterial}=useGetAllMaterialsQuery({})
  const {data:isColorData ,isSuccess:isSuccessColor}=useGetAllColorsQuery({})

let categoryData:any
let materialFilterData:any
let colorFilterData:any
if(isSuccess){
  categoryData=data
  materialFilterData=isDataMaterial
  colorFilterData=isColorData
}
 //query parameters of search and filter
const categoriesFilterValue=categoryData?.map((categoryFilter:any)=> {return {value:categoryFilter?.name,label:categoryFilter?.name}} )
const styleFilterValue=materialFilterData?.map((categoryFilter:any)=> {return {value:categoryFilter?.name,label:categoryFilter?.name}} )
const colorFilterValue=colorFilterData?.map((categoryFilter:any)=> {return {value:categoryFilter?.name,label:categoryFilter?.name}} )
 const paramsObj: any = {};
 if (styleFilter) paramsObj["categoryName"] = styleFilter;
 if (materialFilter) paramsObj["materialName"] = materialFilter;
 if (colorFilter) paramsObj["colorName"] = colorFilter;
 if (sortFilter) paramsObj["sortBy"] = sortFilter;

 const query = "?" + new URLSearchParams(paramsObj).toString();
    const {data:dataProducts ,isSuccess:isSuccessProducts}=useGetAllProductsQuery({query})
    let productsData:any
    if(isSuccessProducts){
        productsData=dataProducts
    }
    const handleApplicationStage=(applicationStageValue:any)=>{
      serSortFilter(applicationStageValue)
    }
    const navigate = useNavigate();
    return (
        <>
       <div className="header-image-our-collection">
  <div className="image-content">
    <h1 className="image-heading-title">BROWSE COLLECTION</h1>
    <p className="image-heading-subheading">Shop from our range of finest leather shoes crafted to perfection</p>
    <p className="image-heading-subheading">We design footwear to last you a lifetime. The finest designs — a pinnacle of elegance.</p>
  </div>
</div>

        <Row style={{margin:"20px 0px",padding:"16px"}} gutter={[16,16]}>
            <Col xs={24} md={6} >
            <Select
          defaultValue="SORT..."
            className="select-onboarding"
            onChange={(value:any)=>handleApplicationStage(value)}
            style={{ width: "100%" }}
            suffixIcon={<img src={Arrow} />}
            options={[
         
              { value: "popularity", label: "By Popularity" },
              { value: "from_a-z", label: "From A-Z" },
              { value: "from_z-a", label: "From Z-A" },
             
            ]}
          />
         
            </Col>
            <Col xs={24} md={6}>
            <Select
          defaultValue="STYLE..."
            className="select-onboarding"
            onChange={(value:any)=>setStyleFilter(value)}
            style={{ width: "100%" }}
            suffixIcon={<img src={Arrow} />}
            options={categoriesFilterValue}
          />
         
            </Col>
            <Col xs={24} md={6}>
            <Select
          defaultValue="MATERIAL..."
            className="select-onboarding"
            onChange={(value:any)=>setMaterialFilter(value)}
            style={{ width: "100%" }}
            suffixIcon={<img src={Arrow} />}
            options={styleFilterValue}
          />
         
            </Col>
            <Col xs={24} md={6}>
            <Select
          defaultValue="COLOR..."
            className="select-onboarding"
            onChange={(value:any)=>setColorFilter(value)}
            style={{ width: "100%" }}
            suffixIcon={<img src={Arrow} />}
            options={colorFilterValue}
          />
         
            </Col>
        </Row>
        <Row >
  {/* <Col xs={24} md={24} lg={6} style={{backgroundColor:"#000000"}}>
    <CollectionTabFilter
      setStyleFilter={setStyleFilter}
      setMaterialFilter={setMaterialFilter}
      setColorFilter={setColorFilter}
    />
  </Col> */}

  <Col xs={24} md={24} lg={24} style={{padding:"30px"}}>
    {productsData?.length>0?
    <Row gutter={[16,16]}>
      {isSuccess ?
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
       )) :<Spin/>}
    </Row>:<p style={{color:"white",fontSize:"large",textAlign:"center"}}>No Products</p>}
  </Col>
     </Row>
        
        </>
      
    )

}
export default OurCollectionTabDetails