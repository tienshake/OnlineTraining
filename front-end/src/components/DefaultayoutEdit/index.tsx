import React from "react";
import styles from "./DefaultLayoutEdit.module.scss";
import { Box, Stack } from "@mui/material";

interface LayoutEditProps {
  children?: any;
  titleHeader?: string;
  textHeader?: string;
}

const DefaultLayoutEdit = ({
  children,
  titleHeader,
  textHeader,
}: LayoutEditProps) => {
  return (
    <Box className={styles.container}>
      <Stack className={styles.header}>
        <h4>{titleHeader}</h4>
        <p>{textHeader}</p>
      </Stack>
      {children}
    </Box>
  );
};

export default DefaultLayoutEdit;
