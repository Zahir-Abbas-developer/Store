import React from 'react'
import { Dropdown as AntDropDown } from 'antd';
import '../ShiftBooking.scss';

const DropDown = (props: any) => {
    const { children, items } = props;
    return (
        <AntDropDown menu={{ items }} trigger={['click']}>
            {children}
        </AntDropDown>
    )
}

export default DropDown