import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import styles from "./Input.module.scss";
import clsx from "clsx";

interface InputProps {
  onChange?: () => void;
  className?: string;
}

const Input = (props: InputProps & TextFieldProps) => {
  const { onChange, className } = props;
  return (
    <TextField
      {...props}
      onChange={onChange}
      className={clsx(styles.Input, className)}
    />
  );
};

export default Input;
