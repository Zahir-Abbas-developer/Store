import { Button, Col, Form, Input, Row } from 'antd'
import { useEffect, useState } from 'react'
import "./PlanYourCourse.scss"
import deleteIcon from "../../../../assets/icons/delete-icon.svg"
import { v4 as uuidv4 } from 'uuid';
import { useGetCoursesDetailsQuery, usePatchPlanYourCourseRequestMutation, usePostPlanYourCourseRequestMutation } from '../../../../store/Slices/ManageCourse';
import { useLocation } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';



const InputFields = ({ fieldsSection, removeField, handleFieldChangeSection, setFieldsSection, addEmptyField, indevVal }: any) => {
  return (
    <Row gutter={[30, 0]} align="bottom" className='main-wrapper-plan-your-course'>
      {fieldsSection?.length && fieldsSection.map((fieldOne: any, indexOne: any) => (
        <Col xs={24} sm={24} md={12} lg={10} key={indexOne}>
          <Form.Item
            shouldUpdate
            label=""
            name={`${indevVal}_${indexOne}`}
            rules={[{ required: true, message: 'Required field' }]}
          >
            <div className="d-flex" style={{ gap: "10px" }}>
              <Input className='plan-your-course-input'
                placeholder="Type here"
                defaultValue={fieldsSection[indexOne]}
                onChange={(eventOne) => { handleFieldChangeSection(indexOne, eventOne) }}
                style={{ width: '100%', height: '45px' }}
                suffix={indexOne > 0 && (
                  <div className='delete-button'>
                    <img className='cursor-pointer' src={deleteIcon} alt="" onClick={removeField(setFieldsSection, indexOne)} />
                  </div>
                )}
              />
            </div>
          </Form.Item>
        </Col>
      ))}
      <Col xs={24} sm={24} md={24} lg={24}>
        <button type="button" className='add-more-fields fs-14 fw-600 cursor-pointer' onClick={addEmptyField(setFieldsSection)}>+ Add more to your response</button>
      </Col>
    </Row>
  )
}


const PlanYourCourse = ({ handleTabsValueChange, handleResponseId }: any) => {

  const [isEditMode, setIsEditMode] = useState(false)
  const [form] = useForm();
  const { pathname } = useLocation()
  const route = pathname.split('/')
  const routeValue = route[2]
  const id = route[3]



  const { state }: any = useLocation()

  console.log(state)

  const { data, isLoading, isError, isSuccess } = useGetCoursesDetailsQuery({id:state?.editProfile?._id})

  let manageCourseDetails: any;
  if (isLoading) {
    manageCourseDetails = <p>Loading...</p>
  }
  else if (isSuccess) {
    manageCourseDetails = data
  }
  else if (isError) {
    manageCourseDetails = <p>Error...</p>
  }

  console.log("manageCourseDetails", manageCourseDetails?.data)

  const [postPlanYourCourse] = usePostPlanYourCourseRequestMutation()
  const [patchPlanYourCourseRequest] = usePatchPlanYourCourseRequestMutation()

  const [fieldsSectionOne, setFieldsSectionOne] = useState<string[]>([""]);
  const [fieldsSectionTwo, setFieldsSectionTwo] = useState<string[]>([""]);
  const [fieldsSectionThree, setFieldsSectionThree] = useState<string[]>([""]);

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    const payload = {
      "whatYouLearn": fieldsSectionOne,
      "prerequisities": fieldsSectionTwo,
      "targetAudience": fieldsSectionThree,
    }
    if (routeValue === 'edit-course') {
      patchPlanYourCourseRequest({ payload, id })
    } else {
      const { error, data, isLoading }: any = await postPlanYourCourse({ payload })
      console.log("Res id =>", data?.data?._id)
      handleResponseId(data?.data?._id)
    }
    console.log("payload=>", payload)
    handleTabsValueChange('2');

    console.log("fieldsSectionOne", fieldsSectionOne)
  };



  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  const addFieldSectionOne = () => {
    setFieldsSectionOne(fields => [...fields, ""]);
  };
  const removeFieldSectionOne = (index: any) => {
    setFieldsSectionOne(fields => fields.filter((_, i) => i !== index));
  };
  const handleFieldChangeSectionOne = (index: any, eventOne: any) => {
    const newFieldsSectionOne = [...fieldsSectionOne];
    // const indexOne = newFieldsSectionOne.findIndex(fieldOne => fieldOne?.id === id);
    newFieldsSectionOne[index] = eventOne.target.value;
    setFieldsSectionOne(newFieldsSectionOne);
  };

  const addEmptyField = (setState: any) => {
    return () => {
      setState((fields: any) => [...fields, ""]);
    };
  };

  const removeField = (setState: any, index: number) => {
    return () => {
      setState((fields: any) => fields.filter((_: any, i: number) => i !== index));;
    };
  };

  //section Two
  const addFieldSectionTwo = () => {
    const newFieldsSectionTwo = [...fieldsSectionTwo];
    newFieldsSectionTwo.push("");
    setFieldsSectionTwo(newFieldsSectionTwo);
  };
  const removeFieldSectionTwo = (index: any) => {
    const newFieldsSectionTwo = [...fieldsSectionTwo];
    newFieldsSectionTwo.splice(index, 1);
    setFieldsSectionTwo(newFieldsSectionTwo);
  };
  const handleFieldChangeSectionTwo = (index: any, eventTwo: any) => {
    const newFieldsSectionTwo = [...fieldsSectionTwo];
    newFieldsSectionTwo[index] = eventTwo.target.value;
    setFieldsSectionTwo(newFieldsSectionTwo);
  };


  //section Three
  const addFieldSectionThree = () => {
    const newFieldsSectionThree = [...fieldsSectionThree];
    newFieldsSectionThree.push("");
    setFieldsSectionThree(newFieldsSectionThree);
  };
  const removeFieldSectionThree = (index: any) => {
    const newFieldsSectionThree = [...fieldsSectionThree];
    newFieldsSectionThree.splice(index, 1);
    setFieldsSectionThree(newFieldsSectionThree);
  };
  const handleFieldChangeSectionThree = (index: any, eventThree: any) => {
    const newFieldsSectionThree = [...fieldsSectionThree];
    newFieldsSectionThree[index] = eventThree.target.value;
    setFieldsSectionThree(newFieldsSectionThree);
  };


  // const [form] = useForm()

  const initialValues = {
    fieldsSectionOne: fieldsSectionOne?.length && fieldsSectionOne.map((fieldOne, indexOne) => ({ [`indexValOne_${indexOne}`]: fieldOne })),
    fieldsSectionTwo: fieldsSectionTwo?.length && fieldsSectionTwo.map((fieldTwo, indexTwo) => ({ [`indexValTwo_${indexTwo}`]: fieldTwo })),
    fieldsSectionThree: fieldsSectionThree?.length && fieldsSectionThree.map((fieldThree, indexThree) => ({ [`indexValThree_${indexThree}`]: fieldThree })),
  }
  useEffect(() => {
    form.setFieldsValue(initialValues)
   }, [form,initialValues])

  useEffect(() => {
    if (routeValue === 'edit-course') {
      setIsEditMode(true);
      setFieldsSectionOne(manageCourseDetails?.data?.whatYouLearn)
      setFieldsSectionTwo(manageCourseDetails?.data?.prerequisities)
      setFieldsSectionThree(manageCourseDetails?.data?.targetAudience)
    }


  }, [isEditMode, data])

  // console.log("fieldsSectionOne", fieldsSectionOne)
  // console.log("state", state)




  return (
    <div className='wrapper-plan-your-course'>
      <Form
        name="basic"
        initialValues={initialValues}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"

      >
        <div className='form--head fs-14 fw-600'>What will students learn in your course?</div>
        <InputFields  className='plan-your-course-input'
        fieldsSection={fieldsSectionOne} indevVal='indevValOne' removeField={removeField} handleFieldChangeSection={handleFieldChangeSectionOne} setFieldsSection={setFieldsSectionOne} addEmptyField={addEmptyField}
        />
        <div className='form--head fs-14 fw-600'>What are the requirements or prerequisites for taking your course?</div>
        <InputFields className='plan-your-course-input'
        fieldsSection={fieldsSectionTwo} indevVal='indevValTwo' removeField={removeField} handleFieldChangeSection={handleFieldChangeSectionTwo} setFieldsSection={setFieldsSectionTwo} addEmptyField={addEmptyField}
        />

        <div className='form--head fs-14 fw-600'>Who is this course for?</div>
        <InputFields className='plan-your-course-input'
        fieldsSection={fieldsSectionThree} indevVal='indevValThree' removeField={removeField} handleFieldChangeSection={handleFieldChangeSectionThree} setFieldsSection={setFieldsSectionThree} addEmptyField={addEmptyField}
        />
        <Button className='save-and-next-btn fs-16 fw-600' htmlType='submit' >Save & Next</Button>
      </Form>
    </div>
  )
}

export default PlanYourCourse