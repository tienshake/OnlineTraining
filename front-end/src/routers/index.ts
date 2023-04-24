import { RouteType } from "../types";
import Login from "../pages/login/Login";
import Register from "../pages/register/register";
import DoashBoard from "../admin/DoashBoard";
import StudentManager from "../admin/StudentManager";
import TeacherManager from "../admin/TeacherManager";
import CoursesManager from "../admin/CoursesManager";
import InfoTeacher from "../admin/InfoTeacher";
import InfoCourses from "../admin/InfoCourses";
import Category from "../admin/pages/category";
import Home from "../pages/Home";
import CreateCourse from "../pages/Teacher/CreateCourse";
import Profile from "../pages/Profile";
import EditProfile from "../components/EditProfile";
import Course from "../pages/Course/Course";
import CourseDetail from "../pages/CourseDetail";
import Checkout from "../pages/Checkout";
import MyCourse from "../components/MyCourse/MyCourse";
import BillOder from "../pages/BillOder";
import Learning from "../pages/Learning";
import Earnings from "../components/Earnings/Earnings";
import Order from "../components/Order";

const publicRoute: RouteType[] = [
  {
    component: Home,
    patch: "/",
    defaultLayout: true,
  },
  {
    component: Login,
    patch: "/login",
  },
  {
    component: Register,
    patch: "/register",
  },
  {
    component: Course,
    patch: "/course",
    defaultLayout: true,
  },
  {
    component: CourseDetail,
    patch: "/course-details/:id",
    defaultLayout: true,
    internBanner: true,
  },
];

const privateRoute: RouteType[] = [
  {
    component: Profile,
    patch: "/profile",
    defaultLayout: true,
    children: [
      {
        component: EditProfile,
        patch: "edit-profile",
      },
      {
        component: MyCourse,
        patch: "/profile/edit-my-course",
      },
      {
        component: Earnings,
        patch: "/profile/earnings-profile",
      },
      {
        component: Order,
        patch: "/profile/orders",
      },
    ],
  },
  {
    component: Learning,
    patch: "/learning/:id",
  },
  {
    component: Checkout,
    patch: "/checkout/:id",
    defaultLayout: true,
  },
  {
    component: BillOder,
    patch: "/bill",
    defaultLayout: true,
  },
  {
    component: CreateCourse,
    patch: "/teacher/create-course",
    defaultLayout: true,
  },
  {
    component: CreateCourse,
    patch: "/teacher/edit-course/:id",
    defaultLayout: true,
  },
  {
    component: DoashBoard,
    patch: "/admin",
  },
  {
    component: StudentManager,
    patch: "/admin/student",
  },
  {
    component: TeacherManager,
    patch: "/admin/users",
  },
  {
    component: CoursesManager,
    patch: "/admin/courses",
  },
  {
    component: InfoCourses,
    patch: "/admin/courses-info",
  },
  {
    component: InfoTeacher,
    patch: "/admin/teacher-info/:userId",
  },
  {
    component: Category,
    patch: "/admin/category",
  },
];

export { publicRoute, privateRoute };
