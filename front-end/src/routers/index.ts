import { RouteType } from "../types";
import Login from "../pages/login/Login";
import Register from "../pages/register";
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
import DeleteProfile from "../components/DeleteProfile";
import Course from "../pages/Course/Course";
import CourseDetail from "../pages/CourseDetail";

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
        component: DeleteProfile,
        patch: "delete-profile",
      },
    ],
  },
  {
    component: CreateCourse,
    patch: "/teacher/create-course",
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
    patch: "/admin/teacher-info/:userId",
  },
  {
    component: Category,
    patch: "/admin/category",
  },
];

export { publicRoute, privateRoute };
