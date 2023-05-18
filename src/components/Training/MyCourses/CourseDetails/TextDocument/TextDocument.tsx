import { Col, Row } from "antd";

import textIcon from "../../../../../assets/icons/training/text-bullet.png";

const TextDocument = ({selectedContentContex}:any) => {
  return (
    <div className="text-document">
      {/* <h1 className="title fs-20 fw-500">Learning Objectives</h1>
      <Row gutter={[28, 20]}>
        <Col xl={12} xs={24}>
          <div className="d-flex objectives">
            <img src={textIcon} alt="" />
            <p>
              Review the literature on the correct way to use an AED (Automatic External
              Defibrillator)
            </p>
          </div>
          <div className="d-flex objectives">
            <img src={textIcon} alt="" />
            <p>
              Have an understanding of how to manage a choking patient.Recognise the correct way to
              put a patient in recovery position.
            </p>
          </div>
          <div className="d-flex objectives">
            <img src={textIcon} alt="" />
            <p>Understand the correct sequence in Basic Life Support.</p>
          </div>
        </Col>
        <Col xl={12} xs={24}>
          <div className="d-flex objectives">
            <img src={textIcon} alt="" />
            <p>
              Consists of a number of medical procedures provided to patients with life threatening
              conditions of the body, that cause pain or dysfunction to the person.
            </p>
          </div>
          <div className="d-flex objectives">
            <img src={textIcon} alt="" />
            <p>
              To provide oxygen to the heart and the brain and to sustain tissue viability until
              definitive electrical or medical treatment
            </p>
          </div>
        </Col>
      </Row>

      <div className="requirements">
        <h2 className="title">Requirements</h2>
        <div className="d-flex objectives">
          <img src={textIcon} alt="" />
          <p>
            The BLS Course is designed for healthcare professionals and other personnel who need to
            know how to perform CPR.
          </p>
        </div>
        <div className="d-flex objectives">
          <img src={textIcon} alt="" />
          <p>
            To gain an understanding of multi-professional principles of working together, in order
            to enhance the skills and confidence of carers
          </p>
        </div>
      </div> */}

      <div className="description">
        <h1 className="title">Description</h1>
        {/* {[1, 2, 3, 4, 5].map((item: number) => ( */}
          <p  style={{ color: "#4E4B66" }} className="fs-16 fw-400">
            {selectedContentContex?.lectureDescription}
          </p>
        {/* ))} */}
      </div>
    </div>
  );
};

export default TextDocument;
