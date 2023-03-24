import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlusCircle } from "react-icons/fa";
import Section from "../Section";
// import ControlPointIcon from "@mui/icons-material/ControlPoint";

export interface SectionType {
  title: string;
  lectures: {
    name: string;
    videoLink: string;
  }[];
}

function CourseForm() {
  const [sections, setSections] = useState<SectionType[]>([
    { title: "", lectures: [] },
  ]);

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
  }

  function onSubmit(data: any) {
    console.log(JSON.parse(data.sections));
  }

  React.useEffect(() => {
    setValue("sections", JSON.stringify(sections));
  }, [setValue, sections]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <button type="button" onClick={addSection}>
        <FaPlusCircle />
        Add Section
      </button>
      {/* <ControlPointIcon type="button" onClick={addSection} /> */}
      <button type="submit">Save</button>
      <input {...register("sections")} type="hidden" name="sections" />
    </form>
  );
}

export default CourseForm;
