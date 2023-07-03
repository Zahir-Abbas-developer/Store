import "../../../../../sass/common.scss";
import { useState, useEffect } from "react";
import "./Counter.scss";

function Counter(props: any) {
  const { countValue, requiredPercentage, noLimit, handleUpdateCount } = props;
  const [count, setCount] = useState(countValue);


  const handleIncrement = (event: any) => {
    event.preventDefault();
    const newCount = count + 1;
    handleInputChange(newCount, "increment");
  };


  const handleDecrement = (event: any) => {
    event?.preventDefault();
    const newCount = count - 1;
    handleInputChange(newCount, "decrement");
  };



  const handleInputChange = (eventValue: any, type?: any) => {
    const value = eventValue;
    // const value = val;


    if (!isNaN(value) && value >= 0 && value <= 100) {
      setCount(value);
    }

    if (!isNaN(value) && value >= 0 && noLimit) {
      setCount(value);
      if (handleUpdateCount) {
        handleUpdateCount(value)
      }
    }

    if (type === "increment") {
      setCount(value);
      if (handleUpdateCount) {
        handleUpdateCount(value)
      }
    }

  };

  useEffect(() => {
    setCount(countValue || 0)
  }, [countValue])



  return (
    <div className="counter">
      <div className="inc-btn">
        <div onClick={handleIncrement} className="btn-puls d-flex align-items-center justify-center">+</div>
        <div onClick={handleDecrement} className="btn-mins d-flex align-items-center justify-center">-</div>
      </div>
      <input type="number" disabled={!!requiredPercentage} className="fs-14 d-flex align-items-center justify-center" value={count ?? 0} onChange={(event: any) => handleInputChange(parseInt(event.target.value))} />


    </div>

  );
}

export default Counter;
