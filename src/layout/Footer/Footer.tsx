import { v4 as uuidv4 } from "uuid";

import "./Footer.scss"
const Footer = () => {
  const footerPages = [
    "Cookie Policy",
    "Privacy Policy",
    "Terms & Conditions",
    "Data Security",
  ];
  return (
    <div className="footer">
      <div className="footer-hold">
        <p className='fs-14 line-height-22'>
          Copyrights © 2020 All rights reserved <span>CARE LIBRARY</span>
        </p>
        <ul style={{display:'flex',gap:'30px',listStyleType:'none'}}>
          {footerPages.map((item) => (
            <li className='fs-14 line-height-22' key={uuidv4()}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
