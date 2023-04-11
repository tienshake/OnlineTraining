import { Button as ButtonMUI, ButtonProps } from "@mui/material";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";
import clsx from "clsx";
interface ButtonPropsType {
  title?: string;
  onClick?: () => void;
  path?: string;
  href?: string;
  circle?: boolean;
  className?: string;
  outline?: boolean;
  hoverCardChangeTextColor?: boolean;
  to?: string;
}

const Button = (props: ButtonProps & ButtonPropsType) => {
  const {
    variant,
    title,
    onClick = () => null,
    path,
    href,
    circle = false,
    className,
  } = props;

  const RenderLink = !href ? Link : "a";

  return (
    <RenderLink to={path ? path : ""} href={href ? href : ""}>
      <ButtonMUI
        style={{
          color: `${props.hoverCardChangeTextColor ? "#fff" : "#392C7D"}`,
          borderRadius: circle ? "50px" : "",
        }}
        onClick={() => onClick()}
        className={clsx(styles.container, className)}
        variant={variant}
      >
        {title}
      </ButtonMUI>
    </RenderLink>
  );
};

const ButtonSave = (props: ButtonProps & ButtonPropsType) => {
  return (
    <Button
      {...props}
      className={clsx(
        styles.buttonSave,
        props.outline && styles.outLineSave,
        props.className
      )}
    />
  );
};

const ButtonBack = (props: ButtonProps & ButtonPropsType) => {
  return <Button {...props} className={styles.buttonBack} />;
};

const ButtonNext = (props: ButtonProps & ButtonPropsType) => {
  return (
    <Button {...props} className={clsx(styles.buttonNext, props.className)} />
  );
};

const ButtonDelete = (props: ButtonProps & ButtonPropsType) => {
  return (
    <Button
      {...props}
      className={clsx(
        styles.buttonDelete,
        props.outline && styles.outLineDelete,
        props.className
      )}
    />
  );
};

export { ButtonSave, ButtonBack, ButtonNext, ButtonDelete };

export default Button;
