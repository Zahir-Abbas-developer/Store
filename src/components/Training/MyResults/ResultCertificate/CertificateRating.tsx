import { Input, Rate, Form, Button } from "antd";
import { useEffect, useState } from "react";
import editIcon from "../../../../assets/icons/training/edit-icon2.png";
import { usePatchMyResultRatingMutation, usePostMyResultRatingMutation } from "../../../../store/Slices/Training";
import AppSnackbar from "../../../../utils/AppSnackbar";

// const ratingValue =
//   "The lessons were really engaging and the short videos are a good technique to keep attention. I actually enjoyed the course. Get this professor if you can, he's funny, quirky, and most importantly an insanely good lecturer.";

const CertificateRating = ({ ratingData, courseId, courseIdObj, isResult }: any) => {


  const [patchMyResultRating, { isSuccess }] = usePatchMyResultRatingMutation()
  const [postMyResultRating, { isSuccess:postSucess }] = usePostMyResultRatingMutation()
  


  const [value, setValue] = useState<number>(ratingData);
  const [ratingNote, setRatingNote] = useState();
  const [editReview, setEditReview] = useState(false);

  console.log("ratingData +==>", ratingData)
  console.log("courseId +==>", courseId)

  const handelSaveSubmit = async () => {
    

    if(!ratingData.id || courseIdObj){
      const payload = {
        "courseId": courseIdObj ? courseIdObj : courseId,
        "rating": value,
        "comment": ratingNote
      }
      console.log("IF running")
      try {
        await postMyResultRating({payload }).unwrap();
        AppSnackbar({
          type: "success",
          messageHeading: "Uplaad",
          message: "Information Uploaded successfully"
        });
        setEditReview(false)
      } catch (error: any) {
        AppSnackbar({
          type: "error",
          messageHeading: "Error",
          message: error?.data?.message ?? "Something went wrong!"
        });
      }
    }else{
      const payload = {
        "rating": value,
        "comment": ratingNote
      }
      try {
        await patchMyResultRating({ id: ratingData.id, payload }).unwrap();
        AppSnackbar({
          type: "success",
          messageHeading: "Uplaad",
          message: "Information Uploaded successfully"
        });
        setEditReview(false)
      } catch (error: any) {
        AppSnackbar({
          type: "error",
          messageHeading: "Error",
          message: error?.data?.message ?? "Something went wrong!"
        });
      }
    }

    
  }


  // useEffect(() => {
  //   setValue(ratingData)
  // }, [value])



  return (
    <div className="rating-card">
      <div className="d-flex justify-between top-bar">
        <h2 className="title m-0 fs-14 fw-600">How Would You Rate This Course OverAll?</h2>
        <img onClick={() => setEditReview(true)} src={editIcon} alt="" />
      </div>
      <div className="rating">
        <Rate disabled={!editReview} onChange={setValue} value={value} />
        {!editReview ? (
          <p className="desc fs-12 fw-400">{ratingData?.comment}</p>
        ) : (
          <Form style={{ marginTop: "10px" }} layout="vertical">
            <Form.Item
              label={<span className="fw-600 label-color">Write your review (Optional)</span>}
            >
              <Input.TextArea
                onChange={(e: any) => setRatingNote(e.target.value)}
                defaultValue={ratingData?.comment}
                value={ratingNote}
                rows={4}
              />
            </Form.Item>
            <Button onClick={handelSaveSubmit} className="save-btn">
              Save
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default CertificateRating;
