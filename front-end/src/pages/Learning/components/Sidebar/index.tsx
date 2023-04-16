import React from "react";
import clsx from "clsx";
import AccordionSection from "../../../../components/AccordionSection";
import styles from "./Sidebar.module.scss";

const Sidebar = ({ dataSection, className, handleClickLecture }: any) => {
  return (
    <div className={clsx(className, styles.container)}>
      <div>
        <h1>Content Course</h1>
      </div>
      <ul>
        {dataSection &&
          dataSection.length > 0 &&
          dataSection.map((section: any, index: number) => {
            return (
              <AccordionSection
                key={index}
                section={section}
                isWatching
                onClickLecture={handleClickLecture}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default Sidebar;
