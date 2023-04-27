import React, { useState } from "react";
import styles from "./Setting.module.scss";
import Input from "../../../../components/Input";
import { Box, Stack } from "@mui/material";

const Settings = ({ setFormValues, formValues }: any) => {
  const handleOnchangeInput = (e: any) => {
    const { name, value } = e.target;
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <Box className={styles.container}>
      <h4>Requirements</h4>
      <Stack paddingBottom={3} gap={1}>
        <label>Price</label>
        <Input
          onChange={handleOnchangeInput}
          value={formValues.price}
          type="number"
          placeholder="Price"
          name="price"
        />
      </Stack>
      <Stack paddingBottom={3} gap={1}>
        <label>Promotion Price</label>
        <Input
          onChange={handleOnchangeInput}
          value={formValues.promotion_price}
          placeholder="Promotion Price"
          name="promotion_price"
        />
      </Stack>
    </Box>
  );
};

export default Settings;
