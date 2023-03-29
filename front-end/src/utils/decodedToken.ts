import { getUserToken } from "./userToken";

const decodedToken = () => {
  const token: any = getUserToken();
  const decodedToken = JSON.parse(atob(token.split(" ")[1].split(".")[1]));
  return decodedToken;
};

export default decodedToken;
