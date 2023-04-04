import React, { useState } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import styles from "./Input.module.scss";
import clsx from "clsx";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@material-ui/core";

interface InputProps {
  onChange?: any;
  className?: string;
  type?: string;
}

const Input = (props: InputProps & TextFieldProps) => {
  const { onChange, className, type = "", ...rest } = props;

  const [inputType, setInputType] = useState<string>(type);

  const handleClickShowPassword = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <TextField
      {...rest}
      onChange={onChange}
      className={clsx(styles.Input, className)}
      type={inputType}
      InputProps={{
        endAdornment: type === "password" && (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {inputType === "password" ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Input;
