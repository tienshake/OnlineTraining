import axiosClient from "../api/axiosClient";

interface RatingAPi {
  user_id: number;
  course_id: any;
  rating_value: number;
  comment: string;
}

const ratingServices = {
  createRatingApi: async ({
    user_id,
    course_id,
    rating_value,
    comment,
  }: RatingAPi) => {
    try {
      const response = await axiosClient.post(`rating/create`, {
        user_id,
        course_id,
        rating_value,
        comment,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  getRatingApi: async (id: any) => {
    try {
      const response = await axiosClient.get(`rating/get-by-course-id/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getRatingValueAVGApi: async (id: any) => {
    try {
      const response = await axiosClient.get(`rating/get-avg?id=${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default ratingServices;
