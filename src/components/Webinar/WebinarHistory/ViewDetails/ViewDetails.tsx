import React, { useRef, useState } from 'react'
import './ViewDetails.scss'
import userIcon from '../../../../assets/images/Webinar/user-icon.png'
import ViewDetailsFilters from './ViewDetailsFilters/ViewDetailsFilters'
import ViewDetailsTable from './ViewDetailsTable/ViewDetailsTable'
import { ColumnsType } from 'antd/es/table'
import { ViewDetailsTableMockData } from '../../../../mock/Webinar/WebinarHistory/WebinarHistoryData'

import iconDone from '../../../../assets/icons/Webinar/icon-tick-rounded.svg'
import iconFileCross from '../../../../assets/icons/Webinar/icon-file-cross.svg'
import iconRoundedCheck from '../../../../assets/icons/Webinar/check-rounded-icon.svg'
import { Button, Modal, Popover, Progress } from 'antd'
import BirthDayModal from '../../../../shared/BirthDayModal/BirthDayModal'
import UploadImage from '../../../Setting/SettingKeyInfo/UploadImage/UploadImage'
import { useGetWebinarHistoryAttendesQuery } from '../../../../store/Slices/Webinar/WebinarHistory'
import { useLocation } from 'react-router-dom'

import dayjs from 'dayjs';
import { usePostImportAttendeesMutation, usePostSendCertificateMutation } from '../../../../store/Slices/TraineeInfo'
import AppSnackbar from '../../../../utils/AppSnackbar'

import ArrowUpIcon from "../../../../assets/icons/Setting/ArrowUpIcon.svg"
import Copyicon from "../../../../assets/icons/Setting/Copyicon.svg"
import Dottedicon from "../../../../assets/icons/Setting/Dottedicon.svg"
import Bookicon from "../../../../assets/icons/Setting/Bookicon.svg"
import SimpleBookicon from "../../../../assets/icons/Setting/SimpleBookicon.svg"
import CloudIcon from "../../../../assets/icons/Setting/CloudIcon.svg"
import uploadIcon from "../../../../assets/images/Webinar/upload-icon.svg"
import uploadedFile from "../../../../assets/images/Webinar/uploaded-file.svg"
import { handleDownloadData } from '../../../../utils/DownloadData'
import BreadCrumb from '../../../../layout/BreadCrumb/BreadCrumb'


interface AttendeesRecord {
  fullName: string;
  email: string;
  joinTime: string;
  leaveTime: string;
  duration: number;
}

interface Result {
  attendeesRecords: AttendeesRecord[];
}

const ViewDetails = () => {

  const [isDownloadModal, setIsDownloadModal] = useState(false)
  const [isSendCertificate, setIsisSendCertificate] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [progressPrecent, setProgressPrecent] = useState(0)
  const [isprogressPopover, setIsProgressPopover] = useState(false)
  const [progressInfo, setprogressInfo] = useState(false)

  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  const handelSelectedRowChange = (children: any) => {
    setSelectedRowKeys(children)
  }

  console.log("selectedRowKeys++", selectedRowKeys)

  const { pathname } = useLocation()
  const route = pathname.split('/')
  console.log("route loc", route[4])


  const [webinarDuration, setwebinarDuration] = useState('')
  const [webinarCertificateStatus, setwebinarCertificateStatus] = useState('All')
  const [isFileName, setisFileName] = useState()

  const [dataValues, setDataValues] = useState<any[]>([])

  const paramsObj: any = {};
  if (webinarDuration) paramsObj["duration"] = webinarDuration;
  if (webinarCertificateStatus) paramsObj["certificateStatus"] = webinarCertificateStatus;
  const query = "&" + new URLSearchParams(paramsObj).toString();

  const [postImportAttendees] = usePostImportAttendeesMutation()
  const [postSendCertificate] = usePostSendCertificateMutation()

  const { data, isLoading, isError, isSuccess } = useGetWebinarHistoryAttendesQuery({ id: [route[4]], query: query })

  let webinarHistoryAttendesData: any;
  if (isLoading) {
    webinarHistoryAttendesData = <p>Loading...</p>
  }
  else if (isSuccess) {
    webinarHistoryAttendesData = data
  }
  else if (isError) {
    webinarHistoryAttendesData = <p>Error...</p>
  }
  // console.log("webinarHistoryAttendesData", webinarHistoryAttendesData?.data?.attendees?.result)


  // const filteredSelectedData = webinarHistoryAttendesData?.data?.attendees?.result && webinarHistoryAttendesData?.data?.attendees?.result?.filter((data:any) => selectedRowKeys?.includes(data._id));


  const filteredData: AttendeesRecord[] =
    webinarHistoryAttendesData?.data?.attendees?.result &&
    webinarHistoryAttendesData?.data?.attendees?.result?.filter((data: any) => selectedRowKeys.includes(data._id)).map(({ fullName, email, joinTime, leaveTime, duration }: any) => {
      return {
        fullName: fullName,
        email: email,
        joinTime: joinTime,
        leaveTime: leaveTime,
        duration: duration
      };
    });


  const fileInputRef = useRef(null);

  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadstart = () => {
      // Set progress to 0 when upload starts
      // setUploadProgress(0);
    };

    console.log("file", file?.name)

    reader.onprogress = (progressEvent) => {
      if (progressEvent.lengthComputable) {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        // Update progress state
        // setUploadProgress(progress);
      }
    };

    reader.onload = handleFileRead;
    reader.readAsText(file);
    setisFileName(file?.name)
  };

  const handleFileRead = (event: any) => {
    const content = event.target.result;
    // Parse CSV content and log values
    const rows = content.split('\n');
    const headers = rows[0].split(',');
    const values = rows.slice(1).map((row: any) => row.split(','));
    console.log('Headers:', headers);
    console.log('Values:', values);
    // Update data values state
    setDataValues(values);
  };

  // console.log("filteredSelectedData", filteredSelectedData)

  const attendeesRecords = dataValues && dataValues?.map((value: any) => {
    return {
      fullName: value[0],
      email: value[1],
      joinTime: value[2],
      leaveTime: value[3],
      duration: parseInt(value[4])
    };
  });

  console.log("attendeesRecords", attendeesRecords);


  const filteredRecords = attendeesRecords.filter((obj: any) => {
    for (let key in obj) {
      if (!obj[key] || obj[key] === '') {
        return false;
      }
    }
    return true;
  });

  console.log("filteredRecords", filteredRecords);

  const ViewDetailsTableHeader: ColumnsType<any> = [
    {
      title: 'Sr.No#',
      dataIndex: 'sNo',
      key: 'sNo',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (fullName: any) =>
        <span className='fs-14 fw-400 m-0 text-left line-height-22 title-color'>{fullName}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: any) =>
        <span className='fs-14 fw-400 m-0 text-left line-height-22 title-color'>{email}</span>,
    },
    {
      title: 'Join Time',
      dataIndex: 'joinTime',
      key: 'joinTime',
      render: (joinTime: any) =>
        <span className='fs-14 fw-400 m-0 text-left line-height-22 title-color'>{dayjs(joinTime).format('HH:mm')}</span>,
    },
    {
      title: 'Leave Time ',
      dataIndex: 'leaveTime',
      key: 'leaveTime',
      render: (leaveTime: any) => (
        <span className='fs-14 fw-400 m-0 text-left line-height-22 title-color'>{dayjs(leaveTime).format('HH:mm')}</span>
      ),
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration: any) => (
        <span className='fs-14 m-0 line-height-22 title-color'>{duration ? duration + 'm' : "-" }</span>
      ),
    },
    {
      title: <div>Certificate Status</div>,
      dataIndex: "certificateStatus",
      key: "certificateStatus",
      width: 160,
      render: (certificateStatus: any) => (
        (() => {
          switch (certificateStatus) {
            case "Available":
              return (
                <span style={{ width: "100%", display: 'flex', justifyContent: "center" }}><img src={iconDone} alt="" /></span>
              );
            case "Unavailable":
              return (
                <span style={{ width: "100%", display: 'flex', justifyContent: "center" }}><img src={iconFileCross} alt="" /></span>
              );
            default:
              return null;
          }
        })()
      ),
    },
  ];

  const handleClick = async () => {
    let count = 0;
    const intervalId = setInterval(() => {
      count++;
      setProgressPrecent(count);
      setIsProgressPopover(true)
      if (count === 100) {
        clearInterval(intervalId);
        setIsProgressPopover(false)
      }
    }, 10);

    const payload = {
      "webinarId": route[4],
      "attendeesRecords": filteredRecords
    }


    try {
      await postImportAttendees({ payload }).unwrap();
      AppSnackbar({
        type: "success",
        messageHeading: "Uplaad",
        message: "Information Uploaded successfully"
      });
      setIsProgressPopover(false)
    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!"
      });
    }


  };

  const content = (
    <span>
      {progressPrecent}%
    </span>
  );



  const handelSubmitCertificate = async () => {
    const payload = {
      "webinarId": route[4],
      "attendeesIds": selectedRowKeys
    }

    try {
      await postSendCertificate({ payload }).unwrap();
      AppSnackbar({
        type: "success",
        messageHeading: "Uplaad",
        message: "Information Uploaded successfully"
      });
      setIsProgressPopover(false)
      setIsisSendCertificate(true)
    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!"
      });
    }

  }

  const handelSetDownload = () => {

    const url = `webinar-history/download-attendees?webinarId=642f908a70ea0401040d3347`;

    // handleDownloadData(url, "xls", "webinar-history" ).then((data) => console.log("data=>", data)).catch((error) => console.log("erroe=>", error))


    setIsDownloadModal(true)
  }


  //BreadCrumb Items
  const breadCrumbItems = [
    {
      title: "View Detail",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/instructor-dashboard",
    },
    {
      title: "Webinar History",
      path: "/webinar/webinar-history",
    },
  ];
  return (
    <>
    <BreadCrumb breadCrumbItems={breadCrumbItems} />
    <div className='view-details-main-wrapper'>
      <div className="inner-flex-wrapper">
        <div className="d-flex" style={{ gap: '15px' }}>
          <div style={{ width: "50px", height: "50px" }}><img src={userIcon} alt="" /></div>
          <div className="d-flex flex-column">
            <span className='fs-14 fw-600'>{webinarHistoryAttendesData?.data?.title}</span>
            <span className='fs-12 fw-400'>{dayjs(webinarHistoryAttendesData?.data?.startTime).format('h:mm')} - {dayjs(webinarHistoryAttendesData?.data?.endTime).format('h:mm')} (duration {webinarHistoryAttendesData?.data?.duration} )</span>
            <span className='fs-12 fw-400 '>{dayjs(webinarHistoryAttendesData?.data?.date).format('DD/MM/YYYY')}</span>
          </div>
        </div>
        <div className='dark-brown-color fs-14 fw-600'>Total Attendees : <span className='fs-14 fw-400'>{webinarHistoryAttendesData?.data?.totalAttendees}</span></div>
      </div>

      <div className="wrapper-filters-btns">
        <ViewDetailsFilters setwebinarDuration={setwebinarDuration} setwebinarCertificateStatus={setwebinarCertificateStatus} />
        <div className="inset-filters-btns">
          <Button className='filter-btn import-attendees-record-btn' onClick={() => setIsModalOpen(true)}>Import Attendees Record</Button>

          {/* <a href={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/642f908a70ea0401040d3347`}> */}
            <Button className='filter-btn download-tempalte-btn' onClick={handelSetDownload}>Download Tempalte </Button>
          {/* </a> */}
          <Button className='filter-btn send-certificate-btn' onClick={handelSubmitCertificate}>Send Certificate</Button>



        </div>
      </div>

      <div className="table-fnc-head-wrapper">
        <ViewDetailsTable handelSelectedRowChange={handelSelectedRowChange} tableHeader={ViewDetailsTableHeader} tableData={webinarHistoryAttendesData?.data?.attendees?.result} />
      </div>

      <BirthDayModal iconImage={iconRoundedCheck} isModalOpen={isDownloadModal} setIsOpenModal={setIsDownloadModal} birthDayMessage="Attendees Report template is downloaded Successfully" wishButtonText={<span style={{ padding: "0px 34px" }}>OK</span>} backgroundColor="#F7B923" />
      <BirthDayModal iconImage={iconRoundedCheck} isModalOpen={isSendCertificate} setIsOpenModal={setIsisSendCertificate} birthDayMessage="webinar Certificate Successfully send" wishButtonText={<span style={{ padding: "0px 34px" }}>OK</span>} backgroundColor="#F7B923" />

      {/* <UploadImage id={'1'} /> */}

      <Modal footer={false} centered open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)} wrapClassName='upload-wth-progress-wrapper'>
        <div className='inner-upload-wrapper'>
          {/* <UploadImage id={'1'} /> */}
          <label htmlFor="uploadTest">
            <div className='uploadSCVFile cursor-pointer' >
              
              {isFileName ? <>
              <img src={uploadedFile} alt="" />
                <span>{isFileName}</span>
                <span className='fs-14 fw-600 cursor-pointer' style={{ color: '#65CDF0' }}>Change</span>
              </>: 
               <>
               <img src={uploadIcon} alt="" />
               <label htmlFor="uploadTest" className='upper-text fs-14 fw-600 cursor-pointer'>Drag and drop, or <span style={{ color: '#65CDF0' }}>Browse</span> your file</label>
               </>
               }
              <img src={ArrowUpIcon} alt="ArrowUpIcon" className="ArrowUpIcon" />
              <img src={Copyicon} alt="Copyicon" className="Copyicon" />
              <img src={Dottedicon} alt="Dottedicon" className="Dottedicon" />
              <img src={Bookicon} alt="Bookicon" className="Bookicon" />
              <img src={SimpleBookicon} alt="SimpleBookicon" className="SimpleBookicon" />
              <img src={CloudIcon} alt="CloudIcon" className="CloudIcon" />
            </div>
          </label>

          <div>
            <input id='uploadTest' accept=".csv" type="file" hidden ref={fileInputRef} onChange={handleFileChange} />
          </div>
          <Popover
            content={content}
            overlayClassName="upload-progress-popover"
            open={isprogressPopover}
            arrow={true}
          >

            <Progress
              percent={progressPrecent}
              strokeColor='#1FB036'
              strokeWidth={19}
              // width={50}
              showInfo={false}
            />
          </Popover>
          <div style={{ width: "fit-content", margin: "0 auto", marginTop: '20px' }}>
            <Button type='primary'  className={`w-auto ${isFileName ? 'bg-orange-color' : 'bg-light-grey'}`} disabled={!isFileName} onClick={handleClick}>Upload</Button>
          </div>
        </div>
      </Modal>


    </div>
    </>
  )
}

export default ViewDetails


