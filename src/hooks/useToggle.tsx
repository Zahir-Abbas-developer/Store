import { useState } from "react";

const useToggle = (initialState = false) => {
  const [visible, setVisibility] = useState(initialState);
  const toggle = () => setVisibility((prev: boolean) => !prev);
  const setToggleStatus = (value: boolean) => setVisibility(Boolean(value));

  return [visible, toggle, setToggleStatus];
};

export default useToggle;
