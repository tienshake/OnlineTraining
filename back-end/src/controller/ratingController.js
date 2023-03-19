// Import models
import db from "../models";

// Create rating
const createRating = async (req, res) => {
  const { user_id, course_id, parent_id, rating_value, comment } = req.body;
  try {
    const newRating = await db.Rating.create({
      user_id,
      course_id,
      parent_id,
      rating_value,
      comment,
    });
    res.status(201).json({
      code: 0,
      message: "Rating created successfully",
      rating: newRating,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

// Get all ratings by course_id
const getAllRatingsByCourseId = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const ratings = await db.Rating.findAll({
      where: { course_id: id },
      include: [
        {
          model: db.User,
          attributes: ["id", "name"],
          as: "users",
        },
      ],
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

export default {
  createRating,
  getAllRatingsByCourseId,
  updateRating,
  deleteRating,
};
