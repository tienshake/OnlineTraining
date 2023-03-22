import React from "react";
import styles from "./Course.module.scss";
import { Box, Stack } from "@mui/material";
import { ReactComponent as ImageRegular } from "../../../../assets/icons/image-regular.svg";
import CommonUtils from "../../../../utils/CommonUtils";

interface ImgType {
  previewImg?: any;
  thumbnail?: any;
  fileName?: string;
}

const Course = () => {
  const [image, setImage] = React.useState<ImgType>();

  const handleOnchangeImg = async (e: any) => {
    const data = e.target.files;
    const file = data[0];

    if (file) {
      const b64 = await CommonUtils.getBase64(file);
      const objectUrl = URL.createObjectURL(file);
      setImage({
        previewImg: objectUrl,
        thumbnail: b64,
        fileName: file.name,
      });
    }
  };

  return (
    <Box className={styles.container}>
      <h4>Courses Media</h4>
      <Stack paddingBottom={3} gap={3}>
        <label>Course cover image</label>
        <Box className={styles.addContain}>
          {image?.fileName ? image?.fileName : "No File Selected"}
          <label className={styles.relativeFileUpload}>
            Upload File
            <input type="file" hidden onChange={(e) => handleOnchangeImg(e)} />
          </label>
        </Box>
        <Box className={styles.imgContain}>
          <div className={styles.imgBox}>
            {image?.previewImg ? (
              <img
                className={styles.image}
                src={image?.previewImg}
                alt="Thumbnail"
              />
            ) : (
              <ImageRegular className={styles.imageRegular} />
            )}
          </div>
        </Box>
      </Stack>
    </Box>
  );
};

export default Course;
