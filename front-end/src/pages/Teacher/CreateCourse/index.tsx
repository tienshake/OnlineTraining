import React from "react";
import styles from "./CreateCourse.module.scss";
import { Box, Stack } from "@mui/material";
import { ButtonSave, ButtonBack, ButtonNext } from "../../../components/Button";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import clsx from "clsx";
import Information from "./components/Information";
import Course from "./components/Course";

const progressArr = [
  { id: "info", title: "Basic information", status: "pending" },
  { id: "course", title: "Basic information", status: "start" },
  { id: "cur", title: "Basic information", status: "start" },
  { id: "set", title: "Basic information", status: "start" },
];

function CreateCourse() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [component, setComponent] = React.useState(<Information />);

  const handleNextClick = () => {
    // switch (key) {
    //   case "info":
    //     setComponent(Information)
    //     break;
    //     case "course":
    //       setComponent(Course)
    //       break;
    //   default:
    //     break;
    // }

    // Increase index
    const nextIndex = activeIndex + 1;
    const updatedProgressArr = [...progressArr];

    if (nextIndex >= progressArr.length) {
      return;
    }

    // Change status in object of progressArr
    updatedProgressArr[activeIndex].status = "active";
    updatedProgressArr[nextIndex].status = "pending";

    setActiveIndex(nextIndex);
  };

  const handleBackClick = () => {
    // decrease index
    const prevIndex = activeIndex - 1;
    const updatedProgressArr = [...progressArr];
    if (prevIndex < 0) {
      return;
    }

    // Change status in object of progressArr
    updatedProgressArr[activeIndex].status = "start";
    updatedProgressArr[prevIndex].status = "pending";

    setActiveIndex(prevIndex);
  };

  return (
    <Box className={styles.container}>
      <Stack
        className={styles.headerControl}
        direction="row"
        justifyContent="space-between"
      >
        <h1 className={styles.title}>Add New Course</h1>
        <Stack direction="row" gap={2}>
          <ButtonBack title="Back To Course" />
          <ButtonSave title="Save" />
        </Stack>
      </Stack>
      <Box className={styles.content}>
        <Box className={styles.progressContainer}>
          <ul className={styles.progressbar}>
            {progressArr &&
              progressArr?.map((item) => (
                <li className={styles.progressItem} key={item.id}>
                  <span
                    className={clsx(
                      item.status !== "start"
                        ? styles.progress
                        : styles.progressActive
                    )}
                  />
                  <span className={styles.progressTitle}>
                    {item.status === "active" ? (
                      <CheckCircleIcon className={styles.icon} />
                    ) : item.status === "pending" ? (
                      <TripOriginIcon className={styles.icon} />
                    ) : (
                      <PanoramaFishEyeIcon className={styles.iconPanorama} />
                    )}
                    {item.title}
                  </span>
                </li>
              ))}
          </ul>
        </Box>
        <Box className={styles.contentForm}>{component}</Box>
        <Stack
          direction="row"
          gap={2}
          justifyContent="space-between"
          className={styles.footerControl}
        >
          <ButtonBack title="Back" onClick={handleBackClick} />
          <ButtonNext title="Continue" onClick={handleNextClick} />
        </Stack>
      </Box>
    </Box>
  );
}

export default CreateCourse;
