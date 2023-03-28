import React from "react";
import { Box, Stack } from "@mui/material";
import styles from "./EditProfile.module.scss";
import { ButtonDelete, ButtonSave } from "../Button";
import Input from "../Input";
import SelectInput from "../SelectInput";
import { title } from "process";

const EditProfile = () => {
  return (
    <Box className={styles.container}>
      <Stack className={styles.header}>
        <h4>Profile Details</h4>
        <p>You have full control to manage your own account setting.</p>
      </Stack>
      <Stack className={styles.info}>
        <Box className={styles.infoLeft}>
          <img
            className={styles.avatar}
            src="https://dreamslms.dreamguystech.com/html/assets/img/user/user11.jpg"
            alt=""
          />
          <Box>
            <h4>Your avatar</h4>
            <p>PNG or JPG no bigger than 800px wide and tall.</p>
          </Box>
        </Box>
        <Box className={styles.infoRight}>
          <ButtonSave title="Update" outline />
          <ButtonDelete title="Delete" outline />
        </Box>
      </Stack>
      <Stack className={styles.form}>
        <h4>Personal Details</h4>
        <p>Edit your personal information and address.</p>
        <Box className={styles.formControl}>
          <Box className={styles.formInput}>
            <label>Name</label>
            <Input placeholder="Enter Your Name" />
          </Box>
          <Box className={styles.formInput}>
            <label>Phone Number</label>
            <Input placeholder="Enter Your Phone Number" />
          </Box>
          <Box className={styles.formInput}>
            <label>Address</label>
            <Input placeholder="Enter Your Address" />
          </Box>
          <Box className={styles.formInput}>
            <label>About me</label>
            <Input placeholder="Enter Your About me" />
          </Box>
          <Box className={styles.formInput}>
            <label>Experience</label>
            <Input placeholder="Enter Your Experience" />
          </Box>
          <Box className={styles.formInput}>
            <label>Education</label>
            <Input placeholder="Enter Your className" />
          </Box>
          <Box className={styles.formInput}>
            <label>Age</label>
            <Input placeholder="Enter Your Age" type="number" />
          </Box>
          <Box className={styles.formInput}>
            <label>Gender</label>
            <SelectInput
              arrSelect={[
                {
                  id: 1,
                  title: "male",
                },
                {
                  id: 2,
                  title: "Female",
                },
              ]}
              onChange={() => {}}
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default EditProfile;
