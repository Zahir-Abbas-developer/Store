import { Space, Table } from "antd";

import { resultsTableData } from "../../../../mock/TrainingData/ResultsTableData";
import viewIcon from "../../../../assets/icons/training/view.png";
import DisableviewIcon from "../../../../assets/icons/training/disable-view-icon.png";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const ResultsTable = ({tableData}:any) => {

  const navigate = useNavigate()


  const columns: any = [
    {
      title: "Sr.No",
      dataIndex: "_id",
      key: "_id",
      render: (value: any, record: any, index: any) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: "CourseName",
      dataIndex: "courseName",
      key: "courseName",
      render: (_: any, text: any) => {
        return <span>{text?.courseName}</span>;
      },
    },
    {
      title: "Instructor Name",
      dataIndex: "instructorName",
      key: "instructorName",
      render: (_: any, text: any) => {
        return <span>{text?.authorFirstName}&nbsp;{text?.authorLastName}</span>;
      },
    },
    {
      title: "Assessment Date",
      dataIndex: "assessmentDate",
      key: "assessmentDate",
      render: (_: any, text: any) => {
        return <span>{dayjs(text?.assessmentDate).format("MM/DD/YYYY")}</span>;
      },
    },
    {
      title: "Grade Achieved",
      dataIndex: "gradeAchieved",
      key: "gradeAchieved",
    },
    {
      title: "Certificate Status",
      dataIndex: "certificateStatus",
      key: "certificateStatus",
    },
    {
      title: "Rating",
      dataIndex: "ratingStatus",
      key: "ratingStatus",
    },
    {
      title: "Action",
      key: "_id",
      render:  (text: any) => (
        <span className="fs-12 fw-400 line-height-18 title-color">
          <Space>
            <div className="border-color cursor-pointer">
              {text?.certificateStatus === "Available" ? (
                // <Link to={`certificate/${text?._id}`}>
                  <img src={viewIcon} alt="viewIcon"  onClick={() => navigate(`certificate/${text?._id}` , { state: { courseId: '' } })} />
                // </Link>
              ) : (
                <img src={DisableviewIcon} alt="viewIcon" />
              )}
            </div>
          </Space>
        </span>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        scroll={{ x: "max-content" }}
        pagination={{ pageSize: 7 }} 
        dataSource={tableData}
      />
    </>
  );
};

export default ResultsTable;
