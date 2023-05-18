import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import { Collapse, Row, Col, Progress } from "antd";
import { useGetStaffRateQuery } from "../../../../store/Slices/FinanceSetup";
import ClientRateSetupTable from "./ClientRateSetupTable";
import AccordianYellowImg from '../../../../assets/icons/finance-setup/accordianArrowYellow.png'
import AccordianBlueImg from '../../../../assets/icons/finance-setup/accordianArrowBlue.png'
import AccordianLBlueImg from '../../../../assets/icons/finance-setup/accordianArrowLBlue.png'
import AccordianPinkImg from '../../../../assets/icons/finance-setup/accordianArrowPink.png'
import "./ClientRateSetup.scss";

const ClientsRateSetupAccordians = ({ searchValue }: any) => {
  const { Panel }: any = Collapse;

  const paramsObj: any = {
    rateType: 'client_rate'
  };

  if (searchValue) {
    paramsObj['clientName'] = searchValue
  }
  const query = "&" + new URLSearchParams(paramsObj).toString();

  const { data, isSuccess } = useGetStaffRateQuery({ refetchOnMountOrArgChange: true, query })

  let clientRateData: any;
  if (isSuccess) {
    clientRateData = data
  }
  const arrowDownImges: any = [
    AccordianLBlueImg,
    AccordianYellowImg,
    AccordianPinkImg,
    AccordianBlueImg,
  ]

  return (
    <Fragment>
      {clientRateData?.data?.result ? <Fragment>
        {clientRateData?.data?.result?.map((item: any, index: number) => {
          return <Collapse
            className="client-collapse-panel"
            key={uuidv4()}
            accordion
            ghost={true}
            expandIconPosition="end"
            style={{ marginBlock: "1.5rem" }}
            expandIcon={({ isActive }) => {
              return (
                !isActive && (
                  <Progress
                    type="circle"
                    style={{ marginTop: ".5rem" }}
                    className="fs-12 fw-600 m-auto text-center"
                    size={39}
                    format={(percent: any) => <span style={{ fontSize: "14px" }}>{`${percent}%`}</span>}
                    strokeWidth={5}
                    trailColor="#D9DBE9"
                    percent={25}
                    strokeColor={"#52C41A"}
                  />
                )
              );
            }}
          >
            <Panel
              style={{
                boxShadow: "2px 6px 13px rgba(211, 211, 211, 0.43)",
                alignItem: "center",
              }}
              header={
                <Row justify="center" align="middle" gutter={12} className="accordion-header">
                  <img src={arrowDownImges[Math.floor(Math.random() * 4)]} alt="" className="accordianImg" />
                  <Col xs={19} sm={21} lg={23}>
                    <p className="fs-16 fw-500 accordian-header-title">{item?.careHome?.clientName ?? 'Clien_Name'}</p>
                  </Col>
                </Row>
              }
            >
              <div className="accordion-body">
                <ClientRateSetupTable tableData={item?.rates} />
              </div>
            </Panel>
          </Collapse>
        })}
      </Fragment>
        :
        <div className="d-flex align-center justify-center">
          <p className=" m-0 disabled">No Client Rates Setup Found</p>
        </div>
      }
    </Fragment>
  );
};

export default ClientsRateSetupAccordians;
