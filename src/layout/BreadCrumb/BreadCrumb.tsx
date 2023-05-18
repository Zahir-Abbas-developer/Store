import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import seprator from "../../assets/icons/Dashboard/seprator.png";
import "./BreadCrumb.scss";

interface PropType {
  breadCrumbItems: {
    title: string;
    path: string;
  }[];
}

const BreadCrumb = (props: PropType) => {
  const { breadCrumbItems } = props;
  return (
    <div className="breadcrumb-wrapper">
      <Breadcrumb separator={<img className="seprator" src={seprator} alt="" />}>
        {breadCrumbItems.length === 1 ? (
          <Breadcrumb.Item className="fs-24 fw-500">{breadCrumbItems[0].title}</Breadcrumb.Item>
        ) : (
          <>
            <Breadcrumb.Item className="fs-24 fw-500">{breadCrumbItems[0].title}</Breadcrumb.Item>
            {breadCrumbItems.slice(1).map((item: any) => (
              <Breadcrumb.Item key={item?.path}>
                <Link to={item?.path}>{item?.title}</Link>
              </Breadcrumb.Item>
            ))}
          </>
        )}
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumb;
