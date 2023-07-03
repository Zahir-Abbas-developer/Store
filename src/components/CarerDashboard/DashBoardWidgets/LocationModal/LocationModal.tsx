import { Modal } from "antd";

const LocationModal = ({ isModalOpen, setIsModalOpen }: any) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      centered
      closable={false}
      className="location-modal"
      width={1500}
      footer={false}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <iframe
        style={{ width: "100%", height: "700px", border: "0" }}
        allowFullScreen
        src="https://www.google.com/maps/place/Orcalo/@31.4549677,74.2795396,15z/data=!4m6!3m5!1s0x391901e338b3cae7:0x67b57e00710c25f8!8m2!3d31.455792!4d74.2838254!16s%2Fg%2F11sbz4hs8h"
      ></iframe>
    </Modal>
  );
};

export default LocationModal;
