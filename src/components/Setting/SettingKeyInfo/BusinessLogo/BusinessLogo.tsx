import { Button, Col, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import "./BusinessLogo.scss";
import "../../../../sass/common.scss";
import UploadImage from "../UploadImage/UploadImage";

const BusinessLogo = () => {

    return (
        <div className="setting-Business-detials">
            <div className="heading">
                <h1 className="fs-20 fw-500">Business Details
                    <Tooltip placement="bottomLeft" color="#65CDF0" title="The software is already set up with your logo and favicon, you need to upload new ones only if you want to change them. Please use the correct size (Logo 330px (max width). Favicon 512x512px)">
                        <InfoCircleOutlined />
                    </Tooltip>

                </h1>
            </div>

            <div className="upload-image">
                <h6 className="fs-14 fw-600 m-0">Upload Logo</h6>
                <UploadImage id="UploadLogo"/>

            </div>

            <div className="upload-image">
                <h6 className="fs-14 fw-600 m-0">Website Icon</h6>

                <UploadImage id="WebsiteIcon" />
            </div>


            <Col md={24} style={{ display: "flex" }}>
                <Button type="primary"  htmlType="submit">
                    Save
                </Button>
            </Col>




        </div>

    )
}

export default BusinessLogo