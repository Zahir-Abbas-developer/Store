import { Calendar, Popover } from 'antd';
// import dayjs from 'dayjs';

import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import arrowRight from "../../../assets/icons/arrow-right.svg"
import arrowLeft from "../../../assets/icons/arrow-left.svg"
// import dayjs, { Locale } from 'dayjs';
import 'dayjs/locale/en';
import dayjs from 'dayjs';


import LoadingSvg from "../../../assets/Login/loader-icon.gif";

import './DashbaordCalender.scss'

import { useGetIntructorDashboardCalendarQuery } from '../../../store/Slices/InstructorDashboard';


// const events = [
//   {
//     date: dayjs('2023-03-21'),
//     title: 'Event 1',
//     description: 'Upcomming Webinar 01',
//   },
//   {
//     date: dayjs('2023-03-23'),
//     title: 'Event 2',
//     description: 'Upcomming Webinar 02',
//   },
//   {
//     date: dayjs('2023-03-16'),
//     title: 'Event 2',
//     description: 'Upcomming Webinar 04',
//   },
// ];

// const renderEventContent = (event: any) => (
//   <div>
//     <h3>{event.title}</h3>
//     <p>{event.description}</p>
//   </div>
// );


const DashbaordCalender = () => {


  const { data: apiData, isLoading, isSuccess, isError } = useGetIntructorDashboardCalendarQuery({ refetchOnMountOrArgChange: true });


  let clendarData: any;
  let calendarTransformData: any;

  if (isLoading) {
    clendarData = <p>Loading...</p>
  }

  else if (isSuccess) {
    clendarData = apiData;

    calendarTransformData = clendarData?.data?.map((item: any, index: number) => {
      return {
        date: dayjs(item?.date),
        title: item?.title,
        // description: `Upcomming Webinar ${index + 1}`,
      }
    });

  }

  else if (isError) {
    clendarData = <p>Error...</p>
  }

  const renderPopoverContent = (date: any) => (
    <div>
      {calendarTransformData?.filter((event: any) => event?.date?.isSame(date, 'day')).map((event: any) => (
        <div key={event?.title}>
          <p className='m-0 fs-14 fw-400'>{event?.title}</p>
        </div>
      ))}
    </div>
  );





  if (!isLoading) {
    return (
      <Calendar
        className="dashboard-calendar-wrapper"
        headerRender={({ value, type, onChange }) => {
          const monthName = value.format('MMMM');
          const year = value.format('YYYY');
          return (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
              }}
            >
              {/* <LeftOutlined onClick={() => onChange(value.subtract(1, 'month'))} /> */}
              <img src={arrowRight} alt="" onClick={() => onChange(value.subtract(1, 'month'))} />
              <div className='fs-16 fw-500'>{`${monthName} ${year}`}</div>
              {/* <RightOutlined onClick={() => onChange(value.add(1, 'month'))} /> */}
              <img src={arrowLeft} alt="" onClick={() => onChange(value.add(1, 'month'))} />
            </div>
          );
        }}
        dateCellRender={(date: any) => {
          if (!isLoading) {
            const eventsOnDate = calendarTransformData !== undefined && calendarTransformData.filter((event: any) =>
              event.date.isSame(date, 'day')
            );
            if (eventsOnDate.length === 0) {
              return null;
            }
            return (
              <Popover
                content={renderPopoverContent(date)}
                overlayClassName="calender-date-popover"
                // open={true}
                arrow={false}
                overlayStyle={{ padding: "0px" }} >
                <div
                  style={{
                    cursor: 'pointer',
                    color: '#fff',
                    // fontWeight:"600",
                    backgroundColor: '#65CDF0',
                    textAlign: 'center',
                    borderRadius: '20px',
                    width: '24px',
                    height: '24px',
                    position: "relative",
                    top: '3px',
                    // left:'28px'
                    // left:"1.4vw"
                    paddingTop: '2px',
                    margin: "0 auto",
                    zIndex: "1",
                    // position:"relative"
                  }}
                >
                  {date.format('D')}
                </div>
              </Popover>
            );
          }
          else {
            <img src={LoadingSvg} height={200} width={200} alt="LoadingSvg" />
          }
        }}

      />
    )
  }
  else {
    return (<div className='text-center'>
      <img src={LoadingSvg} height={200} width={200} alt="LoadingSvg" />
    </div>)
  }

}

export default DashbaordCalender