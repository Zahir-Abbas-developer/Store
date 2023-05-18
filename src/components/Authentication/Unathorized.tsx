import { useNavigate } from 'react-router-dom';
import "./Unathorized.scss";

const Unathorized = () => {
    const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="unathorized-main">
        <div className="page-content d-flex align-center justify-center flex-column">
          <h2 className="title-color fs-26 m-0 text-center">
          You are not authorized to view this page.
          </h2>
          <button className='link-button' onClick={handleGoBack}>Go back</button>
        </div>
      </div>
    </>
  );
}

export default Unathorized;

