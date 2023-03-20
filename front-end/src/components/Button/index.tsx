import React from "react";
import { Button as ButtonMUI, ButtonProps } from "@mui/material";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";

interface ButtonPropsType {
  title?: string;
  onClick?: () => void;
  path?: string;
}

const Button = (props: ButtonProps & ButtonPropsType) => {
  const { variant, title, onClick = () => null, path } = props;

  return (
    <Link to={path ? path : ""}>
      <ButtonMUI
        onClick={() => onClick()}
        className={styles.container}
        variant={variant}
      >
        {title}
      </ButtonMUI>
    </Link>
  );
};

export default Button;
