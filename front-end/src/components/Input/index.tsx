import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import styles from "./Input.module.scss";
import clsx from "clsx";

interface InputProps {
  onChange?: any;
  className?: string;
}

const Input = (props: InputProps & TextFieldProps) => {
  const { onChange, className, ...rest } = props;
  return (
    <TextField
      {...rest}
      onChange={onChange}
      className={clsx(styles.Input, className)}
    />
  );
};

export default Input;
