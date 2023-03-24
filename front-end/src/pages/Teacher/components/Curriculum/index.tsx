import React from "react";
import styles from "./Curriculum.module.scss";
import { Box } from "@mui/material";
import { ButtonNext } from "../../../../components/Button";
//material
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
// import { confirmAlert } from "react-confirm-alert";
import AccordionSection from "../../../../components/AccordionSection";
// import ControlPointIcon from "@mui/icons-material/ControlPoint";

const items: any = [
  { id: 0, valueInput: "valu1", linkVideo: "youtbe", save: false },
  { id: 1, valueInput: "valu2", linkVideo: "youtbe", save: false },
  { id: 2, valueInput: "valu3", linkVideo: "youtbe", save: false },
];

const Curriculum = () => {
  const [accordionList, setAccordionList] = React.useState<any>(items);
  const [inputValues, setInputValues] = React.useState<any>({});

  const handleDeleteAccordion = (targetId: number) => {
    setAccordionList(
      accordionList.filter((accordion: any) => accordion.id !== targetId)
    );

    setInputValues((prevValues: any) => {
      const values = { ...prevValues };
      delete values[targetId];
      return values;
    });
  };

  const handleGetAllValues = () => {
    const valuesArr = Object.values(inputValues);
    console.log(valuesArr);
  };

  const onInputChange = (id: number, value: string, link: string) => {
    setInputValues((prevValues: any) => ({
      ...prevValues,
      [id]: { id, titleSection: value },
    }));
  };

  const handleAddAccordion = () => {
    const index = accordionList.length; // Lấy chỉ mục của phần tử mới

    const newAccordion = {
      id: index,
      save: false,
      component: (
        <AccordionSection index={index} onInputChange={onInputChange} />
      ),
    };

    setAccordionList([...accordionList, newAccordion]);
  };

  console.log("inputValues", inputValues);
  return (
    <Box className={styles.container}>
      <Box className={styles.section}>
        <Box className={styles.sectionHeader}>
          <p>My Lecture</p>
          <ButtonNext
            onClick={handleGetAllValues}
            title="get All"
            className={styles.btn}
          />
          <ButtonNext
            onClick={handleAddAccordion}
            title="Add Lecture"
            className={styles.btn}
          />
        </Box>
        <Box className={styles.sectionContent}>
          {accordionList.map((accordion: any) => (
            <div key={accordion.id} className={styles.parent}>
              <DeleteOutlineIcon
                onClick={() => handleDeleteAccordion(accordion.id)}
                className={styles.iconDelete}
              />
              <AccordionSection
                index={accordion.id}
                onInputChange={onInputChange}
                value={accordion.valueInput}
              />
            </div>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Curriculum;
