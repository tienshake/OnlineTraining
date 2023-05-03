import React, { useState } from "react";
import axios from "axios";

const CreateLectures = () => {
  const [sections, setSections] = useState<any>([
    { title: "", lectures: [{ title: "", video: null }] },
  ]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    sectionIndex: any,
    lectureIndex: any,
    event: any,
    type: string
  ) => {
    const { name, value } = event.target;
    const list = [...sections];
    if (type === "section") {
      console.log("section index");
      // update section title
      list[sectionIndex].title = value;
    } else {
      console.log("lecture index");
      // update lecture title
      list[sectionIndex].lectures[lectureIndex][name] = value;
    }
    setSections(list);
  };

  const handleVideoChange = (
    sectionIndex: any,
    lectureIndex: any,
    event: any
  ) => {
    const { files } = event.target;
    const list = [...sections];
    list[sectionIndex].lectures[lectureIndex]["video"] = files[0];
    setSections(list);
  };

  const handleAddLecture = (sectionIndex: any) => {
    const list = [...sections];
    list[sectionIndex].lectures.push({ title: "", video: null });
    setSections(list);
  };

  const handleRemoveLecture = (sectionIndex: any, lectureIndex: any) => {
    const list = [...sections];
    list[sectionIndex].lectures.splice(lectureIndex, 1);
    setSections(list);
  };

  const handleAddSection = () => {
    setSections([
      ...sections,
      { title: "", lectures: [{ title: "", video: null }] },
    ]);
  };

  const handleRemoveSection = (sectionIndex: any) => {
    const list = [...sections];
    list.splice(sectionIndex, 1);
    setSections(list);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      const lecturesData = sections.map((section: any) => {
        const { title, lectures } = section;
        const lecturesData = lectures.map((lecture: any) => {
          const { title, video } = lecture;
          return { title, video };
        });
        return { title, lectures: lecturesData };
      });

      const formData = new FormData();
      formData.append("lectures", JSON.stringify(lecturesData));
      sections.forEach((section: any, sectionIndex: any) => {
        section.lectures.forEach((lecture: any, lectureIndex: any) => {
          formData.append(`video`, lecture.video);
        });
      });

      const response = await axios.post(
        `http://localhost:8080/create-lecture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setLoading(false);
    } catch (error: any) {
      console.log(error.response.data);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {sections.map((section: any, sectionIndex: any) => (
        <div key={sectionIndex}>
          <label>
            Section Title:
            <input
              type="text"
              value={section.title}
              onChange={(event) =>
                handleInputChange(sectionIndex, 0, event, "section")
              }
              name="title"
            />
          </label>
          <button
            type="button"
            onClick={() => handleRemoveSection(sectionIndex)}
          >
            Remove Section
          </button>
          {section.lectures.map((lecture: any, lectureIndex: any) => (
            <div key={lectureIndex}>
              <label>
                Lecture Title:
                <input
                  type="text"
                  value={lecture.title}
                  onChange={(event) =>
                    handleInputChange(
                      sectionIndex,
                      lectureIndex,
                      event,
                      "lecture"
                    )
                  }
                  name="title"
                />
              </label>
              <label>
                Lecture Video:
                <input
                  type="file"
                  onChange={(event) =>
                    handleVideoChange(sectionIndex, lectureIndex, event)
                  }
                />
              </label>
              <button
                type="button"
                onClick={() => handleRemoveLecture(sectionIndex, lectureIndex)}
              >
                Remove Lecture
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddLecture(sectionIndex)}>
            Add Lecture
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddSection}>
        Add Section
      </button>
      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Create Lectures"}
      </button>
    </form>
  );
};

export default CreateLectures;
