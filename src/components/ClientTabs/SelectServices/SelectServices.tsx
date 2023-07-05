import React from 'react';
import { Carousel } from 'antd';
import shoesImage from "../../../assets/images/MicrosoftTeams-image (7).png"
import shoesImage1 from "../../../assets/images/MicrosoftTeams-image (8).png"
import shoesImage2 from "../../../assets/images/MicrosoftTeams-image (9).png"
import shoesImage3 from "../../../assets/images/MicrosoftTeams-image (10).png"

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const SelectServices = () => (
  <Carousel autoplay>
    <div>

      <img src={shoesImage} style={{width:"100%",height:"90vh"}} />
    </div>
    <div>
    <img src={shoesImage1}  style={{width:"100%",height:"90vh"}} />
    </div>
    <div>
    <img src={shoesImage2}   style={{width:"100%",height:"90vh"}} />
    </div>
    <div>
    <img src={shoesImage3}   style={{width:"100%",height:"90vh"}} />
    </div>
  </Carousel>
);

export default SelectServices;