import React from "react";
//material
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./Accordion.module.scss";
import { Box, Stack } from "@mui/material";
import Button from "../Button";
import Input from "../Input";
import YouTube from "react-youtube";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

const opts = {
  height: "200",
  width: "300",
  playerVars: {
    enablejsapi: 1,
    origin: window.location.origin,
    loop: 1,
  },
};

const AccordionSection = ({ index, onInputChange, value }: any) => {
  const [contentList, setContentList] = React.useState<any[]>([]);
  const [openAddLink, setOpenAddLink] = React.useState<boolean>(false);
  const [videoId, setVideoId] = React.useState<any>("");
  const [openVideo, setOpenVideo] = React.useState<boolean>(false);
  const [player, setPlayer] = React.useState<any>();
  const [inputValue, setInputValue] = React.useState("");
  const [inputValueLink, setInputValueLink] = React.useState("");

  // console.log(value);

  const handleChange = (name: string, value: any) => {
    if (name === "title") {
      setInputValue(value);
      onInputChange(index, value);
    } else if (name === "link") {
      setInputValueLink(value);
      handleVideoIdChange(value);
    }
  };

  const handleChangeLink = (e: any) => {
    setInputValueLink(e.target.value);
  };

  const handleVideoIdChange = (e: any) => {
    const inputVal = e.target.value;
    const url = new URL(inputVal);
    const videoId = url.searchParams.get("v");
    setVideoId(videoId);
  };

  const handleSaveVideoPreview = () => {
    if (!videoId) return;
    setOpenVideo(true);
  };

  const onReady = (e: any) => {
    setPlayer(e.target);
    e.target.pauseVideo();
  };

  const onPlayVideo = () => {
    if (player) {
      player.playVideo();
    }
  };

  const handleAddContent = () => {
    const newContent = {
      title: "",
      link: "",
    };
    setContentList([...contentList, newContent]);
  };

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
          <Box className={styles.index}>{index}</Box>
          <Input
            style={{ width: "50%" }}
            onClick={(e) => e.stopPropagation()}
            placeholder="Add title Section"
            variant="outlined"
            name="title"
            value={inputValue}
            onChange={(e: any) => handleChange("title", e.target.value)}
          />
        </Box>
      </AccordionSummary>
      <AccordionDetails className={styles.accordionDetails}>
        <ControlPointIcon className={styles.iconEdit} />
        <Stack gap={2} direction={"row"}>
          {openAddLink ? (
            <>
              <Input
                style={{ width: "20%" }}
                onClick={(e) => e.stopPropagation()}
                placeholder="Link video"
                name="Link"
                onChange={(e: any) => {
                  handleVideoIdChange(e);
                  handleChange("link", e.target.value);
                }}
                value={inputValueLink ? inputValueLink : ""}
              />
              {openVideo ? (
                <YouTube
                  opts={opts}
                  videoId={videoId}
                  onReady={onReady}
                  onPlay={onPlayVideo}
                />
              ) : (
                <Button
                  onClick={handleSaveVideoPreview}
                  title="Show Preview video"
                  className={styles.btn}
                />
              )}
            </>
          ) : (
            <Button
              title="Add link video"
              onClick={() => setOpenAddLink(true)}
              className={styles.btn}
            />
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionSection;
