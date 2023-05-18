// Main Report Page Cards Interface

import React from "react";

export interface adminReportsDataInterface {
    id: string;
    icon: string;
    title: string;
    desc: string;
    allowdedRoles: string[];
    navigateTo: string;
}

// Report Common Filter Interface
export interface commonReportFiltersOptionsInterface {
    label: string;
    value: string;
    labelNameValue?:string;
}
export interface commonReportFiltersInterface {
    key: string;
    labelName: string;
    placeholder: string;
    optionsArray?: commonReportFiltersOptionsInterface[];
}


// Report Common Filter Options Interface 
export interface reportCommonFilterOptionsInterface {
    label: string;
    value: string
}

// Activity Reports Interface
export interface activityReportInterface {
    key: React.Key;
    createdAt: string;
    activityName: string;
    activityType: string;
    activityByName: string
}

// ################ Advance Staff Search Interface #################
export interface advanceStaffReportOptionsDataInterface {
    key: React.Key,
    label: string;
    value: string;
    disabled?: boolean;
}

export interface advanceStaffCardDataInterface {
    key: React.Key;
    profileImg: any;
    rating: string;
    title: string;
    tag: string;
    location: string;
    gmail: string;
    phoneNumber: string;
}

// ################ Carer Request Report Interface #################
export interface carerRequestReportMockDataInterface {
    key: React.Key,
    careHome: string,
    requestedBy: string,
    profileImage: string,
    requestType: string,
    createdAt: string,
    reason: string,
    status: string,
}


// ################ Client Work History Report Interface #################
export interface clientWorkHistoryMockDataInterface {
  currentPage: React.Key,
    shiftName: string,
    staffName: string,
    jobDate: string,
    workedHours: string,
    hourlyRate: string,
    shiftAmount: string,
    shiftStatus: string
}
// ################ Incident Reports Interface #################

export interface incidentReportMockDataInterface {
  key: React.Key,
  natureOfIncident: string,
  dateOfIncident: string,
  userRole: string,
  reportedBy: string,
  Attachment: string,
  btnName?:string,
  btnBackground:string,
  status:string,
  
}
// ################ whistle blowing Report Interface #################

// ################ Client Reports Interface #################

export interface ClientReportMockDataInterface {
  key: React.Key,
  staffName: string,
  shiftType: string,
  shiftDate: string,
  shiftStartTime: string,
  bookedBy: string,
  staffType:string,
  rating:string,
 
  
}
// ################ Carer Reports Interface #################

export interface CarerReportMockDataInterface {
  key: React.Key,
  staffName: string,
  shiftType: string,
  shiftDate: string,
  shiftTime: string,
  bookedBy: string,
  staffType:string,
  rating:string,
}
export interface whistleblowingReportMockDataInterface {
  key: React.Key,
  ComplaintID: string,
  dateOfOccurance: string,
  complaintType: string,
  Attachment: string,
  btnName?:string,
  btnBackground:string,
  status:string,
}
// ################ whistle blowing Meeting Details Report Interface #################

export interface whistleblowingMeetingDetailsReportMockDataInterface {
  key: React.Key,
  agenda: string,
  MeetingMinutes: string,
  MeetingDate: string,
  MeetingOutcome:string,
}
// ################ Daily Shift Report Report Interface #################
export interface detailsShiftReportMockDataInterface {
    key: React.Key,
    shiftType: string,
    shiftDate:any,
    staffName:any

}

export interface dailyShiftReportMockDataInterface {
    key: React.Key,
    clientName: string,
    booked: string,
    accepted: string,
    pending: string,
}


// ################ Extra Hour Report Report Interface #################
export interface extraHoursReportTableMockDataInterface {
    key: React.Key,
    shiftType: string,
    clientName: string,
    shiftName: string,
    checkIn: string,
    checkOut: string,
    extraHours: string,
    approvalStatus: string,
}


// ################ Gross Profit Loss Report Report Interface #################
export interface grossProfitLossReportMockDataInterface {
    key: React.Key,
    clientName: string,
    totalWorkingHours: string,
    clientAmount: string,
    staffAmount: string,
    diff: string
}


// ################ Payment Data Report Report Interface #################
export interface paymentDataReportMockDataInterface {
    key: React.Key,
    shiftDate: string,
    shiftDay: string,
    staffName: string,
    clientName: string,
    shiftType: string,
    designation: string,
    status: string,
    totalWorkingHours: string,
    shiftRate: string,
    totalAmount: string,
    clientRate: string,
    totalReceivable: string,
}


// ################ Shift Booked Report Report Interface #################
export interface shiftBookedReportMockDataInterface {
    key: React.Key,
    clientName: string,
    staffType: string,
    shiftName: string,
    shiftDate: string,
    addedBy: string,
    createdAt: string,
    requestedBy: string
}
// ################ Shift Booking Report Report Interface #################
export interface shiftBookingReportMockDataInterface {
    key: React.Key,
    clientName: string,
    staffType: string,
    shiftName: string,
    shiftDate: string,
    bookedBy: string,
    bookedAt: string,
    requestedBy: string
}


// ################ Shift Cancel Report Report Interface #################
export interface shiftCancelReportMockDataInterface {
    key: React.Key,
    clientName: string,
    staffName: string,
    shiftType: string,
    shiftDate: string,
    cancelledBy: string,
    cancelledDate: string,
    cancelledReason: string,
}


// ################ Shift Cancel Report Report Interface #################
export interface shiftRateSettingMockDataInterface {
    key: React.Key,
    shiftName: string,
    startTime: string,
    endTime: string,
    shiftDate: string,
    clientShiftBreakPayStatus: string,
    clientShiftBreakTime: string,
    staffShiftBreakTimePayStatus: string,
    staffShiftBreakTime: string,
    breakPayment:string,
    paymentType: string,
    splitRateApplicable: string,
    taxVatApplicable: string,
    department: string,
    transportApplicable: string,
    transportType: string,
    transportClientRate: string,
    transportStaffRate: string,
    shiftBreakStaffInfo: string,
}


// ################ Staff Attendance Report Report Interface #################
export interface staffAttendanceReportMockDataInterface {
    key: React.Key,
    staffName: string,
    staffImg: string,
    clientName: string,
    shiftDate: string,
    shiftName: string,
    totalHours: string,
    takenBreak: string,
}

export interface attendanceReportDetailsMockDataInterface {
    key: React.Key,
    date: string,
    day: string,
    time: string,
    checkInOut: string,
    actualHours: string,
    salaryHours: string,
}


// ################ Staff Availability Sheet Interface #################
export interface staffAvailabilitySheetMockDataInterface {
    key: React.Key,
    displayImg: string,
    stafName: string,
    monday: string,
    tuesday: string,
    wednesday: string,
    thursday: string,
    friday: string,
    saturday: string,
    sunday: string,
}


export interface weekAvailabilityTableMockDataInterface {
    key: React.Key,
    staffImg: string,
    staffName: string,
    designation: string,
    mobileNumber: string,
    monday: string,
    tuesday: string,
    wednesday: string,
    thursday: string,
    friday: string,
    saturday: string,
    sunday: string,
}

export interface dailyAvaialabilityTableMockDataInterface {
    key: React.Key,
    staffImg: string,
    staffName: string,
    designation: string,
    mobileNumber: string,
    todayDate: string,
}

// ################ Staff Compliance Report Interface #################
export interface staffComplianceReportMockDataInterface {
    key: React.Key,
    courseTitle: string,
    firstName: string,
    createdAt: string,
    expiryDate: string
}


// ################ Staff Data Report Interface #################
export interface staffDataReportMockDataInterface {
    key: React.Key,
    staffName: string,
    staffType: string,
    gender: string,
    doj: string,
    dob: string,
    email: string,
    phone: string,
    staffBand: string,
    empStatus: string,
    profilePercentage: string,
    status: string,
    visaType: string,
}


// ################ Staff Data Report Interface #################
export interface staffShiftHoursReportMockDataInterface {
    key: React.Key,
    name: string,
    email: string,
    phone: string,
    noOfShift: string,
    workedHours: string
}


// ################ Staff Work Report Interface #################
export interface staffWorkHistoryReportMockDataInterface {
    key: React.Key,
    shiftName: string,
    clientName: string,
    createdAt: string,
    shiftRate: string,
    perHour: string,
    totalAmount: string,
    invoiceNumber: string,
    shiftStatus: string,
    paymentDate: string,
}

// ################ Vaccination Report Mock Data Interface ##################
export interface vaccinationReportTableMockDataInterface {
    key: React.Key,
    staffName: string,
    email: string,
    phone: string,
    userType: string,
    status: string,
    vaccinationName: string,
    vaccinationDate: string,
    ViewCertification:any,
}



// ################ Vaccination Report Mock Data Interface ##################
export interface terminatedStaffMockDataInterface {
    key: React.Key,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    userRole: string,
    doj: string,
    reasonForLeaving: string,
    createdAt: string,
    terminatedBy: string,
}