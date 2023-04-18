import React, { useRef } from "react";
import { Box, Stack } from "@mui/material";
import styles from "./EditProfile.module.scss";
import { ButtonDelete, ButtonSave } from "../Button";
import Input from "../Input";
import DefaultLayoutEdit from "../DefaultayoutEdit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useFormik } from "formik";
import * as Yup from "yup";
import userServices from "../../services/user";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { loginSuccess } from "../../redux/features/auth";
import CommonUtils from "../../utils/CommonUtils";

const EditProfile = () => {
  const userRedux = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const inputRef = useRef<any>(null);
  const [image, setImage] = React.useState<any>();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    name: Yup.string(),
    phone_number: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "too short")
      .max(10, "too long"),
    age: Yup.number(),
  });

  const formik = useFormik({
    initialValues: {
      name: userRedux?.name || "",
      about_me: userRedux?.userDetails.about_me || "",
      phone_number: userRedux?.userDetails.phone_number || "",
      address: userRedux?.userDetails.address || "",
      experience: userRedux?.userDetails.experience || "",
      education: userRedux?.userDetails.education || "",
      age: userRedux?.userDetails.age || "",
      gender: userRedux?.userDetails.gender || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      confirmAlert({
        title: "Confirm deletion",
        message: "Need to sign in again to make changes?",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              const data = await userServices.editUserApi({
                id: userRedux.id,
                ...values,
              });

              if (data.data.code === 0) {
                dispatch(
                  loginSuccess({
                    user: {
                      name: values.name,
                      email: userRedux.email,
                      id: userRedux.id,
                      avatar: userRedux.avatar,
                      userDetails: { ...values },
                    },
                  })
                );
                toast.success("🦄 Wow so easy!");
              }
            },
          },
          {
            label: "No",
          },
        ],
      });
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  const handleOnchangeImg = async (e: any) => {
    const data = e.target.files;
    const file = data[0];

    if (file) {
      const b64 = await CommonUtils.getBase64(file);
      const objectUrl = URL.createObjectURL(file);
      setImage({
        previewImg: objectUrl,
        thumbnail: b64,
        fileName: file.name,
      });
    }
  };

  const handleClick = () => {
    // 👇️ open file input box on click of another element
    inputRef.current.click();
  };

  const handleUpdateImage = async () => {
    confirmAlert({
      title: "Confirm deletion",
      message: "You want changes avatar",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const data = await userServices.editUserApi({
              id: userRedux.id,
              avatar: image.thumbnail,
            });

            if (data.data.code === 0) {
              dispatch(
                loginSuccess({
                  user: {
                    ...userRedux,
                    avatar: image.previewImg,
                  },
                })
              );
              toast.success("🦄 Wow so easy!");
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  // console.log(userRedux);
  return (
    <DefaultLayoutEdit
      titleHeader="Profile Details"
      textHeader="You have full control to manage your own account setting."
    >
      <Stack className={styles.info}>
        <Box className={styles.infoLeft}>
          <img
            className={styles.avatar}
            src={
              image?.previewImg
                ? image?.previewImg
                : `https://img.freepik.com/free-icon/user_318-159711.jpg`
            }
            alt="Avatar"
          />
          <Box>
            <h4>Your avatar</h4>
            <input
              type="file"
              hidden
              id="image"
              ref={inputRef}
              onChange={handleOnchangeImg}
            />
            <input
              type="button"
              value="Select a File"
              id="image"
              onClick={handleClick}
            />
          </Box>
        </Box>
        <Box className={styles.infoRight}>
          <ButtonSave title="Update" outline onClick={handleUpdateImage} />
          <ButtonDelete title="Delete" outline />
        </Box>
      </Stack>
      <Stack className={styles.form}>
        <h4>Personal Details</h4>
        <p>Edit your personal information and address.</p>
        <form onSubmit={formik.handleSubmit} className={styles.formControl}>
          <Box className={styles.formInput}>
            <label>Email</label>
            <Input
              placeholder="Enter Your Email"
              type="Email"
              name="Email"
              value={userRedux?.email}
              disabled
            />
          </Box>
          <Box className={styles.formInput}>
            <label>Name</label>
            <Input
              placeholder="Enter Your Name"
              type="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={
                formik.touched.name && typeof formik.errors.name === "string"
                  ? formik.errors.name
                  : null
              }
            />
          </Box>
          <Box className={styles.formInput}>
            <label>Phone Number</label>
            <Input
              placeholder="Enter Your Phone Number"
              type="phone_number"
              name="phone_number"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              error={
                formik.touched.phone_number &&
                Boolean(formik.errors.phone_number)
              }
              helperText={
                formik.touched.phone_number &&
                typeof formik.errors.phone_number === "string"
                  ? formik.errors.phone_number
                  : null
              }
            />
          </Box>
          <Box className={styles.formInput}>
            <label>Address</label>
            <Input
              placeholder="Enter Your Address"
              type="address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              // helperText={formik.touched.address && formik.errors.address}
            />
          </Box>
          <Box className={styles.formInput}>
            <label>About me</label>
            <Input
              placeholder="Enter Your about_me"
              type="about_me"
              name="about_me"
              value={formik.values.about_me}
              onChange={formik.handleChange}
              error={formik.touched.about_me && Boolean(formik.errors.about_me)}
              // helperText={formik.touched.name && formik.errors.about_me}
            />
          </Box>
          <Box className={styles.formInput}>
            <label>Experience</label>
            <Input
              placeholder="Enter Your Experience"
              type="experience"
              name="experience"
              value={formik.values.experience}
              onChange={formik.handleChange}
              error={
                formik.touched.experience && Boolean(formik.errors.experience)
              }
              // helperText={formik.touched.experience && formik.errors.experience}
            />
          </Box>
          <Box className={styles.formInput}>
            <label>Education</label>
            <Input
              placeholder="Enter Your className"
              type="education"
              name="education"
              value={formik.values.education}
              onChange={formik.handleChange}
              error={
                formik.touched.education && Boolean(formik.errors.education)
              }
              // helperText={formik.touched.education && formik.errors.education}
            />
          </Box>
          <Box className={styles.formInput}>
            <label>Age</label>
            <Input
              placeholder="Enter Your Age"
              type="age"
              name="age"
              value={formik.values.age}
              onChange={formik.handleChange}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={
                formik.touched.age && typeof formik.errors.age === "string"
                  ? formik.errors.age
                  : null
              }
            />
          </Box>
          <Box className={styles.formInput}>
            <label>Gender</label>
            <Input
              placeholder="Enter Your gender"
              type="gender"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              // helperText={formik.touched.gender && formik.errors.gender}
            />
          </Box>
        </form>
        <Stack className={styles.control}>
          <ButtonSave onClick={handleSubmit} outline title="save" />
        </Stack>
      </Stack>
    </DefaultLayoutEdit>
  );
};

export default EditProfile;
