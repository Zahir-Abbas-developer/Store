import { Button, Tooltip } from 'antd'
import React, { useState } from 'react'
import "./FormLowerButtons.scss"

const FormLowerButtons = (props:any) => {
  const [isAudit,setIsAudit]= useState(true)

  const handleClick = () => {
    setIsAudit(true);
    props.getAudit(isAudit);
  };
  return (
    <div className="form-lower-buttons">
    <Tooltip
        placement="bottomLeft"
        autoAdjustOverflow={true}
        showArrow={false}
        color="#65CDF0"
        overlayInnerStyle={{
            backgroundColor: "#65CDF0",
            color: "#ffffff",
            width: "fit-content",
        }}
        title='Click to mark as audit'
    >
        <Button className='inner-button inner-form-buttons-audit' onClick={handleClick}>Audit</Button>
    </Tooltip>

    <Button className='inner-button inner-form-buttons-save' htmlType='submit'>Save</Button>
    <Button className='inner-button inner-form-buttons-continue' htmlType='submit'>Continue</Button>
</div>
  )
}

export default FormLowerButtons