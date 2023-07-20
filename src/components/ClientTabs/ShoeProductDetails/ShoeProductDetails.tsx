import { Card, Col, Row, Spin } from "antd"
import jacketImage1 from "../../../assets/images/jackets/benjamin-voros-TnNo84AJJ5A-unsplash.jpg"
import jacketImage2 from "../../../assets/images/jackets/caio-coelho-QRN47la37gw-unsplash.jpg"
import jacketImage3 from "../../../assets/images/jackets/lea-ochel-nsRBbE6-YLs-unsplash.jpg"
import jacketImage4 from "../../../assets/images/jackets/tobias-tullius-Fg15LdqpWrs-unsplash.jpg"
import { Link } from "react-router-dom"
import { useJacketsAllProductsQuery } from "../../../store/Slices/Products"
const ShoeProductDetails=()=>{
    const paramsObj: any = {};
 
    const query = "&" + new URLSearchParams(paramsObj).toString();
    const { data: dataProducts, isSuccess: isSuccessProducts } = useJacketsAllProductsQuery({ query })
    let productsData: any
    if (isSuccessProducts) {
        productsData = dataProducts
    }
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
        <>
        {(productsData?.length > 0 || productsData?.length==0) ? <div>
            <p style={{ textAlign: "center", fontSize: "18px" ,marginBottom:"0px"}}>BEST SELLERS</p>
                <p style={{ textAlign: "center", fontSize: "20px" ,marginTop:"0px"}}>JACKETS</p>
         <Row gutter={[16,16]} style={{padding:"40px"}}>


<Col xs={24} md={24} lg={24} >
    {productsData?.length > 0 ?
        <Row gutter={[16, 16]}>
            {isSuccessProducts ?
                productsData?.slice(0,4)?.map((productData: any) => (
                 <>
                    <Col xs={24} md={12} lg={6} key={productData.id}>
                        <Card
                            hoverable
                       
                            style={{ background: "linear-gradient(135deg, rgba(68,68,68,1) 6%, rgba(0,0,0,1) 95%)", border: "0px solid transparent" }}
                            cover={<img alt="example" src={productData?.thumbnail} />}
                        >
                            <div style={{ textAlign: "center", padding: "0" }}>

                                <p style={{ fontWeight: "bold", color: "white", padding: "0px", margin: "2px" }}> {productData?.name}</p>
                                <p style={{ color: "white", padding: "0px", margin: "2px" }}>{productData?.description}</p>
                                <p style={{ fontWeight: "bold", color: "#65cdf0", padding: "0px", margin: "2px" }}>$ {productData?.price}</p>
                            </div>
                        </Card>
                    </Col>
                   </>

                )) : <Spin />}
                 <Col xs={24} sm={24} style={{textAlign:"center" ,marginTop:"10px"}}>
                    <Link to="/jacket-details" style={{background:"black",padding:"14px" ,color:"white"}}>VIEW ALL PRODUCTS</Link>
                    </Col>
        </Row> :  <p style={{  fontSize: "large", textAlign: "center" }}>No Products Added</p>}
</Col>

</Row>
       
            
        
        </div>: <p style={{  fontSize: "large", textAlign: "center" }}>No Products Added</p>
        }
        </>
       
    )
}
export default ShoeProductDetails