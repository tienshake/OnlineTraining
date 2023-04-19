import React from "react";
import { useForm } from "react-hook-form";
import styles from "./Section.module.scss";

//material
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Stack } from "@mui/material";
import Button from "../../../../components/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Input from "../../../../components/Input";
import { SectionType } from "../../../../types";

export interface SectionProps {
  sectionIndex: number;
  section: SectionType;
  setSection: React.Dispatch<React.SetStateAction<SectionType[]>>;
  removeSection: (sectionIndex: number) => void;
  register: ReturnType<typeof useForm>["register"];
  watch: ReturnType<typeof useForm>["watch"];
}

const Section = ({
  sectionIndex,
  section,
  setSection,
  removeSection,
  register,
  watch,
}: SectionProps) => {
  function addLecture() {
    setSection((prevState) => {
      const sections = [...prevState];
      const newLecture = {
        title: "",
        video: "",
      };

      sections[sectionIndex] = {
        ...sections[sectionIndex],
        lectures: [...sections[sectionIndex].lectures, newLecture],
      };
      return sections;
    });
  }

  function removeLecture(lectureIndex: number) {
    setSection((prevState) => {
      const sections = [...prevState];
      sections[sectionIndex].lectures = sections[sectionIndex].lectures.filter(
        (_: any, index: number) => index !== lectureIndex
      );
      return sections;
    });
  }

  function onLectureNameChange(
    event: React.ChangeEvent<HTMLInputElement>,
    lectureIndex: number
  ) {
    const value = event.target.value;
    setSection((prevState) => {
      const sections = [...prevState];
      sections[sectionIndex].lectures[lectureIndex].title = value;
      return sections;
    });
  }

  const handleVideoChange = (event: any, lectureIndex: any) => {
    const { files } = event.target;
    setSection((prevState) => {
      const sections = [...prevState];
      sections[sectionIndex].lectures[lectureIndex].video = files[0];
      return sections;
    });
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>
        <Input
          // style={{ width: "100%" }}
          onClick={(e) => e.stopPropagation()}
          type="text"
          placeholder="Section title"
          defaultValue={section.title}
          onChange={(e: any) => {
            const value = e.target.value;
            setSection((prevState) => {
              const sections = [...prevState];
              sections[sectionIndex].title = value;
              return sections;
            });
          }}
        />
        <DeleteOutlineIcon
          onClick={() => removeSection(sectionIndex)}
          className={styles.iconDelete}
          style={{ fontSize: "29px !important" }}
        />
      </div>

      {section.lectures?.map((lecture, lectureIndex) => (
        <Accordion
          key={lectureIndex}
          className={styles.accordion}
          style={{
            marginBottom: "10px",
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Input
                style={{ width: "60%" }}
                onClick={(e) => e.stopPropagation()}
                type="text"
                placeholder="Lecture name"
                defaultValue={lecture.title}
                onChange={(event: any) =>
                  onLectureNameChange(event, lectureIndex)
                }
              />
              <DeleteOutlineIcon
                onClick={() => removeLecture(lectureIndex)}
                className={styles.iconDeleteLecture}
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails className={styles.accordionDetails}>
            <Stack
              key={lectureIndex}
              direction={"row"}
              paddingBottom={3}
              paddingTop={3}
              gap={3}
              borderBottom="1px solid gray"
            >
              <Input
                name="file"
                onClick={(e) => e.stopPropagation()}
                type="file"
                onChange={(event: any) =>
                  handleVideoChange(event, lectureIndex)
                }
              />
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
      <Stack marginTop={3}>
        <Button
          onClick={addLecture}
          title="  Add Lecture"
          className={styles.btn}
        />
      </Stack>
    </div>
  );
};

export default Section;
