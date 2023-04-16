import clsx from "clsx";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import styles from "./VideoPlayer.module.scss";

const opts = {
  // height: "80%",
  // width: "80%",
  playerVars: {
    enablejsapi: 1,
    origin: window.location.origin,
    loop: 1,
  },
};

const VideoPlayer = ({ className, sectionData, dataSection }: any) => {
  const [currentVideo, setCurrentVideo] = useState<any>();

  useEffect(() => {
    if (dataSection && dataSection.length > 0) {
      setCurrentVideo(dataSection[0]?.lectures[0]);
    }
    // setCurrentVideo()
  }, [dataSection]);

  const onReady = (e: any) => {
    e.target.pauseVideo();
  };

  return (
    <div className={clsx(className, styles.container)}>
      <div className={styles.videoContent}>
        <YouTube
          className={styles.video}
          videoId={sectionData ? sectionData?.video.split("v=")[1] : ""}
          opts={opts}
          onReady={onReady}
        />
      </div>
      <div className={styles.contentTitle}>
        <h1>{sectionData ? sectionData?.title : currentVideo?.title}</h1>
        {/* <p>Cập nhật tháng 2 năm 2022</p> */}
        <p>
          Join the Learn programming group at on Facebook to discuss the
          learning process together ❤️
        </p>
        <p>
          Please subscribe to the Official Youtube channel to receive
          notifications when there are new lessons ❤️
        </p>
      </div>
    </div>
  );
};

export default VideoPlayer;
