import axiosClient from "../api/axiosClient";
import { SectionType } from "../types";

interface CourseApiType {
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
  createCategoryApi: async ({
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
};

export default courseServices;
