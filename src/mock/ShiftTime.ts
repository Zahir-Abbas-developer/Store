
import LongDayShift from "../assets/images/Setting/LongDayShift.png";
import Afternoon from "../assets/images/Setting/Afternoon.png";
import Morningshift from "../assets/images/Setting/Morningshift.png";
import NightShift from "../assets/images/Setting/NightShift.png";

export interface DataType {
    key: string;
    shiftname: string;
    img: any;
    // hoverColor: string;

}
 export const ShiftTimeData: DataType[] = [
    {
        key: '1',
        shiftname: 'Long Day Shift ',
        img: LongDayShift,
    },
    {
        key: '2',
        shiftname: 'Morning Shift ',
        img: Morningshift,
    },
    {
        key: '3',
        shiftname: 'Afternoon',
        img: Afternoon,
    },
    {
        key: '4',
        shiftname: 'Night Shift',
        img: NightShift,
    },
  ]