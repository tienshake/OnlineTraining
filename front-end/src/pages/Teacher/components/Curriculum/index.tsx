import React from "react";
import styles from "./Curriculum.module.scss";
import { Box, Stack } from "@mui/material";
import Button, { ButtonNext } from "../../../../components/Button";
//material
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Input from "../../../../components/Input";
// import { confirmAlert } from "react-confirm-alert";
import MenuIcon from "@mui/icons-material/Menu";

const Curriculum = () => {
  const [accordionList, setAccordionList] = React.useState<any>([]);

  React.useEffect(() => {
    handleAddAccordion();
  }, []);

  const handleDeleteAccordion = (targetId: number) => {
    setAccordionList(
      accordionList.filter((accordion: any) => accordion.id !== targetId)
    );
  };

  const handleAddAccordion = () => {
    const index = accordionList.length; // Lấy chỉ mục của phần tử mới

    const newAccordion = {
      id: index,
      component: (
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
                value={index}
                style={{ width: "50%" }}
                onClick={(e) => e.stopPropagation()}
                placeholder="Add title Section"
              />
            </Box>
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
      ),
    };

    setAccordionList([...accordionList, newAccordion]);
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.section}>
        <Box className={styles.sectionHeader}>
          <p>My Lecture</p>
          <ButtonNext
            onClick={handleAddAccordion}
            title="Add Lecture"
            className={styles.btn}
          />
        </Box>
        <Box className={styles.sectionContent}>
          {accordionList.map((accordion: any) => (
            <div key={accordion.id} className={styles.parent}>
              <DriveFileRenameOutlineIcon className={styles.iconEdit} />
              <DeleteOutlineIcon
                onClick={() => handleDeleteAccordion(accordion.id)}
                className={styles.iconDelete}
              />
              {accordion.component}
            </div>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Curriculum;
