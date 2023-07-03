import { Form, Select } from 'antd';
import React from 'react'
import DownArrowIcon from "../../assets/icons/ShiftManger/down-arrow-icon.png";
import './SelectWrapper.scss';

interface ISelectWrapper {
    label?: string;
    name: string;
    required?: boolean;
    size?: any;
    placeHolder?: string;
    options?: any;
    disabled?: boolean;
    onChange?: any;
    defaultValue?: any;
    value?:any
}


const SelectWrapper = (props: ISelectWrapper) => {
    const { label, name, required, size, placeHolder, options, onChange, disabled, defaultValue,value  } = props;
    return (
        <>
            <div className='select-wrapper'>
                <Form.Item label={label} name={[name]} rules={[{ message: "Required Field", required: required }]} >
                    <Select
                        size={size}
                        defaultValue={defaultValue}
                        onChange={onChange}
                        suffixIcon={<img src={DownArrowIcon} alt="down-arrow" width="18px" height="10px" />}
                        placeholder={placeHolder}
                        options={options}
                        disabled={disabled}
                        value={value && value}
                    />
                </Form.Item>
            </div>
        </>
    )
}

export default SelectWrapper