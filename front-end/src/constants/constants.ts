import { NavType } from "../types";

//LANGUAGE
export const EN = "EN";
export const VI = "VI";
export const CODE_SUCCESS = 0;

// Role
export const ADMIN_ROUTE = "admin";
export const TEACHER_ROUTE = "teacher";
export const STUDENT_ROUTE = "student";

//header
export const IMG_URL =
  "https://tudienwiki.com/wp-content/uploads/2017/07/lien-minh-huyen-thoai.png";

export const NAV_LIST: NavType[] = [
  {
    title: "Course",
    patch: "/course",
  },
  {
    title: "MyCourse",
    patch: "/profile/edit-my-course",
  },
  {
    title: "Blog",
    patch: "/blog",
  },
];

export const MENU_PROFILE = [
  {
    title: "Earnings",
    patch: "/profile/earnings-profile",
    role: TEACHER_ROUTE,
  },
  {
    title: "Edit Profile",
    patch: "/profile/edit-profile",
  },
  {
    title: "My Course",
    patch: "/profile/edit-my-course",
  },
  {
    title: "Orders",
    patch: "/profile/orders",
    role: TEACHER_ROUTE,
  },
  {
    title: "Reviews",
    patch: "/profile/reviews-profile",
    role: TEACHER_ROUTE,
  },
  {
    title: "Student",
    patch: "/profile/student-profile",
    role: TEACHER_ROUTE,
  },

  {
    title: "Sign Out",
    patch: "/profile/logout-profile",
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
  { id: SETTING, title: "Settings", status: START },
  { id: CURRICULUM, title: "Curriculum", status: START },
];

/* My Card Prop */
export interface MyCardBasicIntroduceProps {
  idCourse?: Number;
  imageItem?: any;
  titleItem?: String;
  contentItem?: String;
  priceItem?: String;
  widthCard?: String;
  promotion_price?: String;
  rating?: any;
  userName?: any;
  userAvatar?: any;
}
export interface MyCoursesCateProps extends MyCardBasicIntroduceProps {}
export interface CardMainProductProps extends MyCardBasicIntroduceProps {
  borderStyle?: Boolean;
  preventPath?: String;
}
export interface CardUserStyleProps extends MyCardBasicIntroduceProps {}
