import React from "react";
import { Select, SelectProps, MenuItem } from "@mui/material";
import styles from "./SelectInput.module.scss";
import clsx from "clsx";

interface arrSelect {
  id: number;
  title: string;
}

interface SelectPropsType {
  onChange?: any;
  className?: string;
  arrSelect: arrSelect[];
}

const SelectInput = (props: SelectPropsType & SelectProps) => {
  const { onChange, className, arrSelect } = props;
  const [select, setSelect] = React.useState(
    arrSelect.length > 0 ? arrSelect[0].title : ""
  );

  const handleOnchange = (e: any) => {
    setSelect(e.target.value);
    onChange(e.target.value);
  };

  return (
    <Select
      className={clsx(styles.selectInput, className)}
      {...props}
      onChange={handleOnchange}
      value={select}
    >
      {arrSelect?.map((item, i) => (
        <MenuItem key={i} value={item.title}>
          {item.title}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectInput;
