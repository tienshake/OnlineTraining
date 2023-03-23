import React from "react";
//material
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import styles from "./Accordion.module.scss";
import { Box, Stack } from "@mui/material";
import Button from "../Button";
import Input from "../Input";
import MenuIcon from "@mui/icons-material/Menu";

const AccordionSection = ({ myProps }: any) => {
  console.log(myProps);
  return (
    <Accordion className={styles.accordion}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <MenuIcon style={{ cursor: "pointer" }} />
          <Input
            style={{ width: "50%" }}
            onClick={(e) => e.stopPropagation()}
            placeholder="Add title Section"
          />
        </Box>
        <Stack
          direction={"row"}
          gap={2}
          alignItems={"center"}
          width={"80px"}
          paddingLeft={2}
        >
          <DriveFileRenameOutlineIcon
            onClick={(e) => e.stopPropagation()}
            className={styles.icon}
          />
          <DeleteOutlineIcon
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={styles.icon}
          />
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack gap={2} direction={"row"}>
          <Input
            style={{ width: "30%" }}
            onClick={(e) => e.stopPropagation()}
            placeholder="Title course content"
          />
          {/* <Button title="Add title" className={styles.btn} /> */}
          <Button title="Add link video" className={styles.btn} />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionSection;
