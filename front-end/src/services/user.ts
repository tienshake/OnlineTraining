import axiosClient from "../api/axiosClient";

const userServices = {
  getUserApi: async (id: string) => {
    try {
      const response = await axiosClient.get(`user/get?id=${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};

export default userServices;
