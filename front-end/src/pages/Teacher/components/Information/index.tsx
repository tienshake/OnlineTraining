import React from "react";
import styles from "./Information.module.scss";
import { Box, Stack } from "@mui/material";
import Input from "../../../../components/Input";
import SelectInput from "../../../../components/SelectInput";
import Editor from "../../../../components/Editor";

const Information = () => {
  const [courseTitle, setCourseTitle] = React.useState("");

  const handleSelectChange = (selectedValue: number | undefined) => {
    console.log(selectedValue);
    // do something with selected value
  };

  const handleOnchangeMarkdown = (data: any) => {
    console.log(data);
  };

  return (
    <Box className={styles.container}>
      <h4>Basic Information</h4>
      <Stack paddingBottom={3} gap={1}>
        <label>Course Title</label>
        <Input
          variant="outlined"
          placeholder="Course Title"
          onChange={(e: any) => setCourseTitle(e.target.value)}
        />
      </Stack>
      <Stack paddingBottom={3} gap={1}>
        <label>Course Category</label>
        <SelectInput
          arrSelect={[
            { id: 1, title: "Option 1" },
            { id: 2, title: "Option 2" },
            { id: 3, title: "Option 3" },
          ]}
          onChange={handleSelectChange}
        />
      </Stack>
      <Stack paddingBottom={3} gap={1}>
        <label>Description</label>
        <Editor handleOnChange={handleOnchangeMarkdown} />
        {/* <Input placeholder="Courses Level" /> */}
      </Stack>
    </Box>
  );
};

export default Information;
