import React from "react";
//material
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./Accordion.module.scss";
import { Box, Stack } from "@mui/material";
// import moment from "moment";

const AccordionSection = ({ section }: any) => {
  return (
    <Accordion className={styles.accordion}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box className={styles.title}>{section?.title}</Box>
      </AccordionSummary>
      <AccordionDetails className={styles.accordionDetails}>
        <Stack gap={2}>
          {section?.lectures?.map((lecture: any, index: any) => (
            <Box className={styles.lecture} key={index}>
              <span>
                <img
                  src="	https://dreamslms.dreamguystech.com/html/assets/img/icon/play.svg"
                  alt=""
                />
                <span>Lecture {index + 1}</span>
                {lecture?.title}
              </span>
              <span>02:53</span>
            </Box>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionSection;
