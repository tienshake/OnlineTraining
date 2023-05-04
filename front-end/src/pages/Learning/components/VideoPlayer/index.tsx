import clsx from "clsx";
import React, { useEffect, useState } from "react";
import styles from "./VideoPlayer.module.scss";

const VideoPlayer = ({ className, sectionData }: any) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [sectionData]);

  return (
    <div className={clsx(className, styles.container)}>
      <div className={styles.videoContent}>
        {sectionData && sectionData.filename ? (
          <video key={key} controls autoPlay width={"100%"}>
            <source
              src={`https://nodejs-deploy-n9mo.onrender.com/video/get/${sectionData?.filename}`}
              type="video/mp4"
            ></source>
          </video>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: " center",
              color: "white",
            }}
          >
            <h1>Welcome to Course ❤️</h1>
          </div>
        )}
      </div>
      <div className={styles.contentTitle}>
        <h1>{sectionData && sectionData?.title}</h1>
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
