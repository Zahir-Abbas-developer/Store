
// ---------------- Not allowing empty spaces in start of the input ----------------
export const handleInputTrimStart = (value: any) => {
  return value.trimStart();
};


// ---------------- Not allowing long empty spaces in the input ----------------
export const handleInputTrimSpaces = (value: any) => {
  if (typeof value === 'string') {
    // ----- For single input fields -----
    return value.trim().replace(/\s+/g, ' ');
  } else if (typeof value === 'object') {

    // ----- For whole form objects -----
    const trimmedValues:any = {};

    // ----- Loop through the objects values -----
    for (const [key, val] of Object.entries(value)) {

      // ----- Trim the value if it's a string. If the value is not a string, leave it as it is -----
      if (typeof val === 'string') {
        trimmedValues[key] = val.trim().replace(/\s+/g, ' ');
      } else {
        trimmedValues[key] = val;
      }
    }

    return trimmedValues;
  } else {
    return value;
  }
};
