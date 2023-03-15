// import en from "translations/en.json";
// import vi from "translations/vi.json";
// import { EN, VI } from "constants/constants";

export const translate = (key: string, language: string): string => {
  let langData: { [key: string]: string } = {};
  //   switch (language) {
  //     case EN:
  //       langData = en;
  //       break;
  //     case VI:
  //       langData = vi;
  //       break;
  //     default:
  //       break;
  //   }
  return langData[key];
};
