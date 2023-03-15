import { RouteType } from "../types";
import Login from "../pages/login/Login";
import Register from "../pages/register";
import DoashBoard from "../admin/DoashBoard";
import StudentManager from "../admin/StudentManager";
import TeacherManager from "../admin/TeacherManager";
import CoursesManager from "../admin/CoursesManager";
import InfoTeacher from "../admin/InfoTeacher";
import InfoCourses from "../admin/InfoCourses";
import AddTeacher from "../admin/AddTeacher";

const publicRoute: RouteType[] = [
  {
    component: Login,
    patch: "/login",
  },
  {
    component: Register,
    patch: "/register",
  },
];

const privateRoute: RouteType[] = [
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
    patch: "/admin/teacher",
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
    patch: "/admin/teacher-info",
  },
  {
    component: AddTeacher,
    patch: "/admin/add-teacher",
  },
];

export { publicRoute, privateRoute };
