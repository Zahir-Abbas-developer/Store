import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useGetRequestByIdQuery } from '../../../../store/Slices/OnBoarding';



interface IReferenceDetails {
  refType: string,
  refFullName: string,
  refContact: string,
  refEmail: string,
  approvalStatus: string,
  createdAt: string,
  refCompletedOn: string
}



const Refrences = ({selectedTableData}:any) => {

  const {data,isLoading,isSuccess}=useGetRequestByIdQuery({id:selectedTableData,detail:"REFERENCES"})
  let profileViewData:any;
  if(isSuccess){
    profileViewData=data
  }

  const columns: ColumnsType<IReferenceDetails> = [
    {
      title: <span className='fw-600 fs-14'>Reference Type </span>,
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (_, text) =>

        <span className='fs-14 fw-400 title-color'>
          {text.refType}
        </span>

    },
    {
      title: <span className='fw-600 fs-14'>Full name of the referee</span>,
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (_, text) =>

        <span className='fs-14 fw-400 title-color'>
          {text.refFullName}
        </span>

    },
    {
      title: <span className='fw-600 fs-14'>Contact No. of the referee</span>,
      dataIndex: 'contactNo',
      key: 'contactNo',
      width: 165,

      render: (_, text) =>
        <span className='fs-14 fw-400 title-color'>
          {text.refContact}
        </span>

    },
    {
      title: <span className='fw-600 fs-14'>Email ID of the referee</span>,
      dataIndex: 'email',
      key: 'email',
      width: 160,

      render: (_, text) =>
        <span className='fs-14 fw-400 title-color'>
          {text.refEmail}
        </span>

    },
    {
      title: <span className='fw-600 fs-14'>Approval Status</span>,
      dataIndex: 'status',
      key: 'status',
      width: 100,

      render: (_, text) =>
        <span className='fs-14 fw-400 title-color'>
          {text.approvalStatus}
        </span>

    },

    {
      title: <span className='fw-600 fs-14' >Ref.viewed on</span>,
      dataIndex: 'status',
      key: 'status',
      width: 100,

      render: (_, text) =>
        <span className='fs-14 fw-400 title-color'>
          {text.createdAt}
        </span>

    },
    {
      title: <span className='fw-600 fs-14'>Ref. completed on</span>,
      dataIndex: 'complete',
      key: 'complete',
      width: 140,

      render: (_, text) =>
        <span className='fs-14 fw-400 title-color'>
          {text.refCompletedOn}
        </span>

    },

  ];
  return (
    <div>
      <p className='fw-500 fs-20'>Refrences</p>
<div className='onboading-table-wrapper'>
  
 <Table  columns={columns} loading={isLoading} dataSource={profileViewData?.data?.userprofile} scroll={{ x: "max-content" }}     pagination={{ pageSize: 10 }} />
</div>
    </div>
  )
}

export default Refrences