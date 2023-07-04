import { createContext, useReducer, useContext } from 'react';

const initialState = {
  filter1: '',
  dateFilter:"",
  filter2: '',
  filter3: '',
    dashboard:false,
    screenCasts:false,
    settings:false,
    activityLog:false,
    reports:false,
    selectedOptions: [ "Attendance Summary",
    "Productive Hours",
    "Idle Time",
    "Total Time Tracked",
    "Most Used Services",
    "Employee Most Used Services",
    "Distraction  Alert",
    "Workload Balance Issues",
    "Top Projects",
    "Employees of the Month",
    "Overall Score",
    "Productivity Hours",
    "Idle Minutes",
    "Haven't Started Tracking Time",
    "Manual Added Time",
    "TimeLine",
    "Hours Tracked",
    "Unproductive Services",
    "Unrated Services",
    "Organization Productivity (Last 7 Days)"],
  
};

function filterReducer(state:any, action:any) {
  switch (action.type) {
    case 'updateFilters':
      return { ...state, filter1: action.payload };
      case 'resetFilters':
        return { ...initialState };
      case 'dateFilter':
        return { ...state, dateFilter: action.payload };
    case 'updateFilter2':
      return { ...state, filter2: action.payload };
    case 'updateFilter3':
      return { ...state, filter3: action.payload };
    case 'updateComponentFilter':
      return { ...state, dashboard:action.payload };
      case "updateSelectedOptions": 
      return { ...state, selectedOptions: action.payload };

      case 'updateComponentFilterScreenCast':
        return { ...state, screenCasts:action.payload };
        case 'updateComponentFilterActivity':
          return { ...state, activityLog:action.payload };
          case 'updateComponentFilterReports':
            return { ...state, reports:action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }

}

export const FilterContext = createContext("");

export function FilterProvider(props:any) {
  const [state, dispatch] = useReducer(filterReducer, initialState);
  
  const value = { state, dispatch };
  return <FilterContext.Provider value={value} {...props} />;
}