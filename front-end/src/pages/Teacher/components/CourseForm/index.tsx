import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlusCircle } from "react-icons/fa";
import Section from "../Section";
import styles from "./CourseForm.module.scss";
import { SectionType } from "../../../../types";
import { toast } from "react-toastify";

function CourseForm({ formValues, setFormValues }: any) {
  const [sections, setSections] = useState<SectionType[]>(
    formValues.sectionCourse
  );

  const { register, watch, handleSubmit, setValue } = useForm();

  function addSection() {
    setSections((prevState: any) => [
      ...prevState,
      {
        title: "",
        lectures: [],
      },
    ]);
  }

  function removeSection(sectionIndex: any) {
    setSections((prevState: any) =>
      prevState.filter((_: any, index: any) => index !== sectionIndex)
    );
    // setFormValues((prevValues: any) => ({
    //   ...prevValues,
    //   sectionCourse: sections,
    // }));
  }

  function onSubmit(data: any) {
    console.log("sections", sections);
    setFormValues((prevValues: any) => ({
      ...prevValues,
      sectionCourse: sections,
    }));
    toast.success("🦄 Wow so easy!");
  }

  React.useEffect(() => {
    setValue("sections", JSON.stringify(sections));
  }, [setValue, sections]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form}>
        {sections &&
          sections?.map((section: SectionType, sectionIndex: number) => (
            <Section
              key={sectionIndex}
              sectionIndex={sectionIndex}
              section={section}
              setSection={setSections}
              removeSection={removeSection}
              register={register}
              watch={watch}
            />
          ))}
      </div>

      <div className={styles.control}>
        <button type="button" onClick={addSection} className={styles.btnAdd}>
          <FaPlusCircle />
          Add Section
        </button>
        <button type="submit" className={styles.btnSave}>
          Save
        </button>
      </div>
      {/* <ControlPointIcon type="button" onClick={addSection} /> */}
      <input {...register("sections")} type="hidden" name="sections" />
    </form>
  );
}

export default CourseForm;
