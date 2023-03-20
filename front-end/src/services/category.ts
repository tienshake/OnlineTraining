import axiosClient from "../api/axiosClient";

const categoryServices = {
  getCategoryApi: async () => {
    try {
      const response = await axiosClient.get(`category/get`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  createCategoryApi: async (name_category: any) => {
    try {
      const response = await axiosClient.post(`category/create`, {
        name_category,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteCategoryApi: async (id: number) => {
    try {
      const response = await axiosClient.delete(`category/delete/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default categoryServices;
