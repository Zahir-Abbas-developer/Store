import { Image, Modal } from 'antd'
import { CloudDownloadOutlined, FileProtectOutlined } from '@ant-design/icons';
import CrossIcon from "../../../../../../assets/icons/ManageUser/cross-icon.svg";
import './ShowAllFilesModal.scss'

const ShowAllFilesModal = ({ setToShowAllFiles, toShowAllFiles, commentsDocuments, commentsImages }: any) => {
  return (
    <Modal
      title={<span style={{ fontWeight: "600px", fontSize: "18px", color: "#6E7191" }}>{toShowAllFiles.type === 'img' ? 'All Images' : 'All Documents'}</span>}
      width={890}
      centered
      footer={null}
      open={toShowAllFiles?.isToggle}
      onCancel={() => setToShowAllFiles({ isToggle: false, type: "" })}
      closeIcon={<img src={CrossIcon} alt="CrossIcon" height={16} width={16} />}
    >
      <div className='d-flex showAllModal' style={{ flexWrap: 'wrap', marginBlock: '2rem', height: '45rem', overflowY: 'scroll' }}>
        {toShowAllFiles.type === 'img' && commentsImages.map((item: any) =>
          <div style={{ marginRight: '10px', marginBottom: '10px' }}>
            <Image
              src={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${item?.media?.mediaId}.${item?.media?.mediaMeta?.extension}`}
              style={{ objectFit: "cover", borderRadius: "5px" }}
              alt="uploaded img"
              height="12rem"
              width="12rem"
            />
            <a
              href={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${item?.media?.mediaId}.${item?.media?.mediaMeta?.extension}`}
              download
            >
              <p className="m-0">
                {item?.media?.fileName?.length > 10 ? item?.media?.fileName?.substring(0, 10) + '...' : item?.media?.fileName}.{item?.media?.mediaMeta?.extension}
                <CloudDownloadOutlined style={{ paddingLeft: '10px', fontSize: '16px' }} />
              </p>
            </a>
          </div>
        )} 
        {toShowAllFiles.type === 'docs' && commentsDocuments.map((item: any) =>

          <div style={{ marginRight: '10px', marginBottom: '10px' }}>
            <a
              href={`https://rnd-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${item?.media?.mediaId}.${item?.media?.mediaMeta?.extension}`}
              download
            >
              <div className="document-file-type cursor-pointer">
                <FileProtectOutlined className="document-icon" />
                <p className="m-0 secondary-color">
                  {item?.media?.fileName}.{item?.media?.mediaMeta?.extension}
                  <CloudDownloadOutlined style={{ paddingLeft: '10px', fontSize: '16px' }} />
                </p>
              </div>
            </a>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default ShowAllFilesModal
