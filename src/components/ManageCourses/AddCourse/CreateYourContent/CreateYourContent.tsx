import React, { useEffect, useState } from 'react'
import './CreateYourContent.scss'

import { Col, Row, Collapse, Button, Input } from 'antd'
import deleteIcon from "../../../../assets/icons/AddCourse/delete-icon.svg"
import uploadFileIcon from "../../../../assets/icons/AddCourse/upload-file-icon.svg"
import arrowUpIcon from "../../../../assets/icons/AddCourse/arrow-up.svg"
import arrowDownIcon from "../../../../assets/icons/AddCourse/arrow-down.svg"
import editIcon from "../../../../assets/icons/AddCourse/edit-icon.svg"
import saveIcon from "../../../../assets/icons/AddCourse/save-icon.svg"
import TextArea from 'antd/es/input/TextArea'
import UploadImage from '../../../Setting/SettingKeyInfo/UploadImage/UploadImage'
import { usePostContentLectureRequestMutation, usePatchCourseSectionRequestMutation, usePostCourseSectionRequestMutation, usePatchContentLectureRequestMutation, useGetCoursesDetailsQuery, useGetSectionsLecturesQuery, useGetCoursesDetailsSectionsQuery, useGetSectionsQuery, useGetManageCourseDetailDataQuery, useDeleteCourseSectionMutation, useDeleteSectionsLecturesMutation } from '../../../../store/Slices/ManageCourse'
import { useLocation } from 'react-router-dom'
import AppSnackbar from '../../../../utils/AppSnackbar'

const { Panel } = Collapse;


const CreateYourContent = ({ handleTabsValueChange, responseId }: any) => {

  const [postCourseSectionRequest] = usePostCourseSectionRequestMutation()
  const [patchCourseSectionRequest] = usePatchCourseSectionRequestMutation()
  const [postContentLectureRequest] = usePostContentLectureRequestMutation()
  const [patchContentLectureRequest] = usePatchContentLectureRequestMutation()

  const [deleteCourseSection] = useDeleteCourseSectionMutation()
  const [deleteSectionsLectures] = useDeleteSectionsLecturesMutation()

  const { pathname } = useLocation()
  const route = pathname.split('/')
  const routeId = route[3]
  const { state }: any = useLocation()



  const { data: isInfoData, isLoading: isloadingInfoData, isError: isErrorInfoData, isSuccess: isSucessInfoData } = useGetManageCourseDetailDataQuery({ id: state?.editProfile?._id || responseId })
  let getCourseDetailsData: any;
  if (isloadingInfoData) {
    getCourseDetailsData = <p>Loading...</p>
  }
  else if (isSucessInfoData) {
    getCourseDetailsData = isInfoData
  }
  else if (isErrorInfoData) {
    getCourseDetailsData = <p>Error...</p>
  }


  const [createCourseData, setcreateCourseData] = useState<any[]>(getCourseDetailsData?.data)

  const [sectionTitle, setSectionTitle] = useState('');
  const [lectureTitle, setLectureTitle] = useState('');
  const [lectureDiscription, setLectureDiscription] = useState('');
  const [sectionFechedId, setSectionFechedId] = useState('')
  const [lectureFechedId, setLectureFechedId] = useState('')
  const [isDescriptionEditMode, setIsDescriptionEditMode] = useState(false)
  const [isUploadModal, setIsUploadModal] = useState()
  const [isSectionEdit, setisSectionEdit] = useState(false)
  const [isLectureEdit, setisLectureEdit] = useState(false)
  const [sectionId, setSectionId] = useState()
  const [activePanel, setActivePanel] = useState()
  const [activePanelValue, setActivePanelValue] = useState('')


  const [isLoadingActive, setIsLoadingActive] = useState(false)



  const [saveSectionData, setsaveSectionData] = useState<any>()

  const [detailsAttachmentId, setDetailsAttachmentId] = useState("")
  const uploadDetailsAttachmentId = (id: any) => {
    setDetailsAttachmentId(id)
  }

  const handelUploadFiles = (index: any) => {
    setIsUploadModal(index)
  };
  const handlePanelChange = (panelId: any) => {
    if (activePanel === panelId) {
      setActivePanelValue(''); // If panel is already active, collapse it
    } else {
      setActivePanelValue(panelId); // Otherwise, activate the clicked panel
    }
  };

  // API's HANDLERS  

  const handelAddCourseSection = async () => {
    const payload = {
      "courseId": route[2] === 'edit-course' ? routeId : responseId,
      "sectionTitle": sectionTitle ? sectionTitle : 'write title here'
    }
    const { error, data }: any = await postCourseSectionRequest({ payload })

    if(data){
      AppSnackbar({
        type: "success",
        messageHeading: "Sucessfull",
        message: "Section sucessfully added"
      });
    }

    const newFields = [...createCourseData, {
      _id: data?.data._id,
      courseId: data?.data?.courseId,
      sectionTitle: data?.data?.sectionTitle,
      lectures: []
    }];
    setcreateCourseData(newFields);
    setSectionTitle('write title here')
  }
  const handelUpdateSectionTitle = async (element: any) => {
    if (element._id === sectionFechedId) {
      const payload = {
        "sectionTitle": sectionTitle
      }
      const { error, data }: any = await patchCourseSectionRequest({ id: element._id, payload })
      setsaveSectionData(data?.data)

    }

  }
  useEffect(() => {
    // const updatedData = createCourseData?.map((section) =>
    //   section._id === saveSectionData?._id
    //     ? { ...section, sectionTitle: saveSectionData?.sectionTitle }
    //     : section
    // );
    // setcreateCourseData(updatedData)

  }, [saveSectionData]);

  const handelAddLecture = async (item: any) => {
    const payload = {
      "courseId": route[2] === 'edit-course' ? routeId : responseId,
      "sectionId": route[2] === 'edit-course' ? item._id : item._id,
      "lectureTitle": "Dummy Introduction",
      "lectureMediaId": "63f72ff10972ff8bd5a46e90",
      "lectureDescription": "Dummy Lecture Description"
    }
    try {
      const { data, isLoading, isError, isSuccess }: any = await postContentLectureRequest({ payload })
      // console.log("LectureTabsData=>", data.data)
      setIsLoadingActive(true)
      // setcreateCourseData(prevSections => {
      //   const updatedSections = prevSections.map(section => {
      //     if (section._id === data?.data?.sectionId) {
      //       return {
      //         ...section,
      //         lectures: [...section.lectures, data?.data]
      //       };
      //     }
      //     return section;
      //   });

      //   return updatedSections;
      // });
      AppSnackbar({
        type: "success",
        messageHeading: "Sucessfull",
        message: "Lecture sucessfully added"
      });
    } catch (error: any) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: error?.data?.message ?? "Something went wrong!"
      });
    }


  }
  const handelUpdateLectures = async (element: any) => {

    const id = element?._id
    const payload = {
      "lectureTitle": lectureTitle ? lectureTitle : element?.lectureTitle,
      "lectureMediaId": detailsAttachmentId ? detailsAttachmentId : element?.lectureMediaId,
      "lectureDescription": lectureDiscription ? lectureDiscription : element?.lectureDescription
    }
    const { error, data }: any = await patchContentLectureRequest({ id, payload })
    // const updatedLectures = createCourseData.map((section: any) => {
    //   const newlectures = section.lectures.map((lecture: any) => {
    //     if (lecture._id === data?.data?._id) {
    //       return data?.data;
    //     }
    //     return lecture;
    //   });
    //   return {
    //     ...section,
    //     lectures: newlectures,
    //   };
    // });
    // console.log("updated Lecture => ", updatedLectures)
    // setcreateCourseData(updatedLectures)
    // console.log("LEC", data?.data)
  }

  const handleSectionTileChange = (event: any) => {
    setSectionTitle(event.target.value);
  };
  const handleLectureDiscriptionChange = (event: any) => {
    setLectureDiscription(event.target.value);
  };
  const handleLectureTileChange = (event: any) => {
    setLectureTitle(event.target.value);
  };

  const handelSectionDelete = async (element: any) => {

    try {
      const { error }: any = await deleteCourseSection({ id: element?._id })
      if (error) {
      }
    } catch (error) {
    }
    AppSnackbar({
      type: "success",
      messageHeading: "Sucessfull",
      message: "Section deleted successfully"
    });
    const updatedSectionData = createCourseData.filter((item: any) => item._id !== element?._id);
    setcreateCourseData(updatedSectionData)
  }

  const handleDeleteLecture = async (element: any) => {
    try {
      const { error }: any = await deleteSectionsLectures({ id: element })
      if (error) {
        console.log("Unexpected error:", error);
      }
    } catch (error) {
      console.log("Unexpected error:", error);
    }
    AppSnackbar({
      type: "success",
      messageHeading: "Sucessfull",
      message: "Lecture deleted successfully"
    });
    const updatedLecturesData = createCourseData.map((section: any) => {
      const updatedLectures = section.lectures.filter((lecture: any) => lecture._id !== element);
      return { ...section, lectures: updatedLectures };
    });
    setcreateCourseData(updatedLecturesData);
    console.log("updatedLecturesData==>", updatedLecturesData)
  }


  useEffect(() => {
    // if (route[2] === 'edit-course') {
    // setcreateCourseData(getCourseDetailsData?.data && getCourseDetailsData?.data?.sections)
    // setcreateCourseData(getCourseDetailsData?.data && getCourseDetailsData?.data)
    // }
  }, [isInfoData, createCourseData, getCourseDetailsData?.data])



  const handelForunsavedchanges = () => {
    if (isSectionEdit || isLectureEdit || isDescriptionEditMode) {
      AppSnackbar({
        type: "error",
        messageHeading: "Error",
        message: "you have some unsaved changes"
      });
    }
    else {
      handleTabsValueChange('3')
    }
  }
  return (
    <div className='wrapper-create-your-content'>
      <div className='form--head fs-14 fw-600 form-heading-color'>What will students learn in your course?</div>
      {getCourseDetailsData?.data?.sections?.map((item: any, index: any) => (
        <div className="wrapper-course-section" key={item?._id} onClick={() => setSectionId(item?._id)}>
          <div className="course-section-head d-flex">
            <div className="section-Title d-flex justify-center align-center fs-14 fw-700 white-color">Section {index + 1}&nbsp;:</div>
            <div className="section-info d-flex align-center  fs-14 fw-600 form-heading-color">
              {
                isSectionEdit && item._id === sectionFechedId ?
                  <Input className='edit-discription' onChange={handleSectionTileChange} />
                  :
                  <span>{item?.sectionTitle}&nbsp;</span>
              }
              {
                isSectionEdit && item._id === sectionFechedId ?
                  <img className='' src={saveIcon} alt="" onClick={() => { handelUpdateSectionTitle(item); setisSectionEdit(!isSectionEdit); setSectionFechedId(item?._id) }}
                    style={{ width: "13px", height: "13px", marginTop: '4px' }} />
                  :
                  <img className='f--hover-to-show' src={editIcon} alt="" onClick={() => { setisSectionEdit(!isSectionEdit); setSectionFechedId(item?._id); setSectionTitle('') }}
                    style={{ width: "13px", height: "13px", marginTop: '4px' }} />
              }
            </div>
            <img className='icon-section-delete' src={deleteIcon} onClick={() => handelSectionDelete(item)} alt="" />
          </div>
          <div className="lecture-tiles">
            <Collapse accordion onChange={handlePanelChange} activeKey={activePanelValue}>
              {item?.lectures?.map((ele: any, indexEle: any) => (
                <>
                  <Panel showArrow={false} header={
                    <div
                      className={`${activePanel === ele._id ? 'lecture-tile-head d-flex justify-between align-center bg--dark' : "lecture-tile-head d-flex justify-between align-center"}`}
                      onClick={() => { setActivePanel(ele._id); setIsDescriptionEditMode(false) }}
                    >
                      <div className='d-flex flex--res-column'>
                        <div className='tile-title fs-14 fw-600 label-color'>Lecture {indexEle + 1}:</div>
                        <div className='tile-name fs-14 fw-400 title-color d-flex' style={{ borderLeft: '1px solid #000', paddingLeft: "20px" }}>
                          {
                            isLectureEdit && ele._id === lectureFechedId ?
                              <Input className='edit-discription' defaultValue={ele?.lectureTitle === "Dummy Introduction" ? "" : ele?.lectureTitle} onChange={handleLectureTileChange} />
                              :
                              <span>{ele?.lectureTitle}&nbsp;</span>
                          }
                          {
                            isLectureEdit && ele._id === lectureFechedId ?
                              <img className='' src={saveIcon} alt="" onClick={() => { setisLectureEdit(!isLectureEdit); setLectureFechedId(ele?._id); handelUpdateLectures(ele) }}
                                style={{ width: "13px", height: "13px", marginTop: '4px' }} />
                              :
                              <img className='f--hover-to-show' src={editIcon} alt="" onClick={() => { setisLectureEdit(!isLectureEdit); setLectureFechedId(ele?._id); setLectureTitle('') }}
                                style={{ width: "13px", height: "13px", marginTop: '4px' }} />
                          }
                        </div>
                      </div>
                      <div className='tile-features d-flex' >
                        <img className={`${activePanel === ele._id ? '' : "f--hover-to-show"}`} src={deleteIcon} onClick={() => handleDeleteLecture(ele?._id)} alt="" />
                        <img className={`${activePanel === ele._id ? '' : "f--hover-to-show"}`} src={uploadFileIcon} alt="" />
                        <div className='delete-icon'>
                          <img src={activePanel === indexEle ? arrowUpIcon : arrowDownIcon} alt="" />
                        </div>
                      </div>
                    </div>
                  } key={ele._id} className='editable-panel-header'>
                    <div className="lecture-tile-content">
                      <div className="wrapper-description--upload-doc">
                        <div className="inner-upper-level">
                          <Row>
                            <Col xs={24} sm={24} md={20} lg={20}>
                              <div className="area-description d-flex flex-column">
                                {isDescriptionEditMode && activePanel === ele._id
                                  && <img className='edit-icon'
                                    onClick={() => { setIsDescriptionEditMode(activePanel === ele._id && !isDescriptionEditMode); handelUpdateLectures(ele) }}
                                    src={saveIcon} alt=""
                                    style={{ width: "13px", height: "13px" }} />}
                                {!isDescriptionEditMode && activePanel === ele._id && <img className='edit-icon' onClick={() => {
                                  setIsDescriptionEditMode(activePanel === ele._id && !isDescriptionEditMode); setLectureDiscription('')
                                }}
                                  src={editIcon} alt=""
                                  style={{ width: "13px", height: "13px" }} />}
                                <div className='fs-14 fw-600 label-color'>Description:</div>
                                {!isDescriptionEditMode && activePanel === ele._id && <div className='fs-14 fw-400'>{ele?.lectureDescription}</div>}
                                {isDescriptionEditMode && activePanel === ele._id && <TextArea rows={2} defaultValue={ele?.lectureDescription === "Dummy Lecture Description" ? '' : ele?.lectureDescription} placeholder="Description" className='text-area-styles' onChange={handleLectureDiscriptionChange} />}
                              </div>
                            </Col>
                            <Col xs={24} sm={24} md={4} lg={4}>
                              <div className="upload-file d-flex flex-column align-center justify-center" onClick={() => { handelUploadFiles(indexEle); setDetailsAttachmentId('') }}>
                                <img src={uploadFileIcon} alt="" />
                                <span className='fs-14px fw-600 text-center'>Upload <br /> Resource</span>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                      <div className="wrapper-uploaded-files-details">
                        <div className='fs-14 fw-600 label-color' style={{ marginBottom: "14px" }}>Files:</div>
                        {ele?.lectureMedia?.mediaId + ele?.lectureMedia?.mediaMeta?.extension}
                      </div>
                      {isUploadModal === indexEle &&
                        <div className="inner-absolute-wrapper-upload-resourse d-flex align-center justify-center">
                          <div className="upload-box"><UploadImage uploadCertificateId={uploadDetailsAttachmentId} fileUrl={ele?.lectureMedia?.mediaId + ele?.lectureMedia?.mediaMeta?.extension} /></div>
                          <div className="close-overlay" onClick={() => { handelUploadFiles(''); handelUpdateLectures(ele) }}></div>
                        </div>
                      }
                    </div>
                  </Panel>
                </>
              ))}
            </Collapse>
            <div className='d-flex justify-end' style={{ marginTop: "20px", height: "20px" }}>
              <button className='add-more-fields fs-14 fw-600 cursor-pointer'
                // onClick={() => addLectureTile(index)}
                onClick={() => handelAddLecture(item)}
                style={{ height: "20px" }}>+ Add</button>
            </div>
          </div>
        </div>
      ))}
      <div className='d-flex justify-end' style={{ marginTop: "20px" }}>
        <button className='add-more-fields fs-14 fw-600 cursor-pointer' onClick={handelAddCourseSection}>+ Add</button>
      </div>
      <Button className='save-and-next-btn fs-16 fw-600' disabled={!responseId || route[2] === 'edit-course'} htmlType='submit' onClick={handelForunsavedchanges}>Save & Next</Button>
    </div>
  )
}

export default CreateYourContent