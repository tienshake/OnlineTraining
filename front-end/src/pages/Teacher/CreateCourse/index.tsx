import React from "react";
import styles from "./CreateCourse.module.scss";
import { Box, Stack } from "@mui/material";
import { ButtonSave, ButtonBack, ButtonNext } from "../../../components/Button";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import clsx from "clsx";
import Information from "../components/Information";
import Course from "../components/Course";
import Curriculum from "../components/Curriculum";
import Setting from "../components/Setting";
import {
  INFO,
  COURSE,
  CURRICULUM,
  SETTING,
  PROGRESS_ARR,
  START,
  PENDING,
  ACTIVE,
} from "../../../constants/constants";
import CurriculumClone from "../components/Section";
import CourseForm from "../components/CourseForm";

interface courseDescriptionsType {
  html?: any;
  text?: string;
}

interface avatarType {
  previewImg: any;
  thumbnail: any;
  fileName: any;
}

export interface CreateCourseType {
  courseTitle?: string;
  courseCategory?: string;
  courseDescriptions?: courseDescriptionsType;
  avatar?: avatarType;
}

function CreateCourse() {
  const [formValues, setFormValues] = React.useState<CreateCourseType>({
    courseTitle: "",
    courseCategory: "",
    courseDescriptions: {
      html: "",
      text: "",
    },
    avatar: {
      previewImg: "",
      thumbnail: "",
      fileName: "",
    },
  });

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [component, setComponent] = React.useState<any>();

  // console.log("formValues", formValues);

  const switchComponent = (id: string) => {
    switch (id) {
      case INFO:
        setComponent(
          <Information setFormValues={setFormValues} formValues={formValues} />
        );
        break;
      case COURSE:
        setComponent(
          <Course setFormValues={setFormValues} formValues={formValues} />
        );
        break;
      case CURRICULUM:
        setComponent(<CourseForm />);
        break;
      case SETTING:
        setComponent(<Setting />);
        break;
      default:
        break;
    }
  };

  const handleNextClick = () => {
    // Increase index
    const nextIndex = activeIndex + 1;
    const updatedProgressArr = [...PROGRESS_ARR];

    if (nextIndex >= PROGRESS_ARR.length) return;

    //switchComponent with click
    switchComponent(PROGRESS_ARR[activeIndex + 1]?.id);
    // Change status in object of PROGRESS_ARR
    updatedProgressArr[activeIndex].status = ACTIVE;
    updatedProgressArr[nextIndex].status = PENDING;

    setActiveIndex(nextIndex);
  };

  const handleBackClick = () => {
    // decrease index
    const prevIndex = activeIndex - 1;
    const updatedProgressArr = [...PROGRESS_ARR];

    if (prevIndex < 0) return;

    //switchComponent with click
    switchComponent(PROGRESS_ARR[activeIndex - 1]?.id);
    // Change status in object of PROGRESS_ARR
    updatedProgressArr[activeIndex].status = START;
    updatedProgressArr[prevIndex].status = PENDING;

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
            {PROGRESS_ARR &&
              PROGRESS_ARR.map((item) => (
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
        <Box className={styles.contentForm}>
          {component ? (
            React.cloneElement(component, { setFormValues, formValues })
          ) : (
            <Information
              setFormValues={setFormValues}
              formValues={formValues}
            />
          )}
        </Box>
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
