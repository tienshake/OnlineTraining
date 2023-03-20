import React from "react";
import styles from "./CreateCourse.module.scss";
import { Box, Stack } from "@mui/material";
import { ButtonSave, ButtonBack, ButtonNext } from "../../../components/Button";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import clsx from "clsx";

const progressArr = [
  { id: "info", title: "Basic information", status: "active" },
  { id: "course", title: "Basic information", status: "pending" },
  { id: "cur", title: "Basic information", status: "start" },
  { id: "set", title: "Basic information", status: "start" },
];

function CreateCourse() {
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
        <Box className={styles.contentForm}></Box>
        <Stack
          direction="row"
          gap={2}
          justifyContent="space-between"
          className={styles.footerControl}
        >
          <ButtonBack title="Back" />
          <ButtonNext title="Continue" />
        </Stack>
      </Box>
    </Box>
  );
}

export default CreateCourse;
