import {Select} from 'antd';
import arrowDownSmall from '../../../../assets/icons/arrow-small-down.svg';
import "./TimeAndAttendanceFilters.scss"

function TimeAndAttendanceFilters() {
    return (
        <div className="wrapper-fliters">
        <div className="flex-filters">
            <div className='inner-flex-filters'>
                <div className="col-box">
                    <div className="area-fliters">
                        <div className='filters-label fw-600 fs-14'>Time Interval</div>
                        <Select
                            suffixIcon={<img src={arrowDownSmall} alt="down-arrow" />}
                            bordered={false}
                            className="staff-filters-select"
                            style={{ width: "100%" }}
                            defaultValue="Select Option"
                            onChange={(value) => { console.log(`selected ${value}`) }}
                            options={[
                                { value: "jack", label: "Jack" },
                                { value: "lucy", label: "Lucy" },
                                { value: "Yiminghe", label: "yiminghe" },
                            ]}
                        />
                    </div>
                </div>
                <div className="col-box">
                    <div className="area-fliters">
                        <div className='filters-label fw-600 fs-14'>Slot Interval</div>
                        <Select
                            suffixIcon={<img src={arrowDownSmall} alt="down-arrow" />}
                            bordered={false}
                            className="staff-filters-select"
                            style={{ width: "100%" }}
                            defaultValue="1 Hour"
                            onChange={(value) => { console.log(`selected ${value}`) }}
                            options={[
                                { value: "Hour", label: "1 Hour" },
                                { value: "Min", label: "30 mins" },
                            ]}
                        />
                    </div>
                </div>
            </div>

        </div>
    </div>
    )
}

export default TimeAndAttendanceFilters
