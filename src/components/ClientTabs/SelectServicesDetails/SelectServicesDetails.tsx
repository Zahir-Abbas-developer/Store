import { Card, Col, Row } from "antd"
import jacketImage1 from "../../../assets/images/jackets/benjamin-voros-TnNo84AJJ5A-unsplash.jpg"
import jacketImage2 from "../../../assets/images/jackets/caio-coelho-QRN47la37gw-unsplash.jpg"
import jacketImage3 from "../../../assets/images/jackets/lea-ochel-nsRBbE6-YLs-unsplash.jpg"
import jacketImage4 from "../../../assets/images/jackets/tobias-tullius-Fg15LdqpWrs-unsplash.jpg"
import { Link } from "react-router-dom"
const SelectServicesDetails=()=>{
    const productDetails=[
        {
            jacketImages:jacketImage4,
            name:"benjamin-voros",
            price:"100$"
        
        },
        {
            jacketImages:jacketImage3,
            name:"caio-coelho",
            price:"100$"
        
        },
        {
            jacketImages:jacketImage3,
            name:"benjamin-voros",
            price:"100$"
        
        },
        {
            jacketImages:jacketImage4,
            name:"benjamin-voros",
            price:"100$"
        
        }
    ]
    return(
        <div>
         <p style={{textAlign:"center",fontSize:"20px"}}>BEST SELLERS</p>
         <p style={{textAlign:"center",fontSize:"20px"}}>LEATHER GOODS</p>
        <Row>
        {productDetails?.map((details)=>{
            return(<Col md={6}>
            
             <Card style={{border:"none"}}>
                <img src={details?.jacketImages} style={{width:"100%",height:"100%"}} />
                <p style={{textAlign:"center",fontSize:"20px"}}>{details?.name}</p>
                <p style={{textAlign:"center",fontSize:"20px"}}>{details?.price}</p>
             </Card>
            </Col>)
         })}
        </Row>
         <Row>
            <Col sm={24} style={{textAlign:"center"}}>
            <Link to="/dashboard" style={{background:"black",padding:"14px" ,color:"white"}}>VIEW ALL PRODUCTS</Link>
            </Col>
         </Row>
        </div>
    )
}
export default SelectServicesDetails