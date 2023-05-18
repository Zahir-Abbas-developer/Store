import { Modal, Tabs, TabsProps } from 'antd';
import Close from '../../../../assets/images/OnBoarding/Close.svg';
import BookShift from './BookShift';
import "./AddModal.scss";

function AddModal(props: any) {
  const { isAddModalOpen, setIsAddModalOpen } = props
  const handleOk = () => {
    setIsAddModalOpen(false);
  };
  const handleCancel = () => {
    setIsAddModalOpen(false);
  };
  const ModalTabItems: TabsProps['items'] = [
    {
      key: '1',
      label: `Book Shift`,
      children: <BookShift isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} name='bookShift' />,
    },
    {
      key: '2',
      label: `Direct Book Staff`,
      children: <BookShift isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} name='directBook' />,
    },
  ];
  const onTabChange = (key: string) => {
    console.log(key);
  };
  // modal functions ends here 
  return (
    <Modal width={890} open={isAddModalOpen} className="add-book-shift-modal"
      footer={false} onOk={handleOk} closeIcon={< img onClick={handleCancel} src={Close} alt="close" />}>
      <Tabs defaultActiveKey="1" items={ModalTabItems} onChange={onTabChange} />
    </Modal >
  )
}

export default AddModal
