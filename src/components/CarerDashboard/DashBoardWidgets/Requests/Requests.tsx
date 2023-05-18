import { useState } from "react";
import { Skeleton } from "antd";
import Meta from "antd/es/card/Meta";
import { useGetCarerRequestDashboardQuery } from "../../../../store/Slices/CarerRequestDashboard";
import AddRequestModal from "./AddRequestModal";

const Requests = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isSuccess, isLoading } = useGetCarerRequestDashboardQuery({ refetchOnMountOrArgChange: true, })

  let getCarerRequest: any;
  if (isSuccess) {
    getCarerRequest = data;
  }

  const bgColor: any = {
    REJECTED: '#FF4D4F',
    PENDING: '#FAAD14',
    APPROVED: '#52C41A',
  }
  return (
    <div className="requests-card">
      <div className="header">
        <h2 className="title">Request</h2>
        <h1 className="add-btn" onClick={() => setIsModalOpen(true)}>
          + Add new request
        </h1>
      </div>
      {!isLoading ?
        (<div className="requests">
          {getCarerRequest?.data?.map((item: any, index: number) => (
            <div className="request" key={index}>
              <h2 className="title" style={{ textTransform: 'capitalize' }}>{item?._id}</h2>
              <p className="requests-count text-center fs-16 fw-500" style={{ minWidth: '38px', backgroundColor: bgColor[item?._id] }}>{item?.count < 10 ? `0${item?.count}` : item?.count}</p>
            </div>
          ))}
        </div>
        )
        :
        (<Skeleton loading={isLoading} active>
          <Meta title="Card title" description="This is the description" />
        </Skeleton>)
      }
      {isModalOpen && <AddRequestModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default Requests;
