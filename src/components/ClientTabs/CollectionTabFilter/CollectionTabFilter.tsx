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
  <Row> 
    
    <Col xs={24}>
      <p>STYLE</p>
    {categoryData?.map((categoryData:any)=>{return <>
      <Checkbox   onChange={() => setStyleFilter(categoryData.name)}>{categoryData?.name}</Checkbox>
    </>
})} 
    </Col>
  
</Row>
<Row>
<Col xs={24}>
<p>MATERIAL</p>
 {materialFilterData?.map((materialFilterData:any)=>{return <Checkbox onChange={()=>(setMaterialFilter(materialFilterData?.name))}>{materialFilterData?.name}</Checkbox>
})}  
    </Col>
</Row>
<Row>
<Col xs={24}>
  <p>color</p>
{colorFilterData?.map((colorFilterData:any)=>{return <Checkbox onChange={()=>{setColorFilter(colorFilterData?.name)}}>{colorFilterData?.name}</Checkbox>
})} 
 </Col>
</Row>
  </>
)
}
export default CollectionTabFilter;