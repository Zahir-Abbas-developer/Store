import React from 'react';
import './BoxWrapper.scss';

const BoxWrapper = ({ children, className, title, onClick, ...rest }: any) => {
    return (
        <div className={`box-wrapper ${className}`} onClick={onClick} {...rest}>
            {title && <p className="fs-20 fw-500 line-height-28 title-color">{title}</p>}
            {children}
        </div>
    )
}

export default BoxWrapper