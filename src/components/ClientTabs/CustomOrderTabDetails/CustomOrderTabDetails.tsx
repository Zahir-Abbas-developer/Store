import { useState } from "react";
import { Button, Card, Col, Modal, Row, Select } from 'antd';
import { useGetAllProductsQuery } from '../../../store/Slices/Products';
import CollectionTabFilter from '../CollectionTabFilter/CollectionTabFilter';
import { useNavigate } from "react-router-dom";
import Material from "../../../assets/images/Header/material-50.webp"
import './CustomOrderDetails.scss'
import { text } from "stream/consumers";


const { Meta } = Card;

 const OurCustomOrderDetails=()=>{
  const [styleFilter ,setStyleFilter]=useState("")
  const [materialFilter ,setMaterialFilter]=useState("")
  const [colorFilter ,setColorFilter]=useState("")
  const [sortFilter ,serSortFilter]=useState("")
 //query parameters of search and filter
 const [modalVisible, setModalVisible] = useState(false);

 // Function to handle modal open
 const handleOpenModal = () => {
   setModalVisible(true);
 };
 
 // Function to handle modal close
 const handleCloseModal = () => {
   setModalVisible(false);
 };
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
    <h1 className="image-heading-title">CUSTOM ORDER</h1>
    <p className="image-heading-subheading">Unique, hand-crafted shoes made to your specification</p>
    <p className="image-heading-subheading">We design footwear to last you a lifetime. The finest designs — a pinnacle of elegance.</p>
  </div>
</div>
<Row style={{backgroundColor:"#000000",padding:"30px"}}>
<Col xs={24}>
 <div style={{textAlign:"center"}}>
 <h1 className="image-heading-title-custom" style={{marginBottom:"0px"}}>Dream Shoes</h1>
    <p className="image-heading-subheading" style={{marginTop:"0px"}}>ON DEMAND</p>
 
<p  className="image-heading-subheading" style={{color:"#ffffff"}}> No pair of shoes will express your style better than the one you have created yourself. Let us help you craft your dream shoe.</p>
<Button style={{marginTop:"20px"}} >CRAFT YOUR PAIR</Button>
 </div>
</Col>
<Col xs={24} style={{textAlign:"center" ,padding:"40px 0px"}} >

   
  
    <iframe
        src="https://www.youtube.com/embed/5kOMC8mTGfI"
        allow="autoplay"
        width="100%"
        height="400px"
       
        title="YouTube Video"
      />
  

</Col>

<Col xs={24} style={{textAlign:"center" ,padding:"40px 0px"}} >
   <p className="image-heading-subheading" >Each pair is filled with character and is individually hand crafted; giving you free rein to create any shoe imaginable. </p>
</Col>

<Col xs={24} md={12} style={{background:"#ffffff"}}>
<h3 style={{fontWeight:"600" ,fontSize:"2rem",textAlign:"center", marginBottom:"0px",padding:"60px 0px 0px 0px"}}>Material</h3>
<p style={{fontWeight:"600" ,fontSize:"1rem",textAlign:"center" ,margin:"0px"}}>Selection</p>
<p style={{fontWeight:"400" ,fontSize:"1rem",textAlign:"center" }}>We have scoured the globe in search for the highest quality leather to craft your dream pair of shoes with. We make every effort to find the strongest leather with the finest grains.</p>
</Col>
<Col xs={24} md={12} >
 <img src={Material} style={{width:"80%",height:"100%"}}/>
</Col>
</Row>




        
        
        </>
      
    )

}
export default OurCustomOrderDetails