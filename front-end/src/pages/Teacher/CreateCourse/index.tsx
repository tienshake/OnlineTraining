import React from "react";
import styles from "./CreateCourse.module.scss";
import { Box, Stack } from "@mui/material";
import { ButtonSave, ButtonBack, ButtonNext } from "../../../components/Button";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import clsx from "clsx";
import Information from "../components/Information";
import Course from "../components/Course";
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

function CreateCourse() {
  const user = useSelector((state: RootState) => state.auth.user);

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
    price: 0,
    promotion_price: 0,
  });

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
    // reset arr when component didmount
    setPROGRESS_ARR([
      { id: INFO, title: "Basic information", status: PENDING },
      { id: COURSE, title: "Course Media", status: START },
      { id: CURRICULUM, title: "Curriculum", status: START },
      { id: SETTING, title: "Settings", status: START },
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
    let title = formValues.courseTitle;
    let thumbnail = "";
    let description = formValues.courseDescriptions?.text;
    let descriptionMarkdown = formValues.courseDescriptions?.html;
    let price = formValues.price;
    let promotion_price = formValues.promotion_price;
    let user_id = user.id;
    let category_id = formValues.courseCategory;
    let sections: any = [];
    // console.log("formValues", formValues);

    if (formValues) {
      if (formValues.avatar && formValues.avatar.thumbnail) {
        thumbnail = formValues.avatar.thumbnail;
      }
      if (formValues.sectionCourse && formValues.sectionCourse.length > 0) {
        sections = formValues.sectionCourse;
      }
    }

    const isEmpty = sections.some(
      (item: any) => item.title === "" || item.lectures.length === 0
    );

    if (isEmpty) {
      toast.error("Please sections and lecture  required fields");
    }
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
      const result: APIType = await courseServices.createCourseApi({
        title,
        thumbnail,
        description,
        descriptionMarkdown,
        price,
        promotion_price,
        user_id,
        category_id,
        sections,
      });

      if (result && result.data?.code === CODE_SUCCESS) {
        setIsComplete(true);
        setComponent(<Complete />);
        toast.success("🦄 Wow so easy!");
      }
    } else {
      toast.warning("🦄 You was add course!");
    }
  };

  return (
    <Box className={styles.container}>
      <Stack
        className={styles.headerControl}
        direction="row"
        justifyContent="space-between"
      >
        <h1 className={styles.title}>Add New Course</h1>
        <Stack direction="row" gap={2}>
          <ButtonBack title="Back To Course" />
          <ButtonSave title="Add Course" onClick={handleCreateCourseApi} />
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
