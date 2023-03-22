import React from "react";
import styles from "./Information.module.scss";
import { Box, Stack } from "@mui/material";
import Input from "../../../../components/Input";
import SelectInput from "../../../../components/SelectInput";

const Information = () => {
  const handleOnchangeSelect = (select: any) => {};

  return (
    <Box className={styles.container}>
      <h4>Basic Information</h4>
      <Stack paddingBottom={3} gap={1}>
        <label>Course Title</label>
        <Input placeholder="Course Title" />
      </Stack>
      <Stack paddingBottom={3} gap={1}>
        <label>Course Category</label>
        <SelectInput
          onChange={handleOnchangeSelect}
          arrSelect={[
            { title: "Tien tran", id: 1 },
            { title: "Tien tran", id: 2 },
            { title: "Tien tran", id: 3 },
          ]}
        />
      </Stack>
      <Stack paddingBottom={3} gap={1}>
        <label>Courses Level</label>
        <Input placeholder="Courses Level" />
      </Stack>
    </Box>
  );
};

export default Information;
