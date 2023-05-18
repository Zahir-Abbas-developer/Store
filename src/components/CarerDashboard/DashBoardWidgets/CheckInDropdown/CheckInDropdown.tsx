
import dayjs from 'dayjs';
import { useGetCarerDashboardCalanderRequestQuery, usePutAllocateShiftRequestMutation } from '../../../../store/Slices/CarerDashboardCalander';
import './CheckIn.scss'

const CheckInDropdown = () => {
  const { id }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");
  let params: any = {
    staffId: id,
    startTime: dayjs().toISOString().slice(0, 10),
    endTime: dayjs().toISOString().slice(0, 10)
  }

  const query = "&" + new URLSearchParams(params).toString();
  const { data: shiftDetial, isSuccess: shiftIsSucess } = useGetCarerDashboardCalanderRequestQuery({
    refetchOnMountOrArgChange: true, query, checkIn: true
  });

  let carerCalanderData: any;

  if (shiftIsSucess) {
    carerCalanderData = shiftDetial;
  }
  console.log(carerCalanderData);

  let [putAllocateShiftRequest] = usePutAllocateShiftRequestMutation()

  const checkInHandler = (status: string) => {

    if (status === 'checkIn') {
      putAllocateShiftRequest({
        staffShiftId: carerCalanderData?.data?.shifts[0]?._id,
        checkIn: dayjs().toISOString()
      })
    } else if (status === 'checkout') {
      putAllocateShiftRequest({
        staffShiftId: carerCalanderData?.data?.shifts[0]?._id,
        checkOut: dayjs().toISOString()
      })
    } else {
      putAllocateShiftRequest({
        staffShiftId: carerCalanderData?.data?.shifts[0]?._id,
        checkOut: dayjs().toISOString(),
        completed: true
      })
    }

  }

  return (
    <div className="dropdown">
      {carerCalanderData?.data?.shifts?.length !== 0 ? <div>
        <div className="d-flex justify-between align-center">
          <p className="fs-14 fw-600">Client:</p>
          <span className="fs-14 fw-400">{carerCalanderData?.data?.shifts[0]?.careHome?.clientName}</span>
        </div>
        <div className="d-flex justify-between align-center">
          <p className="fs-14 fw-600">Shift Time:</p>
          <span className="fs-14 fw-400">{dayjs(carerCalanderData?.data?.shifts[0]?.shift?.startTime).format('HH:mm A')}</span>
        </div>
        <div className="d-flex justify-between align-center">
          <p className="fs-14 fw-600">Shift Date:</p>
          <span className="fs-14 fw-400">{dayjs(carerCalanderData?.data?.shifts[0]?.shift?.shiftDate).format('DD MMM, YYYY')}</span>
        </div>
        <div className="d-flex justify-between align-center">
          <p className="fs-14 fw-600">Shift Type:</p>
          <span className="fs-14 fw-400">{carerCalanderData?.data?.shifts[0]?.shift?.shiftType}</span>
        </div>
        {carerCalanderData?.data?.shifts[0]?.checkedIn ?
          <div className='d-flex justify-between'>
            <button className='check-in-btn' style={{ backgroundColor: '#FAAD14' }} onClick={() => checkInHandler('checkOut')}>Check-Out</button>
            <button className='check-in-btn' style={{ backgroundColor: '#50CB73' }} onClick={() => checkInHandler('complete')}>Complete</button>
          </div>
          :
          <div className='text-center'>
            <button className='check-in-btn' onClick={() => checkInHandler('checkIn')}>Check-In</button>
          </div>
        }
      </div> : <p className='m-0 text-center'>No Shift Found</p>}
    </div>
  );
};

export default CheckInDropdown;
