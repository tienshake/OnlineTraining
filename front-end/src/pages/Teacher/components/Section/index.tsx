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
import YouTube from "react-youtube";
import { SectionType } from "../../../../types";

const opts = {
  height: "200",
  width: "300",
  playerVars: {
    enablejsapi: 1,
    origin: window.location.origin,
    loop: 1,
  },
};

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
  const [videoPlayer, setVideoPlayer] = React.useState<any>();

  function addLecture() {
    setSection((prevState) => {
      const sections = [...prevState];
      const newLecture = {
        name: "",
        videoLink: "",
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
      sections[sectionIndex].lectures[lectureIndex].name = value;
      return sections;
    });
  }

  function onLectureVideoLinkChange(
    event: React.ChangeEvent<HTMLInputElement>,
    lectureIndex: number
  ) {
    const value = event.target.value;
    setSection((prevState) => {
      const sections = [...prevState];
      sections[sectionIndex].lectures[lectureIndex].videoLink = value;
      return sections;
    });
  }

  const onReady = (e: any) => {
    e.target.pauseVideo();
    setVideoPlayer(e.target);
    console.log(videoPlayer && videoPlayer.getDuration());
  };

  return (
    <Accordion
      className={styles.accordion}
      style={{
        marginBottom: "10px",
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box
          style={{
            width: "30%",
          }}
        >
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
          />
        </Box>
      </AccordionSummary>
      <AccordionDetails className={styles.accordionDetails}>
        {section.lectures?.map((lecture, lectureIndex) => (
          <Stack
            key={lectureIndex}
            direction={"row"}
            paddingBottom={3}
            paddingTop={3}
            gap={3}
            borderBottom="1px solid gray"
          >
            <Input
              style={{ width: "20%" }}
              onClick={(e) => e.stopPropagation()}
              type="text"
              placeholder="Lecture name"
              defaultValue={lecture.name}
              onChange={(event: any) =>
                onLectureNameChange(event, lectureIndex)
              }
            />
            <Input
              style={{ width: "20%" }}
              onClick={(e) => e.stopPropagation()}
              type="text"
              placeholder="Lecture video link"
              defaultValue={lecture.videoLink}
              onChange={(event: any) =>
                onLectureVideoLinkChange(event, lectureIndex)
              }
            />
            {lecture.videoLink && (
              <YouTube
                videoId={lecture.videoLink.split("v=")[1]}
                opts={opts}
                onReady={onReady}
              />
            )}
            <DeleteOutlineIcon
              onClick={() => removeLecture(lectureIndex)}
              className={styles.iconDeleteLecture}
            />
          </Stack>
        ))}

        <Stack marginTop={3}>
          <Button
            onClick={addLecture}
            title="  Add Lecture"
            className={styles.btn}
          />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default Section;
