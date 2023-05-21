import React, { ChangeEvent } from 'react';
import { Checkbox, Col,  Row } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useGetAllCategoriessQuery, useGetAllColorsQuery, useGetAllMaterialsQuery } from '../../../store/Slices/Products';

import alert from 'antd/es/alert';
import CollectionHeader from '../../CollectionHeader/CollectionHeader';




const CollectionTabFilter= ({setColorFilter,setMaterialFilter,setStyleFilter}:any) =>{
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
// const onChange=(setState:any)=>(event:CheckboxChangeEvent)=>{
//   console.log(event?.target?.value)
//   setState(event)
// }
const onChange = (e: any) => {
  console.log(`checked = ${e.target.value}`);
};

return(
  <>
  <Row > 
    
    <Col xs={24} style={{marginTop:"40px"}}>
      <p style={{color:"#ffffff",padding:"0px 20px"}}>STYLE</p>
    {categoryData?.map((categoryData:any)=>{return <>
      <Checkbox   onChange={() => setStyleFilter(categoryData.name)} style={{padding:"0px 20px"}}>< span style={{color:"#ffffff"}} >{categoryData?.name}</span></Checkbox>
    </>
})} 
    </Col>
  
</Row>
<Row>
<Col xs={24} style={{marginTop:"40px"}}>
<p style={{color:"#ffffff",padding:"0px 20px"}}>MATERIAL</p>
 {materialFilterData?.map((materialFilterData:any)=>{return <Checkbox onChange={()=>(setMaterialFilter(materialFilterData?.name))} style={{padding:"0px 20px"}}> <span style={{color:"#ffffff"}}>{materialFilterData?.name}</span>  </Checkbox>
})}  
    </Col>
</Row>
<Row>
<Col xs={24} style={{marginTop:"40px"}}>
  <p style={{color:"#ffffff" ,padding:"0px 20px"}}>color</p>
{colorFilterData?.map((colorFilterData:any)=>{return <Checkbox onChange={()=>{setColorFilter(colorFilterData?.name)}} style={{padding:"0px 20px"}}><span style={{color:"#ffffff"}}>{colorFilterData?.name}</span></Checkbox>
})} 
 </Col>
</Row>
  </>
)
}
export default CollectionTabFilter;