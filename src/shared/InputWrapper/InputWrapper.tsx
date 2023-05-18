import { Form, Input } from 'antd';
import React from 'react';
import './InputWrapper.scss';

interface IInputProps {
  label?: string;
  name: string;
  required?: boolean;
  size?: any;
  placeHolder?: string;
  disabled?: boolean;
  onChange?: any;
  defaultValue?: any;
  type?: string;
}

const InputWrapper = (props: IInputProps) => {
  const { label, name, required, size, placeHolder, onChange, disabled, defaultValue, type } = props;
  return (
    <>
      <div className='input-wrapper'>
        <Form.Item label={label} name={[name]} rules={[{ message: "Required Field", required: required }]} style={{marginBottom:"0px"}}>
          <Input
            size={size}
            type={type}
            defaultValue={defaultValue}
            onChange={onChange}
            placeholder={placeHolder}
            disabled={disabled}
          />
        </Form.Item>
      </div>
    </>
  )
}

export default InputWrapper