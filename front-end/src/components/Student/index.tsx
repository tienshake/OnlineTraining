import React from "react";
import styles from "./Student.module.scss";
import DefaultLayoutEdit from "../DefaultayoutEdit";

const Student = () => {
  return (
    <DefaultLayoutEdit
      titleHeader="Student"
      textHeader="Manage your courses and its update like live, draft and insight"
    >
      <div className={styles.container}>Student</div>
    </DefaultLayoutEdit>
  );
};

export default Student;
