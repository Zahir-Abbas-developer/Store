import React from 'react';
import TimePickerIcon from "../../assets/icons/TimePickerWrapper/time-picker-icon.svg";
import { Form, TimePicker, } from 'antd';
import './TimePickerWrapper.scss';

const TimePickerWrapper = (props:  any) => {
  const { label, name, required, onChange, disabled, placeholder, size, format } = props;

  return (
    <>
      <div className='time-picker-wrapper'>
        <Form.Item label={label} name={[name]} rules={[{ message: "Required Field", required: required }]} >
          <TimePicker
            onChange={onChange}
            format={`${format ?? 'HH:mm'}`}
            popupClassName="time-picker-content"
            placeholder={`${placeholder ?? "hh:mm"}`}
            suffixIcon={<img src={TimePickerIcon} alt="datePicker" width={20} height={20} />}
            className="cursor-pointer"
            disabled={disabled}
            size={size}
          />
        </Form.Item>
      </div>
    </>
  )
}

export default TimePickerWrapper