// Import models
import db from "../models";

// Create rating
const createRating = async (req, res) => {
  const { user_id, course_id, parent_id, rating_value, comment } = req.body;

  try {
    const user = await db.Rating.findOne({
      where: { user_id: user_id, course_id: course_id },
    });

    if (user) {
      res.status(200).json({
        message: "Only One comment",
      });
      return;
    }

    if (!user_id || !course_id || !rating_value || !comment) {
      res.status(400).json({
        message: "missing required",
      });
    } else {
      console.log("oke");
      const newRating = await db.Rating.create({
        user_id,
        course_id,
        rating_value,
        comment,
      });
      res.status(201).json({
        code: 0,
        message: "Rating created successfully",
        data: newRating,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

// Get all ratings by course_id
const getAllRatingsByCourseId = async (req, res) => {
  try {
    const { id } = req.params;
    const ratings = await db.Rating.findAll({
      where: { course_id: id },
      include: [
        {
          model: db.User,
          attributes: ["id", "name"],
          as: "users",
          include: [
            {
              model: db.User_detail,
              attributes: ["avatar"],
              as: "user_details",
            },
          ],
        },
      ],
      raw: true,
      nest: true,
    });
    res.status(200).json({
      code: 0,
      message: "Get all ratings by course_id successfully",
      data: ratings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

// Update rating
const updateRating = async (req, res) => {
  const { id } = req.params;
  const { rating_value, comment } = req.body;
  try {
    const rating = await db.Rating.findOne({ where: { id: id } });
    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }
    rating.rating_value = rating_value || rating.rating_value;
    rating.comment = comment || rating.comment;
    await rating.save();
    res.status(200).json({
      code: 0,
      message: "Rating updated successfully",
      rating,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

// Delete rating
const deleteRating = async (req, res) => {
  const { id } = req.params;
  try {
    const rating = await db.Rating.findOne({ where: { id: id } });
    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }
    await rating.destroy();
    res.status(200).json({
      code: 0,
      message: "Rating deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

const getAvgRating = async (req, res) => {
  try {
    const courseId = req.query.id;
    const totalRatingValue = await db.Rating.sum("rating_value", {
      where: { course_id: courseId },
    });

    const numberOfRatings = await db.Rating.count({
      where: { course_id: courseId },
    }); // số lượng đánh giá
    const averageRating = totalRatingValue / numberOfRatings; // giá

    res.json({ total_rating_value: averageRating });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

export default {
  createRating,
  getAllRatingsByCourseId,
  updateRating,
  deleteRating,
  getAvgRating,
};
