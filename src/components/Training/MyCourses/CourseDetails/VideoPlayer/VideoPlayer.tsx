import { Progress } from "antd";
import ReactPlayer from "react-player/youtube";

import progressIcon from "../.././../../../assets/icons/training/course-progress.png";
import TextDocument from "../TextDocument/TextDocument";
import { useEffect } from "react";

const VideoPlayer = ({ showDocument, videoToPlay, selectedContentContex }: any) => {

  
  console.log("selectedContentContex fr", selectedContentContex)

  useEffect(() => {
  }, [showDocument])
  

  return (
    <div className="video-player-wrapper">
      {
        selectedContentContex ?
          <>
            <div className="d-flex justify-between align-center">
              <h1 className="title fw-500 fs-16 m-0">
                {selectedContentContex?.lectureTitle}
              </h1>
              <Progress
                type="circle"
                strokeColor={"#65CDF0"}
                trailColor="#D9DBE9"
                size={40}
                format={() => (
                  <img src={progressIcon} alt="progress" width={18} height={20} />
                )}
                percent={20}
              />
            </div>
            {!showDocument && (
              <div className="react-player">
                {/* <ReactPlayer
                className="react-player"
                url={videoToPlay}
                width="100%"
                height="100%"
                controls={true}
              /> */}
                <video
                  src={videoToPlay}
                  controls>

                </video>
              </div>
            )}
              <TextDocument selectedContentContex={selectedContentContex} />
          </> : "No lecture selected"
      }
    </div>
  );
};

export default VideoPlayer;
