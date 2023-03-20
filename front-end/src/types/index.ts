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
