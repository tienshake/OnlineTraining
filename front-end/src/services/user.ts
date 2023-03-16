import axiosClient from "../api/axiosClient";

const userServices = {
  getUserApi: async (id: string) => {
    const response = await axiosClient.get(`user/get?id=${id}`);
    return response;
  },
};

export default userServices;
