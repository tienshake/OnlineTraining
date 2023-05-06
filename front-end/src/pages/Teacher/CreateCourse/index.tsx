import React from "react";
import styles from "./CreateCourse.module.scss";
import { Box, Stack } from "@mui/material";
import { ButtonSave, ButtonBack, ButtonNext } from "../../../components/Button";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import clsx from "clsx";
import Information from "../components/Information";
import Course from "../components/CourseImg";
import Setting from "../components/Setting";
import {
  INFO,
  COURSE,
  CURRICULUM,
  SETTING,
  PROGRESS,
  START,
  PENDING,
  ACTIVE,
  CODE_SUCCESS,
} from "../../../constants/constants";
import CourseForm from "../components/CourseForm";
import { APIType, CreateCourseType } from "../../../types";
import { toast } from "react-toastify";
import courseServices from "../../../services/course";
import Complete from "../components/Complete";
import categoryServices from "../../../services/category";
import checkDataApi from "../../../utils/checkDataApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { useParams } from "react-router-dom";
import covertB64 from "../../../utils/covertB64";
// import CreateLectures from "../components/CreateLecture";
import axios from "axios";
import LoadingModal from "../../../components/LoadingModal";

function CreateCourse() {
  const user = useSelector((state: RootState) => state.auth.user);

  let { id } = useParams();

  const [formValues, setFormValues] = React.useState<CreateCourseType>({
    courseTitle: "",
    courseCategory: "",
    courseCategoryArray: [],
    courseDescriptions: {
      html: "",
      text: "",
    },
    avatar: {
      previewImg: "",
      thumbnail: "",
      fileName: "",
    },
    sectionCourse: [{ title: "", lectures: [] }],
    price: 1,
    promotion_price: 1,
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [PROGRESS_ARR, setPROGRESS_ARR] = React.useState(PROGRESS);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [component, setComponent] = React.useState<any>();
  const [isComplete, setIsComplete] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetch = async () => {
      const data = await categoryServices.getCategoryApi();
      const result = await checkDataApi(data);
      if (result) {
        const newData = result.data?.map((item: any) => {
          return {
            id: item.id,
            title: item.name_category,
          };
        });
        if (newData.length > 0)
          setFormValues((prevValues: any) => ({
            ...prevValues,
            courseCategory: newData[0].id,
            courseCategoryArray: newData,
          }));
      }
    };
    fetch();
  }, []);

  React.useEffect(() => {
    if (id) {
      const fetch = async () => {
        const dataCourse = await courseServices.getCourseApi({ id });
        const dataCourseSection = await courseServices.getCourseSectionApi({
          userId: user.id,
          courseId: id,
        });

        const resultCourse = await checkDataApi(dataCourse);
        const resultCourseSection = await checkDataApi(dataCourseSection);

        if (resultCourse) {
          setFormValues((prevValues: any) => ({
            ...prevValues,
            courseTitle: resultCourse.data.title,
            courseCategory: resultCourse.data.category_id,
            courseDescriptions: {
              html: resultCourse?.data?.course_detail.descriptionMarkdown,
              text: resultCourse?.data?.course_detail.description,
            },
            avatar: {
              previewImg: covertB64(resultCourse.data.thumbnail),
              thumbnail: resultCourse.data.thumbnail,
              fileName: "",
            },
            sectionCourse: resultCourseSection?.data.course_sections,
            price: resultCourse.data.price,
            promotion_price: resultCourse.data.promotion_price,
          }));
        }
      };
      fetch();
    }
  }, [id, user]);

  React.useEffect(() => {
    // reset arr when component didmount
    setPROGRESS_ARR([
      { id: INFO, title: "Basic information", status: PENDING },
      { id: COURSE, title: "Course Media", status: START },
      { id: SETTING, title: "Settings", status: START },
      { id: CURRICULUM, title: "Curriculum", status: START },
    ]);
  }, []);

  // Switch component with id when click
  const switchComponent = (id: string) => {
    switch (id) {
      case INFO:
        setComponent(
          <Information setFormValues={setFormValues} formValues={formValues} />
        );
        break;
      case COURSE:
        setComponent(
          <Course setFormValues={setFormValues} formValues={formValues} />
        );
        break;
      case CURRICULUM:
        setComponent(
          <CourseForm setFormValues={setFormValues} formValues={formValues} />
        );
        break;
      case SETTING:
        setComponent(
          <Setting setFormValues={setFormValues} formValues={formValues} />
        );
        break;
      default:
        break;
    }
  };

  const handleNextClick = () => {
    // Increase index
    const nextIndex = activeIndex + 1;
    const updatedProgressArr = [...PROGRESS_ARR];

    if (nextIndex >= PROGRESS_ARR.length) return;

    //switchComponent with click
    switchComponent(PROGRESS_ARR[activeIndex + 1]?.id);
    // Change status in object of PROGRESS_ARR
    updatedProgressArr[activeIndex].status = ACTIVE;
    updatedProgressArr[nextIndex].status = PENDING;

    setActiveIndex(nextIndex);
  };

  const handleBackClick = () => {
    // decrease index
    const prevIndex = activeIndex - 1;
    const updatedProgressArr = [...PROGRESS_ARR];

    if (prevIndex < 0) return;

    //switchComponent with click
    switchComponent(PROGRESS_ARR[activeIndex - 1]?.id);
    // Change status in object of PROGRESS_ARR
    updatedProgressArr[activeIndex].status = START;
    updatedProgressArr[prevIndex].status = PENDING;

    setActiveIndex(prevIndex);
  };

  const handleCreateCourseApi = async () => {
    setIsLoading(true);
    let title = formValues.courseTitle;
    let thumbnail = "";
    let description = formValues.courseDescriptions?.text;
    let descriptionMarkdown = formValues.courseDescriptions?.html;
    let price = formValues.price;
    let promotion_price = formValues.promotion_price;
    let user_id = user.id;
    let category_id = formValues.courseCategory;
    let sections: any = [];

    if (formValues) {
      if (formValues.avatar && formValues.avatar.thumbnail) {
        thumbnail = formValues.avatar.thumbnail;
      }
      if (formValues.sectionCourse && formValues.sectionCourse.length > 0) {
        sections = formValues.sectionCourse;
      }
    }

    // const isEmpty = sections.some(
    //   (item: any) => item.title === "" || item.lectures.length === 0
    // );

    // if (isEmpty) {
    //   toast.error("Please sections and lecture  required fields");
    // }
    //Check exist params
    if (
      !title ||
      !thumbnail ||
      !description ||
      !descriptionMarkdown ||
      !price ||
      !sections ||
      !price ||
      !promotion_price ||
      !user_id
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    //isComplete save call api
    if (!isComplete) {
      if (!id) {
        const formData = new FormData();

        formData.append("sections", JSON.stringify(sections));
        formData.append(
          "dataCourse",
          JSON.stringify({
            title,
            thumbnail,
            description,
            descriptionMarkdown,
            price,
            promotion_price,
            user_id,
            category_id,
          })
        );

        sections.forEach((section: any) => {
          section.lectures.forEach((lecture: any) => {
            formData.append(`video`, lecture.video);
          });
        });
        console.log("formValues", formValues);
        const response = await axios.post(
          `https://nodejs-deploy-n9mo.onrender.com/video/uploads`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response) {
          console.log("complete");
          toast.success("🦄 Create so easy!");
          setIsLoading(false);
          // setIsComplete(true);
          // setComponent(<Complete />);
        }
      } else {
        console.log("formValues?.avatar?.thumbnail", typeof thumbnail);
        const result: APIType = await courseServices.editCourseApi({
          id,
          title,
          thumbnail:
            typeof thumbnail === "object" ? covertB64(thumbnail) : thumbnail,
          description,
          descriptionMarkdown,
          price,
          promotion_price,
          user_id,
          category_id,
          sections: formValues.sectionCourse,
        });

        if (result && result.data?.code === CODE_SUCCESS) {
          toast.success("🦄 Edit so easy!");
          setIsLoading(false);
        }
      }
    } else {
      toast.warning("🦄 You was add course!");
    }
  };

  return (
    <Box className={styles.container}>
      <LoadingModal isLoading={isLoading} />
      <Stack
        className={styles.headerControl}
        direction="row"
        justifyContent="space-between"
      >
        <h1 className={styles.title}>Add New Course</h1>
        <Stack direction="row" gap={2}>
          <ButtonBack title="Back To Course" />
          {id ? (
            <ButtonSave title="Update" onClick={handleCreateCourseApi} />
          ) : (
            <ButtonSave title="Add Course" onClick={handleCreateCourseApi} />
          )}
        </Stack>
      </Stack>
      <Box className={styles.content}>
        <Box className={styles.progressContainer}>
          <ul className={styles.progressbar}>
            {PROGRESS_ARR &&
              PROGRESS_ARR.map((item) => (
                <li className={styles.progressItem} key={item.id}>
                  <span
                    className={clsx(
                      item.status !== "start"
                        ? styles.progress
                        : styles.progressActive
                    )}
                  />
                  <span className={styles.progressTitle}>
                    {item.status === "active" ? (
                      <CheckCircleIcon className={styles.icon} />
                    ) : item.status === "pending" ? (
                      <TripOriginIcon className={styles.icon} />
                    ) : (
                      <PanoramaFishEyeIcon className={styles.iconPanorama} />
                    )}
                    {item.title}
                  </span>
                </li>
              ))}
          </ul>
        </Box>
        <Box className={styles.contentForm}>
          {component ? (
            React.cloneElement(component, { setFormValues, formValues })
          ) : (
            <Information
              setFormValues={setFormValues}
              formValues={formValues}
            />
          )}
        </Box>
        {!isComplete && (
          <Stack
            direction="row"
            gap={2}
            justifyContent="space-between"
            className={styles.footerControl}
          >
            <ButtonBack title="Back" onClick={handleBackClick} />
            <ButtonNext title="Continue" onClick={handleNextClick} />
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export default CreateCourse;
