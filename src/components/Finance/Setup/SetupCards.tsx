import { Col, Row } from "antd";

import "./SetupCards.scss";
import { SetupCardsData } from "./SetupData";

interface Props {
  setSetupContent: React.Dispatch<React.SetStateAction<string>>;
}
const SetupCards = (props: Props) => {
  return (
    <Row className="setup-cards" gutter={[15,15]} style={{paddingInline:'1rem'}}>
      {SetupCardsData.map((item: {name: string; img: string;}) => (
        <Col key={item.name} xxl={4} lg={5} sm={8} xs={24} onClick={() => props.setSetupContent(item.name)}>
          <div className="clients-cards">
            <img src={item.img} alt="cards-img" className="setup-cards-img" />
            <p style={{ fontSize: "14px" }}>{item.name}</p>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default SetupCards;
