// Route
export interface RouteType {
  component: () => JSX.Element;
  patch: string;
}

// language
export type LanguageState = {
  language: string;
};

//PayLoadActionType
export type PayloadType = "VI" | "EN";
