import React from "react";
import { Button as ButtonMUI, ButtonProps } from "@mui/material";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";
import clsx from "clsx";
interface ButtonPropsType {
  title?: string;
  onClick?: () => void;
  path?: string;
  circle?: boolean;
  className?: string;
}

const Button = (props: ButtonProps & ButtonPropsType) => {
  const {
    variant,
    title,
    onClick = () => null,
    path,
    circle = false,
    className,
  } = props;

  return (
    <Link to={path ? path : ""}>
      <ButtonMUI
        style={{ borderRadius: circle ? "50px" : "" }}
        onClick={() => onClick()}
        className={clsx(styles.container, className)}
        variant={variant}
      >
        {title}
      </ButtonMUI>
    </Link>
  );
};

const ButtonSave = (props: ButtonProps & ButtonPropsType) => {
  return <Button {...props} className={styles.buttonSave} />;
};

const ButtonBack = (props: ButtonProps & ButtonPropsType) => {
  return <Button {...props} className={styles.buttonBack} />;
};

const ButtonNext = (props: ButtonProps & ButtonPropsType) => {
  return <Button {...props} className={styles.buttonNext} />;
};

export { ButtonSave, ButtonBack, ButtonNext };

export default Button;
