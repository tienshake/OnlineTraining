import React from "react";
//material
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./Accordion.module.scss";
import { Box, Stack } from "@mui/material";

const AccordionSection = () => {
  return (
    <Accordion className={styles.accordion}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box className={styles.title}>In which areas do you operate?</Box>
      </AccordionSummary>
      <AccordionDetails className={styles.accordionDetails}>
        <Stack gap={2}>
          <Box className={styles.lecture}>
            <span>
              <img
                src="	https://dreamslms.dreamguystech.com/html/assets/img/icon/play.svg"
                alt=""
              />
              <span>Lecture 1</span>Introduction to the User Experience Course
            </span>
            <span>02:53</span>
          </Box>
          <Box className={styles.lecture}>
            <span>
              <img
                src="	https://dreamslms.dreamguystech.com/html/assets/img/icon/play.svg"
                alt=""
              />
              <span>Lecture 2</span>Introduction to the User Experience Course
            </span>
            <span>02:53</span>
          </Box>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionSection;
