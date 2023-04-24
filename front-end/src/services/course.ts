import axiosClient from "../api/axiosClient";
import { SectionType } from "../types";

interface CourseApiType {
  id?: any;
  title?: string;
  description?: string;
  descriptionMarkdown?: string;
  price?: number | null;
  promotion_price?: number | null;
  user_id?: number | null;
  category_id?: number | string | undefined;
  thumbnail?: string;
  sections?: SectionType[] | null;
}

const courseServices = {
  createCourseApi: async ({
    category_id,
    description,
    descriptionMarkdown,
    price,
    promotion_price,
    thumbnail,
    title,
    user_id,
    sections,
  }: CourseApiType) => {
    try {
      const response = await axiosClient.post(`courses/create`, {
        title,
        description,
        descriptionMarkdown,
        thumbnail,
        price,
        promotion_price,
        category_id,
        user_id,
        sections,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  editCourseApi: async ({
    category_id,
    description,
    descriptionMarkdown,
    price,
    promotion_price,
    thumbnail,
    title,
    user_id,
    sections,
    id,
  }: CourseApiType) => {
    try {
      const response = await axiosClient.put(`courses/edit/${id}`, {
        title,
        description,
        descriptionMarkdown,
        thumbnail,
        price,
        promotion_price,
        category_id,
        user_id,
        sections,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  getCourseApi: async ({ id, limit, page }: any) => {
    try {
      let response = null;
      if (limit && page) {
        response = await axiosClient.get(
          `courses/get?id=${id}&limit=${limit}&page=${page}`
        );
        return response;
      } else {
        response = await axiosClient.get(`courses/get?id=${id}`);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  getCourseApiSortType: async ({ id, limit, page, type }: any) => {
    try {
      let response = null;
      if (limit && page) {
        response = await axiosClient.get(
          `courses/get?limit=${limit}&page=${page}&id=${id}&sort_by=${type}`
        );
        return response;
      } else {
        response = await axiosClient.get(`courses/get?id=${id}`);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  getCourseSectionApi: async ({ userId, courseId }: any) => {
    try {
      const response = await axiosClient.get(
        `courses/get-section?courseId=${courseId}&userId=${userId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  getMyCourseApi: async (id: any) => {
    try {
      const response = await axiosClient.get(`courses/get-my-course/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteCourseApi: async (id: any) => {
    try {
      const response = await axiosClient.delete(`courses/delete/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
  deleteEnrollmentCourseApi: async ({ course_id, user_id }: any) => {
    try {
      const response = await axiosClient.delete(
        `courses/delete-enrollment?course_id=${course_id}&user_id=${user_id}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default courseServices;
