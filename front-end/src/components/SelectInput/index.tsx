import React, { useEffect } from "react";
import { Select, MenuItem } from "@mui/material";
import styles from "./SelectInput.module.scss";
import clsx from "clsx";

interface arrSelect {
  id: number;
  title: string;
}

interface SelectInputProps {
  onChange: (select: number | undefined) => void;
  className?: string;
  arrSelect: arrSelect[];
  value?: number;
}

const SelectInput = (props: SelectInputProps) => {
  const { onChange, className, arrSelect, value, ...rest } = props;
  const [select, setSelect] = React.useState("");

  useEffect(() => {
    setSelect(arrSelect?.length > 0 ? arrSelect[0].title : "");
  }, [arrSelect]);

  const handleOnchange = (e: any) => {
    const selectedId = arrSelect.find(
      (item) => item.title === e.target.value
    )?.id;
    setSelect(e.target.value);
    if (onChange) {
      onChange(selectedId);
    }
  };

  return (
    <Select
      {...rest}
      className={clsx(styles.selectInput, className)}
      onChange={handleOnchange}
      MenuProps={{ disableScrollLock: true }}
      value={
        value ? arrSelect.find((option) => option.id === value)?.title : select
      }
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
