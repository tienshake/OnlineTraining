import axiosClient from "../api/axiosClient";

const paymentServices = {
  createPayment: async ({
    create_user_id,
    user_id,
    course_id,
    amount,
    status,
    email_address,
    nameOder,
    currency_code,
    description,
    create_time,
  }: any) => {
    try {
      const response = await axiosClient.post(`payment/create`, {
        create_user_id,
        amount,
        user_id,
        course_id,
        status,
        email_address,
        nameOder,
        currency_code,
        description,
        create_time,
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
  getPayment: async (create_user_id: any) => {
    try {
      const response = await axiosClient.get(`payment/get/${create_user_id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default paymentServices;
