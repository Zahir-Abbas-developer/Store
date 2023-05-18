import debounce from "lodash.debounce";
export function isNullOrEmpty(value: any): boolean {
  if (value === undefined || value === null) {
    return true;
  }
  if (typeof value === 'string' && value.trim() === '') {
    return true;
  }
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }
  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true;
  }
  return false;
}


const DEBOUNCE_DELAY = 1000;

export const debouncedSearch = debounce((value, setSearchName) => {
  setSearchName(value);
}, DEBOUNCE_DELAY);
