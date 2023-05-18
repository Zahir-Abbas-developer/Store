import { useCallback, useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import Picker from "emoji-picker-react";
import { Avatar, Badge, Button, Col, Image, Row } from "antd";
import { CloudDownloadOutlined, FileProtectOutlined } from "@ant-design/icons";
import {
  useGetHelpDeskByTicketIdRequestQuery,
  usePatchCommentsRequestMutation,
  usePostMediaRequestMutation,
} from "../../../../../store/Slices/ItHelpDesk";
import ShowAllFilesModal from "./ShowAllFilesModal/ShowAllFilesModal";
import BreadCrumb from "../../../../../layout/BreadCrumb/BreadCrumb";
import dateIcon from "../../../../../assets/icons/ItHelpDesk/dateIcon.svg";
import chatLogo from "../../../../../assets/images/itHelpDesk/chat-logo.png";
import documentImages from "../../../../../assets/icons/ItHelpDesk/documentImages.svg";
import CrossIcon from "../../../../../assets/icons/ManageUser/cross-icon.svg";
import profile from "../../../../../assets/images/itHelpDesk/profile.svg";
import chatAmount from "../../../../../assets/images/itHelpDesk/chatAmount.svg";
import UploadChat from "../../../../../assets/images/itHelpDesk/uploadChat.svg";
import chatEmoji from "../../../../../assets/images/itHelpDesk/emojiImage.svg";
import "./ItHelpDeskSupportDashboard.scss";

const ItHelpDeskSupportDashboard = () => {
  const userData = JSON.parse(localStorage.getItem("careUserData") || "{}");
  const [toggleEmoji, setToggleEmoji] = useState<boolean>(false);
  const [toShowAllFiles, setToShowAllFiles] = useState<any>({ isToggle: false, type: '' });
  const [userMessage, setUserMessage] = useState<{ message: string; isReciever: boolean; time: string }>({
    message: "",
    isReciever: false,
    time: "",
  });
  const [inputMessage, setInputMessage] = useState<string>("");
  const [image, setImage] = useState<any>({ preview: "", raw: "" });
  const [uploadImgId, setUploadImgId] = useState<any>();

  const dateTime: any = dayjs().format("LT");
  const { state: ticketData } = useLocation();

  //******************
  const [patchCommentsRequest, { isLoading }] = usePatchCommentsRequestMutation();
  const [postMediaRequest] = usePostMediaRequestMutation();

  const {
    data: ticketByIdData,
    isSuccess: isSuccessTicketById,
    isError: isErrorTicketById,
    error: ticketByIdError,
    isLoading: ticketByIdLoading
  } = useGetHelpDeskByTicketIdRequestQuery({
    refetchOnMountOrArgChange: true,
    id: ticketData?._id,
  });

  //Ticket data by id
  let ticketDataById: any;
  if (isSuccessTicketById) {
    ticketDataById = ticketByIdData;
  } else if (isErrorTicketById) {
    ticketDataById = ticketByIdError;
  }

  const handleAddImg = async (e: any) => {
    let CommentData = new FormData();
    if (e.target.files.length) {
      CommentData.append("file", e.target.files[0]);
      const { data: uploadData }: any = await postMediaRequest(CommentData);
      setUploadImgId(uploadData);

      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };
  //************* */

  const onEmojiClick = (event: any, emojiObject: any) => {
    setInputMessage(inputMessage + "".concat(emojiObject.emoji));
    setUserMessage({ ...userMessage, message: inputMessage });
  };

  const handleSubmit = useCallback(
    (e: React.ChangeEvent<HTMLFormElement> | any) => {
      e.preventDefault();

      const payload: any = {};

      if (inputMessage !== "") {
        payload["comment"] = inputMessage;
      }
      if (uploadImgId) {
        payload["attachment"] = uploadImgId?.data?._id;
      }
      if (Object.keys(payload).length > 0) {
        patchCommentsRequest({ payload, commentId: ticketData._id });
      }
      setInputMessage("");
      setImage({ raw: "", preview: "" });
    },
    [dateTime, inputMessage, userMessage, image.raw]
  );

  //***************** */
  const profileImg = ticketDataById?.data?.response?.userDetails?.profilePhoto
    ? `https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${ticketDataById?.data?.response?.userDetails?.profilePhoto?.mediaId}.${ticketDataById?.data?.response?.userDetails?.profilePhoto?.mediaMeta?.extension}`
    : profile;

  const handleImageType = (imageType: any) => {
    return (
      imageType?.startsWith("image/") &&
      (imageType?.endsWith("png") || imageType?.endsWith("jpg") || imageType?.endsWith("jpeg") || imageType?.endsWith("webp"))
    );
  };
  const messagesEndRef: any = useRef<HTMLDivElement>();
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [ticketDataById?.data?.response?.comments]);

  const breadCrumbItems = [
    {
      title: "IT Support Dashboard",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
    },
  ];


  const commentsImages = ticketDataById?.data?.response?.comments?.filter((item: any) => {
    return handleImageType(item?.media?.mediaMeta?.mimetype) && item
  })

  const commentsDocuments = ticketDataById?.data?.response?.comments?.filter((item: any) => {
    return (item?.media && !handleImageType(item?.media?.mediaMeta?.mimetype)) && item
  })

  return (
    <>
      <div style={{ paddingBlock: '1rem' }}>
        <BreadCrumb breadCrumbItems={breadCrumbItems} />
      </div>
      <div className="wrap-support-dashboard">
        {(isErrorTicketById || ticketByIdLoading) ? (
          <div className="d-flex align-center justify-center" style={{ height: '68vh' }}>
            <div>
              <img src={chatLogo} alt="chat-logo" />
              <p className="m-0 text-center">No Chat Found</p>
            </div>
          </div>
        ) : (
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" xs={24} lg={10} xl={7}>
              <div className="wrap-chat" style={{ minHeight: image.preview ? '52rem' : '48.5rem' }}>
                <div className="wrap-profile-image">
                  <Avatar className="profile-img-circle" style={{ marginTop: "16px", border: "5px solid #34BC85" }} src={profileImg} />
                </div>
                <div className="chat-name">
                  <h6 className="m-0 fs-14 fw-600">Name</h6>
                  <p
                    className="m-0 fs-14 fw-400"
                    style={{ textTransform: "capitalize" }}
                  >{`${ticketDataById?.data?.response?.userDetails?.firstName} ${ticketDataById?.data?.response?.userDetails?.lastName}`}</p>
                </div>
                <div className="chat-user-type">
                  <h6 className="m-0 fs-14 fw-600">User Type</h6>
                  <p className="m-0 fs-14 fw-400">{ticketDataById?.data?.response?.userDetails?.userType?.name}</p>
                </div>
                <div className="chat-email">
                  <h6 className="m-0 fs-14 fw-600">Email</h6>
                  <p className="m-0 fs-14 fw-400">{ticketDataById?.data?.response?.userDetails?.email}</p>
                  <hr />
                </div>
                <div>
                  <div className="d-flex justify-between chat-margin">
                    <h6 className="m-0 fw-700 fs-14">Images</h6>
                    <p className="m-0 fw-400 fs-14 cursor" onClick={() => setToShowAllFiles({ isToggle: true, type: "img" })}>Show all</p>
                  </div>
                  <div className="d-flex" style={{ flexWrap: 'wrap-reverse' }}>
                    {commentsImages?.slice(0, 3)?.map((item: any) => <div style={{ marginRight: '10px', marginBottom: '10px' }}>
                      <Image
                        src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${item?.media?.mediaId}.${item?.media?.mediaMeta?.extension}`}
                        alt="uploaded img"
                        style={{ objectFit: "cover", borderRadius: "5px" }}
                        height="80px"
                        width="80px"
                      /></div>)}
                  </div>
                </div>
                <div className="wrap-chat-document">
                  <div className="d-flex justify-between chat-margin">
                    <h6 className="m-0 fw-700 fs-14">Documents</h6>
                    <p className="m-0 fw-400 fs-14 cursor" onClick={() => setToShowAllFiles({ isToggle: true, type: "docs" })}>Show all</p>
                  </div>
                  <div className="d-flex align-center chat-margin">
                    {commentsDocuments?.slice(0, 2)?.map((item: any) =>
                      <>
                        <div className="documents-img d-flex justify-center align-center cursor">
                          <img src={documentImages} alt="" />
                        </div>
                        <div className="document-content cursor">
                          <h6 className="m-0">{item?.media?.fileName} {item?.media?.mediaMeta?.extension}</h6>
                          <span>{(item?.media?.mediaSize / 1024).toFixed(2)} kb</span>
                        </div>
                      </>
                    )}
                  </div>

                </div>
              </div>
            </Col>
            <Col className="gutter-row" xs={24} lg={14} xl={17}>
              <div style={{ backgroundColor: "white", boxShadow: " 10px 54px 74px rgba(0, 0, 0, 0.03)" }}>
                <div className="d-flex justify-between" style={{ padding: "20px", flexWrap: 'wrap', gap: '10px' }}>
                  <div className="d-flex justify-center text-center" style={{ flexWrap: 'wrap' }}>
                    <div>
                      <Avatar size={43} src={profileImg} style={{ marginRight: "18px" }} />
                    </div>

                    <div>
                      <h6
                        className="fw-500 fs-16 m-0"
                        style={{ textTransform: "capitalize" }}
                      >{`${ticketDataById?.data?.response?.userDetails?.firstName} ${ticketDataById?.data?.response?.userDetails?.lastName}`}</h6>
                      <p className="m-0" style={{ textTransform: "capitalize" }}>
                        <Badge
                          style={{ paddingRight: ".5rem" }}
                          color={ticketDataById?.data?.response?.userDetails?.status === "active" ? "#34BC85" : "#FF4D4F"}
                        />
                        {ticketDataById?.data?.response?.userDetails?.status}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-center justify-between" style={{ gap: "30px" }}>
                    <p className="m-0 fs-14 fw-400 d-flex">
                      <img src={chatAmount} alt="amount" style={{ marginRight: "7px" }} />
                      {ticketDataById?.data?.response?.ticket}
                    </p>
                    <p className="m-0 fs-400 d-flex">
                      <img src={dateIcon} alt="dateicon" className="cursor" style={{ marginRight: "7px" }} />
                      {dayjs(ticketDataById?.data?.response?.date).format("DD/MM/YYYY")}
                    </p>
                  </div>
                </div>
              </div>

              <div className=" chat-padding">
                <div>
                  <h6 className="text-center fw-500 fs-14 m-0">
                    <span className="fw-500 fs-16">Subject: </span>
                    {ticketDataById?.data?.response?.subject}
                  </h6>
                </div>
                <div>
                  <h6 className="fw-500 fs-16 m-0">
                    <span className="fw-500 fs-14">Description:</span> {ticketDataById?.data?.response?.description}
                  </h6>
                  <hr />
                </div>
              </div>
              <div style={{ height: "56.1vh", overflowY: "scroll" }} ref={messagesEndRef}>
                {ticketDataById?.data?.response?.comments &&
                  ticketDataById?.data?.response?.comments?.map((item: any) => {
                    return (
                      <div className="gutter-row">
                        <div className="d-flex chat-margin" style={{ justifyContent: item.userId === userData.id ? "center" : "start" }}>
                          <div className="img">
                            <Avatar size={43} src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${item?.user?.profilePhoto?.mediaId}.${item?.user?.profilePhoto?.mediaMeta?.extension}`} style={{ marginRight: '10px' }} />
                          </div>
                          <div
                            className="message-content border-radius-10"
                            style={{ width: "478px", backgroundColor: item.userId === userData.id ? "#EFF0F7" : "#65CDF0", padding: "12px 35px" }}
                          >
                            <div className="d-flex justify-between" style={{ marginBottom: "11px" }}>
                              <h6 className="m-0 fs-14 fw-600">{`${item?.user?.firstName} ${item?.user?.lastName}`}</h6>
                              <p className="m-0 fw-400 fs-12">{dayjs(item.createdAt).format("hh:mm a")}</p>
                            </div>
                            <div className="messages">
                              {item?.comment && <p className="m-0 fs-14 fw-600">{item?.comment}</p>}
                              {item?.media && (
                                <>
                                  {handleImageType(item?.media?.mediaMeta?.mimetype) ? (
                                    <div>
                                      <Image
                                        src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${item?.media?.mediaId}.${item?.media?.mediaMeta?.extension}`}
                                        alt="uploaded img"
                                        style={{ objectFit: "cover", borderRadius: "5px" }}
                                        height="100%"
                                        width="100%"
                                      />
                                      <a
                                        href={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${item?.media?.mediaId}.${item?.media?.mediaMeta?.extension}`}
                                        download
                                      >
                                        <p className="m-0 secondary-color" style={{ marginTop: "5px" }}>
                                          {item?.media?.fileName?.length > 10 ? item?.media?.fileName?.substring(0, 10) + '...' : item?.media?.fileName}.{item?.media?.mediaMeta?.extension}
                                          <CloudDownloadOutlined style={{ paddingLeft: '10px', fontSize:'16px' }} />
                                        </p>
                                      </a>
                                    </div>
                                  ) : (
                                    <a
                                      href={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${item?.media?.mediaId}.${item?.media?.mediaMeta?.extension}`}
                                      download
                                    >
                                      <div className="document-file-type cursor-pointer">
                                        <FileProtectOutlined className="document-icon" />
                                        <p className="m-0 secondary-color">
                                          {item?.media?.fileName}.{item?.media?.mediaMeta?.extension}
                                          <CloudDownloadOutlined style={{ paddingLeft: '10px', fontSize:'16px' }} />
                                        </p>
                                      </div>
                                    </a>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <Row style={{ position: "relative" }}>
                <Col className="gutter-row" span={24}>
                  <div className="d-flex justify-center align-center gap form-section">
                    <div style={{ position: "relative", width: "100%", padding: '5px 5px 0px 5px' }}>
                      <div style={{ boxShadow: "inset 0px 0px 5px rgb(0 0 0 / 20%)", borderRadius: "6px", padding: '8px' }}>
                        <form onSubmit={handleSubmit}>
                          <textarea
                            className="chat-message-input custom-scroll"
                            autoComplete="off"
                            onKeyPress={(e: any) => {
                              if (e.key === "Enter" && !e.shiftKey) handleSubmit(e);
                            }}
                            wrap="hard"
                            rows={2}
                            placeholder="Write here"
                            style={{ width: "100%", border: "none ", outline: 'none', resize: 'none' }}
                            name="message"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onFocus={() => setToggleEmoji(false)}
                          />

                        </form>
                        {image.preview &&
                          <div className="d-flex justify-between align-center" style={{ width: 'fit-content', background: '#EFF0F7', padding: '12px 8px', marginTop: '5px', borderRadius: '5px' }}>
                            <p className="m-0 uploaded-file-name">{image?.raw?.name}</p>
                            <img
                              width={10}
                              height={10}
                              src={CrossIcon}
                              alt="CrossIcon"
                              className="cursor-pointer"
                              onClick={() => setImage({ preview: "", raw: "" })} />
                          </div>
                        }
                      </div>
                      <div className="d-flex" style={{ position: "absolute", right: "35px", top: "20px" }}>
                        <div>
                          <label htmlFor="file-input">
                            <img src={UploadChat} alt="Image 1" style={{ marginRight: "10px", cursor: "pointer" }} />
                          </label>
                          <input hidden id="file-input" type="file" accept="image/*" onChange={handleAddImg} />
                        </div>
                        <div style={{ position: "relative" }}>
                          <img src={chatEmoji} alt="Image 2" className="cursor" onClick={() => setToggleEmoji(!toggleEmoji)} />
                          <div className="emoji-div" style={{ zIndex: 10, position: "absolute", top: "-333px", right: "-25px" }}>
                            {toggleEmoji && <Picker onEmojiClick={onEmojiClick} />}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button loading={isLoading} className="btn-secondary cursor" onClick={(e) => handleSubmit(e)}>
                      Send
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </div>
      {toShowAllFiles.isToggle && <ShowAllFilesModal toShowAllFiles={toShowAllFiles} setToShowAllFiles={setToShowAllFiles} commentsImages={commentsImages} commentsDocuments={commentsDocuments} />}
    </>
  );
};

export default ItHelpDeskSupportDashboard;
