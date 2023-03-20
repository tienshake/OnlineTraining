import { AxiosResponse } from "axios";
import { CODE_SUCCESS } from "../constants/constants";

interface ResponseType {
  code: number;
  data?: any;
  message: string;
}

const checkDataApi = (req: AxiosResponse<ResponseType>) => {
  if (req && req.data) {
    if (req.data.code === CODE_SUCCESS) {
      return req.data;
    } else {
      console.error(req.data.message); // hoặc throw một exception
    }
  } else {
    console.error("Invalid response format");
  }
  return null; // hoặc giá trị mặc định khác tùy vào trường hợp sử dụng
};

export default checkDataApi;
