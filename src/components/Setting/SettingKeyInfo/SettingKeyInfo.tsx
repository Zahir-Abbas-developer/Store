
import { Tabs } from 'antd';
import { TabsProps } from 'antd/es/tabs';
import BussinessDetials from '../SettingKeyInfo/BussinessDetials/BussinessDetials';
import BusinessLogo from '../SettingKeyInfo/BusinessLogo/BusinessLogo';
import "./SettingKeyInfo.scss";

const SettingKeyInfo = () => {

  // settting-key-info
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Bussiness Detials`,
      children: <BussinessDetials />,
    },
    {
      key: '2',
      label: `Business Logo`,
      children: <BusinessLogo />,
    },
  ];
  // settting-key-info

  return (

    <div className='setting-key-info'>

      <Tabs defaultActiveKey="1" items={items} type="card" tabPosition="left" />
    </div>


  )
}

export default SettingKeyInfo