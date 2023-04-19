import React from "react";
import styles from "./Course.module.scss";
import { Box, Stack } from "@mui/material";
import { ReactComponent as ImageRegular } from "../../../../assets/icons/image-regular.svg";
import CommonUtils from "../../../../utils/CommonUtils";

// interface ImgType {
//   previewImg?: any;
//   thumbnail?: any;
//   fileName?: string;
// }

const CourseImg = ({ setFormValues, formValues }: any) => {
  // const [image, setImage] = React.useState<ImgType>();

  const handleOnchangeImg = async (e: any) => {
    const data = e.target.files;
    const file = data[0];

    if (file) {
      const b64 = await CommonUtils.getBase64(file);
      const objectUrl = URL.createObjectURL(file);
      // console.log("b64", b64);
      setFormValues((prevValues: any) => ({
        ...prevValues,
        avatar: {
          previewImg: objectUrl,
          thumbnail: b64,
          fileName: file.name,
        },
      }));
    }
  };

  return (
    <Box className={styles.container}>
      <h4>Courses Media</h4>
      <Stack paddingBottom={3} gap={3}>
        <label>Course cover</label>
        <Box className={styles.addContain}>
          {formValues.avatar?.fileName
            ? formValues.avatar?.fileName
            : "No File Selected"}
          <label className={styles.relativeFileUpload}>
            Upload File
            <input type="file" hidden onChange={(e) => handleOnchangeImg(e)} />
          </label>
        </Box>
        <Box className={styles.imgContain}>
          <div className={styles.imgBox}>
            {formValues.avatar?.previewImg ? (
              <img
                className={styles.image}
                src={formValues.avatar?.previewImg}
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

export default CourseImg;
