import styles from "./Information.module.scss";
import { Box, Stack } from "@mui/material";
import Input from "../../../../components/Input";
import SelectInput from "../../../../components/SelectInput";
import Editor from "../../../../components/Editor";

const Information = ({ setFormValues, formValues }: any) => {
  const handleSelectChange = (selectedValue: number | undefined) => {
    // do something with selected value
    setFormValues((prevValues: any) => ({
      ...prevValues,
      courseCategory: selectedValue,
    }));
  };

  const handleOnchangeMarkdown = (data: any) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      courseDescriptions: data,
    }));
  };

  const handleOnchangeInput = (e: any) => {
    const { name, value } = e.target;
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <Box className={styles.container}>
      <h4>Basic Information</h4>
      <Stack paddingBottom={3} gap={1}>
        <label>Course Title</label>
        <Input
          variant="outlined"
          placeholder="Course Title"
          onChange={handleOnchangeInput}
          name="courseTitle"
          value={formValues.courseTitle}
        />
      </Stack>
      <Stack paddingBottom={3} gap={1}>
        <label>Course Category</label>
        <SelectInput
          value={formValues.courseCategory}
          arrSelect={formValues.courseCategoryArray}
          onChange={handleSelectChange}
        />
      </Stack>
      <Stack paddingBottom={3} gap={1}>
        <label>Description</label>
        <Editor
          handleOnChange={handleOnchangeMarkdown}
          value={formValues.courseDescriptions}
        />
      </Stack>
    </Box>
  );
};

export default Information;
