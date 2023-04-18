// Route

export interface childrenRouteType {
  component: any;
  patch: string;
}
export interface RouteType {
  component: any;
  patch: string;
  defaultLayout?: boolean;
  children?: childrenRouteType[];
  internBanner?: boolean;
}

//API type
export type APIRequestType = {
  data?: any;
  message?: string;
  code?: number;
};

export type APIType = {
  data?: APIRequestType;
};

// language
export type LanguageState = {
  language: string;
};

//PayLoadActionType
export type PayloadType = "VI" | "EN";

/* Type form add user */
export interface TypeObjectInput {
  name?: String;
  email?: String;
  password?: String;
  confirmPass?: String;
  role?: String;
}

export interface TypeError {
  name?: String;
  email?: String;
  password?: String;
  confirmPass?: String;
  role?: String;
}

export interface ErrorSubmit {
  name?: String;
  email?: String;
  password?: String;
  confirmPass?: String;
  role?: String;
}

//Category
export interface CategoryType {
  id: number;
  name_category: string;
}

//Header nav
export interface NavType {
  title: string;
  patch: string;
}

//Create course

export interface courseDescriptionsType {
  html?: any;
  text?: string;
}

export interface avatarType {
  previewImg: any;
  thumbnail: any;
  fileName: any;
}

export interface CreateCourseType {
  [key: string]: any;
  courseTitle?: string;
  courseCategory?: number | string | undefined;
  courseDescriptions?: courseDescriptionsType;
  avatar?: avatarType;
  price?: number;
  promotion_price?: number;
  sectionCourse?: SectionType[];
  courseCategoryArray?: any;
}

export interface SectionType {
  title: string;
  lectures: {
    title: string;
    video: string;
    videoFile?: any;
    videoFileArr?: any;
  }[];
}

// export interface SectionProps {
//   sectionIndex: number;
//   section: SectionType;
//   setSection: React.Dispatch<React.SetStateAction<SectionType[]>>;
//   removeSection: (sectionIndex: number) => void;
//   register: ReturnType<typeof useForm>["register"];
//   watch: ReturnType<typeof useForm>["watch"];
// }
