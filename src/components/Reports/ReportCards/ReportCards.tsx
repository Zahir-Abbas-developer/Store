import React from 'react'
import { Link } from 'react-router-dom';

// Ant Components
import { Space } from 'antd'

// Assets
import defaultImg from "../../../assets/icons/Report/white-staff-work.png";

// Colors Mock Data
import { APPColors } from '../ReportColors';

// SCSS
import './ReportCards.scss';


const ReportCards = (props: any) => {
    const { item } = props;

    const randomColor = APPColors[Math.floor(Math.random() * APPColors.length)];


    return (
        <Link to={item?.navigateTo}>
            <Space size={27} className='report-single-card-wrapper cursor-pointer border-radius-2' style={{ height: "100%", background: randomColor?.lightBg }}>
                <div className='transition-dev' style={{ background: randomColor?.darkBg }}>
                    <img src={defaultImg} alt={defaultImg} />
                </div>
                <div>
                    <h3 className='fs-16 fw-600 line-height-24 m-0' style={{ color: "#333333" }}>{item?.title}</h3>
                    <p className='fs-14 fw-400 title-color line-height-22 m-0'>{item?.desc}</p>
                </div>
            </Space>
        </Link>
    )
}

export default ReportCards