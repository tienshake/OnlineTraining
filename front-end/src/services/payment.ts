import axiosClient from "../api/axiosClient";

const paymentServices = {
  createPayment: async ({ user_id, course_id, amount }: any) => {
    try {
      const response = await axiosClient.post(`payment/create`, {
        amount,
        user_id,
        course_id,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  checkPayment: async ({ user_id, course_id }: any) => {
    try {
      const response = await axiosClient.get(
        `payment/check?course_id=${course_id}&user_id=${user_id}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default paymentServices;
