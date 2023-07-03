import { Card, Tabs } from "antd";
import type { TabsProps } from "antd";
import { ReviewCareHomes } from "../ReviewCareHomes/ReviewCareHomes";
import { UnreviewCareHomes } from "../ReviewCareHomes/UnreviewedCareHomes/UnreviewedCareHomes";
import "./RatingsTabs.scss";
import "../../../sass/common.scss"
const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Reviewed`,
    children: <ReviewCareHomes />,
  },
  {
    key: "2",
    label: `Unreviewed`,
    children: <UnreviewCareHomes />,
  },
];

const RatingsReviewUnreviewTab = () => (
  <Card  bodyStyle={{paddingTop:"0"}}>
    <Tabs
      className="custom-tabs-wrapper-style "
      defaultActiveKey="1"
      items={items}
      onChange={onChange}
    />
  </Card>
);

export default RatingsReviewUnreviewTab;
