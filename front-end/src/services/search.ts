import axiosClient from "../api/axiosClient";
import { paramsType } from "../redux/features/search/searchSlice";

const SearchServices = {
  getSearchApi: async ({ text, path }: paramsType) => {
    if (path === "teacher") {
      path = "user";
    }
    try {
      const response = await axiosClient.get(`${path}/search?search=${text}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default SearchServices;
