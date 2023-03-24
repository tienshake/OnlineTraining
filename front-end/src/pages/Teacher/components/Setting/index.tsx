import React from "react";
import styles from "./Setting.module.scss";
import Input from "../../../../components/Input";
import { Box, Stack } from "@mui/material";

const Settings = () => {
  return (
    <Box className={styles.container}>
      <h4>Requirements</h4>
      <Stack paddingBottom={3} gap={1}>
        <label>Price</label>
        <Input placeholder="Price" />
      </Stack>
      <Stack paddingBottom={3} gap={1}>
        <label>Promotion Price</label>
        <Input placeholder="Promotion Price" />
      </Stack>
    </Box>
  );
};

export default Settings;
