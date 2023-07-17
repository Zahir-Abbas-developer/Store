// Components
import BreadCrumb from '../../../layout/BreadCrumb/BreadCrumb'

// Utils
import { renderDashboard } from '../../../utils/useRenderDashboard';


const ClientTermsCondition = () => {
  const { role }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");

  return (
    <>
      <BreadCrumb breadCrumbItems={[
        {
          title: "Client Terms Condition",
          path: "",
        },
        {
          title: "Dashboard",
          path: renderDashboard(role),
        },
        {
          title: "Settings",
          path: "/settings",
        }
      ]} />
      <div className="page-wrapper">
        <div className="page-found-wrapper d-flex align-center justify-center flex-column construction">
          <div className="page-found-heading text-center">
            <h2 className="title-color m-0 under">
              <span className="primary-color">
                Under <span className="secondary-color">Construction</span>
              </span>
            </h2>
          </div>
          <h2 className="title-color fs-32 m-0 text-center coming">
            Coming <span className="title-color">Soon</span>
          </h2>
          <p className="title-color fs-16 m-0 text-center d-block">
            We are preparing something amazing and exciting for you.
          </p>
        </div>
      </div>
    </>
  )
}

export default ClientTermsCondition