import { Button, Modal } from "antd"
// import AppSnackbar from "../../utils/snackbar";
import '../../sass/common.scss'

const BirthDayModal = ({ isModalOpen, setIsOpenModal, birthDayMessage, wishButtonText, backgroundColor,iconImage,handleSubmit }: any) => {


    const handleDelete = () => {
        // AppSnackbar({ type: "success", message: "Congratulation Birthday Notification Sent Successfully", });
        setIsOpenModal(false)
    }


    return (

        <Modal footer={null} centered onCancel={handleDelete} width={499} style={{ textAlign: "center" }} onOk={handleDelete} open={isModalOpen}>

            <img src={iconImage} alt="deleteIcon" height={100} width={100}></img>
            <p className='fs-28 fw-500 ' style={{ color: "#000000", textAlign: "center", margin: "25px" }}>{birthDayMessage}</p>
            <Button type="primary"  onClick={handleSubmit}> <span style={{ color: "#FFFFFF" ,marginBottom:"35px"}}>{wishButtonText}</span></Button>
        </Modal>

    )

}
export default BirthDayModal