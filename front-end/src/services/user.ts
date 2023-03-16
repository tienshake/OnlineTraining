import axiosClient from "../api/axiosClient";

const userServices:any = {
  getUserApi: async (id: string) => {
    const response = await axiosClient.get(`user/get?id=${id}`);
    return response;
  },
};

export default userServices;
