import { Button, Col, Form, Input, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import "./PublishYourCourse.scss"
import arrowDown from "../../../../assets/icons/arrow-down-icon.svg"
import TextArea from 'antd/es/input/TextArea';

import uploadIcon from '../../../../assets/icons/AddCourse/upload-icon.svg'
import deleteIcon from '../../../../assets/icons/delete-icon-outlined.svg'
import { useGetCoursesDetailsQuery, useGetJobRolesRequestQuery, usePatchPublishCourseRequestMutation, usePostPublishFileRequestMutation, usePostPublishPhotoRequestMutation, usePutPublishCourseRequestMutation } from '../../../../store/Slices/ManageCourse';
import { useLocation, useNavigate } from 'react-router-dom';
import AppSnackbar from '../../../../utils/AppSnackbar';


const { Option } = Select;

const PublishYourCourse = ({ responseId }: any) => {

  const navigate = useNavigate()

  const { pathname } = useLocation()
  const route = pathname.split('/')
  const routeValue = route[2]
  const id = route[3]

  const { state }: any = useLocation()


  const [putPublishCourseRequest] = usePutPublishCourseRequestMutation()
  const [patchPublishCourseRequest] = usePatchPublishCourseRequestMutation()



  const { data, isLoading, isError, isSuccess } = useGetJobRolesRequestQuery([])

  let getJobRoles: any;
  if (isLoading) {
    getJobRoles = <p>Loading...</p>
  }
  else if (isSuccess) {
    getJobRoles = data
  }
  else if (isError) {
    getJobRoles = <p>Error...</p>
  }

  const { data: isData, isLoading: isloadingData, isSuccess: isSuccessData, isError: iserrorData }: any = useGetCoursesDetailsQuery({ id: state?.editProfile?._id })

  let manageCourseDetails: any;
  if (isloadingData) {
    manageCourseDetails = <p>Loading...</p>
  }
  else if (isSuccessData) {
    manageCourseDetails = isData
  }
  else if (iserrorData) {
    manageCourseDetails = <p>Error...</p>
  }

  const defaultImageName = manageCourseDetails?.data?.mediaImage[0]?.mediaId ? manageCourseDetails?.data?.mediaImage[0]?.fileName + '.' + manageCourseDetails?.data?.mediaImage[0]?.mediaMeta?.extension : ''
  const defaultVideoName = manageCourseDetails?.data?.mediaVideo[0]?.mediaId ? manageCourseDetails?.data?.mediaVideo[0]?.fileName + '.' + manageCourseDetails?.data?.mediaVideo[0]?.mediaMeta?.extension : ''

  const [uploadadImage, setUploadadImage] = useState<any>('');
  const [imageName, setImageName] = useState<any>(defaultImageName);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState<string>('');
  const [imageCanceledId, setImageCanceledId] = useState('')
  const [videoCanceledId, setVideoCanceledId] = useState('')

  const [updatedImageId, setUpdatedImageId] = useState()
  const [updatedFileId, setUpdatedFileId] = useState()



  const [postPublishPhotoRequest, { isLoading: isPhotoLoading, isSuccess: isSucessPhoto, data: isDataPhoto }] = usePostPublishPhotoRequestMutation()
  let imageID: any
  if (isSucessPhoto) {
    imageID = isDataPhoto
  }

  const [postPublishFileRequest, { isLoading: isFileLoading, isSuccess: isSucessFile, data: isDataFile }] = usePostPublishFileRequestMutation()
  let fileID: any
  if (isSucessFile) {
    fileID = isDataFile
  }

  const [uploadImage, setUploadedImage] = useState<any>(undefined);
  const handleImage = (e: any) => {
    let formData = new FormData();
    if (e.target.files.length) {
      const file: File = e.target.files[0];
      setUploadedImage({
        preview: URL.createObjectURL(file),
        raw: file,
      });
      var pattern = /image-*/;
      if (!file.type.match(pattern)) {
        return;
      }
      postPublishPhotoRequest({ file })
    }
  };

  const [uploadFile, setUploadedFile] = useState<any>(undefined);

  const handleFile = (e: any) => {
    let formData = new FormData();
    if (e.target.files.length) {
      const file: File = e.target.files[0];

      setUploadedFile({
        preview: URL.createObjectURL(file),
        raw: file,
      });
      var pattern = /video-*/;
      if (!file.type.match(pattern)) {
        return;
      }

      postPublishFileRequest({ file })
    }
  };




  const onChange = (checked: boolean) => {
  };
  const handleChange = (value: any) => {
  }
  const onFinish = async(values: any) => {
    const id = responseId
    const payload = {
      ...values,
      courseId: responseId,
      courseImageId: imageID?.data?._id,
      promoVideoId: fileID?.data?._id,
    }
    if (routeValue === 'edit-course') {
      const payloadEdit = {
        ...values,
        courseId: responseId,
        courseImageId: imageCanceledId === "cancelled" ? null : (imageID?.data?._id ? imageID?.data?._id : manageCourseDetails?.data?.mediaImage[0]?._id),
        promoVideoId: videoCanceledId === "cancelled" ? null : (fileID?.data?._id ? fileID?.data?._id : manageCourseDetails?.data?.mediaVideo[0]?._id),
      }
      // patchPublishCourseRequest({ payload: payloadEdit, id: route[3] })

      try {
        const { data, isLoading, isError, isSuccess }: any = await patchPublishCourseRequest({ payload: payloadEdit, id: route[3] })
        AppSnackbar({
          type: "success",
          messageHeading: "Sucessfull",
          message: "Course sucessfully Updated"
        });
      } catch (error: any) {
        AppSnackbar({
          type: "error",
          messageHeading: "Error",
          message: error?.data?.message ?? "Something went wrong!"
        });
      }

    } else {
      
      try {
        const { data, isLoading, isError, isSuccess }: any = await putPublishCourseRequest({ payload })
        AppSnackbar({
          type: "success",
          messageHeading: "Sucessfull",
          message: "Course sucessfully Published"
        });
        navigate(`/manage-courses`)
      } catch (error: any) {
        AppSnackbar({
          type: "error",
          messageHeading: "Error",
          message: error?.data?.message ?? "Something went wrong!"
        });
      }
    }
  };
  const onFinishFailed = (errorInfo: any) => {
  };
  const handleImageChange = (e: any) => {
    const selectedImage = e.target.files[0];
    setImageName(selectedImage.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUploadadImage(reader.result);
      }
    };
    reader.readAsDataURL(selectedImage);
  };

  // const handelAddLecture = async (item: any) => {
  //   const payload = {
  //     "courseId": route[2] === 'edit-course' ? routeId : responseId,
  //     "sectionId": route[2] === 'edit-course' ? item._id : item._id,
  //     "lectureTitle": "Dummy Introduction",
  //     "lectureMediaId": "63f72ff10972ff8bd5a46e90",
  //     "lectureDescription": "Dummy Lecture Description"
  //   }
  //   try {
  //     const { data, isLoading, isError, isSuccess }: any = await postContentLectureRequest({ payload })
  //     setIsLoadingActive(true)
  //     AppSnackbar({
  //       type: "success",
  //       messageHeading: "Sucessfull",
  //       message: "Lecture sucessfully added"
  //     });
  //   } catch (error: any) {
  //     AppSnackbar({
  //       type: "error",
  //       messageHeading: "Error",
  //       message: error?.data?.message ?? "Something went wrong!"
  //     });
  //   }


  // }


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
    setVideoURL(file ? URL.createObjectURL(file) : '');
  };


  // getJobRolesRequest

  useEffect(() => {
    if (routeValue === 'edit-course') {
      // setUpdatedImageId(manageCourseDetails?.data?.courseImage[0]?._id)
    }
  }, [])


  return (
    <div className='publish-your-couese-main-wrapper'>
      <Form
        name="basic"
        initialValues={{
          courseTitle: manageCourseDetails?.data?.courseTitle,
          courseDuration: manageCourseDetails?.data?.courseDuration,
          courseDescription: manageCourseDetails?.data?.courseDescription,
          courseLanguage: manageCourseDetails?.data?.courseLanguage,
          courseType: manageCourseDetails?.data?.courseType,
          courseCategory: manageCourseDetails?.data?.courseCategory,
          courseValidity: manageCourseDetails?.data?.courseValidity
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Row gutter={[30, 5]} align="bottom">

          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Course Title"
              name="courseTitle"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Input placeholder="Type here" style={{ width: '100%', height: '45px' }} className='course-title-input' />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Course Duration"
              name="courseDuration"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Select placeholder="Select Duration" onChange={handleChange} suffixIcon={<img src={arrowDown} />}>
                <Option value={1}>1 Week</Option>
                <Option value={2}>2 Week</Option>
                <Option value={3}>3 Week</Option>
                <Option value={4}>4 Week</Option>
                <Option value={5}>5 Week</Option>
                <Option value={6}>6 Week</Option>
                <Option value={7}>7 Week</Option>
                <Option value={8}>8 Week</Option>
                <Option value={9}>9 Week</Option>
                <Option value={10}>10 Week</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={20} lg={20}>
            <Form.Item
              label="Course Description"
              name="courseDescription"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <TextArea rows={4} placeholder="Type Here" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Language"
              name="courseLanguage"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Select placeholder="Select Level" onChange={handleChange} suffixIcon={<img src={arrowDown} />}>
                <Option value="English">English</Option>
                <Option value="Computer">Computer</Option>
                <Option value="Science">Science</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Course Type"
              name="courseType"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Select placeholder="Select Level" onChange={handleChange} suffixIcon={<img src={arrowDown} />}>
                <Option value="Optional">Optional</Option>
                <Option value="Mandatory">Mandatory</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Category (Role)"
              name="courseCategory"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Select placeholder="Select Level" onChange={handleChange} suffixIcon={<img src={arrowDown} />}>
                {/* <Option value="640d89d71eaa5d3aa1cb961e">Option 1</Option> */}
                {getJobRoles?.data?.result && getJobRoles?.data?.result.map((item: any, index: any) => (
                  <Option key={index} value={item._id}>{item?.userRole}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Validity"
              name="courseValidity"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <Select placeholder="Select Validity" onChange={handleChange} suffixIcon={<img src={arrowDown} />}>
              <Option value={1}>1 Year</Option>
                <Option value={2}>2 Year</Option>
                <Option value={3}>3 Year</Option>
                <Option value={4}>4 Year</Option>
                <Option value={5}>5 Year</Option>
                <Option value={6}>6 Year</Option>
                <Option value={7}>7 Year</Option>
                <Option value={8}>8 Year</Option>
                <Option value={9}>9 Year</Option>
                <Option value={10}>10 Year</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={10}>
            {/* <Input ></Input> */}
            <Form.Item
              label="Course Image"
              // name="courseImage"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <div className='upload-file-area'>
                <input type="file" accept="image/*" name=""
                  onChange={(e: any) => { handleImageChange(e); handleImage(e) }}
                  //  onChange={handleImageChange}
                  id="" />
                <img className='upload-doc-icon cursor-pointer' src={uploadIcon} alt="" />
                {imageName && <img className='delete-icon' src={deleteIcon} alt="" onClick={()=> {setUploadedImage(undefined); setImageName(''); setImageCanceledId("cancelled")}}/>}
                <p className='file-title-display'>{imageName ? imageName : <span style={{ color: "#888888" }}>File Name</span>}</p>
              </div>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={10}>
            <Form.Item
              label="Promotional Video"
              // name="promotionalVideo"
              rules={[{ required: true, message: 'Required field' }]}
            >
              <div className='upload-file-area'>
                <input type="file" accept="video/*" onChange={(e: any) => { handleFileChange(e); handleFile(e) }} id="" />
                <img className='upload-doc-icon cursor-pointer' src={uploadIcon} alt="" />
                {selectedFile && <img className='delete-icon' src={deleteIcon} alt="" onClick={()=> {setSelectedFile(null); setVideoCanceledId('cancelled')}} />}
                <p className='file-title-display'>{selectedFile?.name ? selectedFile?.name : defaultVideoName ? defaultVideoName : <span style={{ color: "#888888" }}>File Name</span>}</p>
              </div>
            </Form.Item>
          </Col>


          <Col xs={24} sm={24} md={12} lg={10}>
            <div className='uploaded-image d-flex justify-center align-center'>

              {uploadImage ?
                <img src={uploadImage?.preview} alt="preview" className='uploaded-image-preview' />
                :
                <>
                  {
                    manageCourseDetails?.data?.mediaImage[0]?.mediaId ?
                      <img className='uploaded-image-preview' src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${manageCourseDetails?.data?.mediaImage[0]?.mediaId}.${manageCourseDetails?.data?.mediaImage[0]?.mediaMeta?.extension}`} alt="" />
                      :
                      <>
                        <span className='fs-14 fw-600'>Preview</span>
                      </>
                  }
                </>

              }



              {/* <p>{imageName}</p> */}
            </div>
          </Col>

          <Col xs={24} sm={24} md={12} lg={10}>
            <div className='uploaded-image d-flex justify-center align-center'>


              {selectedFile ? (
                <video width="100%" height="100%" controls>
                  <source src={videoURL} type="video/mp4" />
                </video>
              ) :
                <>
                  {
                    manageCourseDetails?.data?.mediaVideo[0]?.mediaId ?
                      <video
                        width="100%" height="100%"
                        src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${manageCourseDetails?.data?.mediaVideo[0]?.mediaId}.${manageCourseDetails?.data?.mediaVideo[0]?.mediaMeta?.extension}`}
                        controls>
                      </video>
                      :
                      <>
                        <span className='fs-14 fw-600'>Preview</span>
                      </>
                  }
                </>
              }
            </div>
          </Col>
        </Row>
        <Button className='save-and-next-btn fs-16 fw-600' htmlType='submit' style={{ marginTop: "30px" }} loading={isFileLoading}>Submit</Button>
      </Form>
    </div>
  )
}

export default PublishYourCourse