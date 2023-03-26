// Route
export interface RouteType {
  component: any;
  patch: string;
  defaultLayout?: boolean;
}

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
  courseTitle?: string;
  courseCategory?: string;
  courseDescriptions?: courseDescriptionsType;
  avatar?: avatarType;
  price?: number;
  promotion_price?: number;
  sectionCourse?: SectionType[];
}

export interface SectionType {
  title: string;
  lectures: {
    name: string;
    videoLink: string;
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
