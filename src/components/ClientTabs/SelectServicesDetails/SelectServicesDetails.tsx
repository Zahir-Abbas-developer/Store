import { Card, Col, Row, Spin } from "antd"
import jacketImage1 from "../../../assets/images/jackets/benjamin-voros-TnNo84AJJ5A-unsplash.jpg"
import jacketImage2 from "../../../assets/images/jackets/caio-coelho-QRN47la37gw-unsplash.jpg"
import jacketImage3 from "../../../assets/images/jackets/lea-ochel-nsRBbE6-YLs-unsplash.jpg"
import jacketImage4 from "../../../assets/images/jackets/tobias-tullius-Fg15LdqpWrs-unsplash.jpg"
import { Link } from "react-router-dom"
import { useGetAllProductsQuery } from "../../../store/Slices/Products"
import { useState } from "react"
const SelectServicesDetails = () => {
    const paramsObj: any = {};
    const query = "&" + new URLSearchParams(paramsObj).toString();
    const { data: dataProducts, isSuccess: isSuccessProducts } = useGetAllProductsQuery({ query })
    const [hoverImage ,setHoverImage]=useState(false)
    const [viewAllProductsBackground ,setViewAllProductsBackground]=useState("black")
    const [viewAllProductsText ,setViewAllProductsText]=useState("white")
    let productsData: any
    if (isSuccessProducts) {
        productsData = dataProducts
    }
    const productDetails = [
        {
            jacketImages: jacketImage4,
            name: "benjamin-voros",
            price: "100$"

        },
        {
            jacketImages: jacketImage3,
            name: "caio-coelho",
            price: "100$"

        },
        {
            jacketImages: jacketImage3,
            name: "benjamin-voros",
            price: "100$"

        },
        {
            jacketImages: jacketImage4,
            name: "benjamin-voros",
            price: "100$"

        }
    ]
    return (
        <>
            {(productsData?.length > 0 || productsData?.length==0)  ? <div style={{marginTop:"18px"}}>
                <p style={{ textAlign: "center", fontSize: "18px" ,marginBottom:"0px",fontFamily:" Oswald,sans-serif"}}>BEST SELLERS</p>
                <p style={{ textAlign: "center", fontSize: "20px" ,marginTop:"5px",fontFamily:" Oswald,sans-serif"}}>LEATHER SHOES</p>
                {productsData?.length > 0 ? <Row gutter={[16,16]} style={{padding:"40px"}} >
                    {productsData?.slice(0, 4)?.map((productData: any) => (
                        <Col xs={24} md={12} lg={6} key={productData.id}>
                            <Card
                                
                                style={{ background: "linear-gradient(135deg, rgba(68,68,68,1) 6%, rgba(0,0,0,1) 95%)", border: "0px solid transparent" }}
                                cover={<img alt="example" src={!hoverImage?productData?.thumbnail:productData?.images[0]} onMouseLeave={()=>setHoverImage(false)} onMouseOver={()=>{setHoverImage(true)}} />}
                            >
                                <div style={{ textAlign: "center", padding: "0" }}>

                                    <p style={{ fontWeight: "bold", color: "white", padding: "0px", margin: "2px",fontFamily:" Oswald,sans-serif" }}> {productData?.name}</p>
                                    <p style={{ color: "white", padding: "0px", margin: "2px" }}>{productData?.description}</p>
                                    <p style={{ fontWeight: "bold", color: "#65cdf0", padding: "0px", margin: "2px" }}>$ {productData?.price}</p>
                                </div>
                            </Card>
                        </Col>
                        
                    ))}
                    <Col xs={24} sm={24} style={{ textAlign: "center", marginTop: "10px" }} >
                        <Link to="/dashboard" style={{ background: viewAllProductsBackground, padding: "14px", color: viewAllProductsText ,border:"1px solid black" }} onMouseLeave={()=>{setViewAllProductsBackground("black");setViewAllProductsText("white")}} onMouseOver={()=>{setViewAllProductsBackground("white");setViewAllProductsText("black")}} >VIEW ALL PRODUCTS</Link>
                    </Col>
                </Row> : <p style={{  fontSize: "large", textAlign: "center" }}>No Products Added</p>}



            </div> : <p style={{  fontSize: "large", textAlign: "center" }}>No Products Added</p>}
        </>

    )
}
export default SelectServicesDetails