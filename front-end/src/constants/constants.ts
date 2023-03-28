import { NavType } from "../types";

//LANGUAGE
export const EN = "EN";
export const VI = "VI";
export const CODE_SUCCESS = 0;

//header
export const IMG_URL =
  "https://tudienwiki.com/wp-content/uploads/2017/07/lien-minh-huyen-thoai.png";

export const navList: NavType[] = [
  {
    title: "Course",
    patch: "/course",
  },
  {
    title: "Blog",
    patch: "/blog",
  },
  {
    title: "Profile",
    patch: "/profile",
  },
  {
    title: "Create",
    patch: "/teacher/create-course",
  },
];

export const MENU_PROFILE = [
  {
    title: "My Course",
    patch: "/profile/edit-profile",
  },
  {
    title: "Reviews",
    patch: "/profile/edit-profile",
  },
  {
    title: "Student",
    patch: "/profile/edit-profile",
  },
  {
    title: "Edit Profile",
    patch: "/profile/edit-profile",
  },
  {
    title: "Delete Profile",
    patch: "/profile/delete-profile",
  },
  {
    title: "Sign Out",
    patch: "/profile/delete-profile",
  },
];

export const INFO = "info";
export const COURSE = "course";
export const CURRICULUM = "curriculum";
export const SETTING = "setting";
export const PENDING = "pending";
export const START = "start";
export const ACTIVE = "active";

export const PROGRESS = [
  { id: INFO, title: "Basic information", status: PENDING },
  { id: COURSE, title: "Course Media", status: START },
  { id: CURRICULUM, title: "Curriculum", status: START },
  { id: SETTING, title: "Settings", status: START },
];


/* My Card Prop */
export interface MyCardBasicIntroduceProps {
  imageItem?: String,
  titleItem?: String,
  contentItem?: String,
  widthCard?: String, 
}
export interface MyCoursesCateProps extends MyCardBasicIntroduceProps {

}
export interface CardMainProductProps extends MyCardBasicIntroduceProps  {

}
export interface CardUserStyleProps extends MyCardBasicIntroduceProps {

}


