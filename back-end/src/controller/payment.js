// Import models
import db from "../models";

// Create rating
const paymentEnrollment = async (req, res) => {
  const {
    amount,
    user_id,
    course_id,
    status,
    email_address,
    nameOder,
    currency_code,
    create_time,
    create_user_id,
  } = req.body;

  try {
    if (
      !amount ||
      !user_id ||
      !course_id ||
      !status ||
      !email_address ||
      !nameOder ||
      !currency_code ||
      !create_time ||
      !create_user_id
    ) {
      return res
        .status(404)
        .json({ message: "Thiếu một thứ gì đó rồi bạn ơi" });
    }
    // Kiểm tra xem khóa học có tồn tại hay không
    const course = await db.Course.findOne({
      where: { id: course_id },
    });

    if (!course) {
      return res.status(404).json({ message: "Khóa học không tồn tại" });
    }

    const enroll = await db.Enrollment.findOne({
      where: { user_id, course_id },
    });

    if (enroll) {
      return res.status(404).json({ message: "Khóa học đã được user đăng ký" });
    } else {
      // return res.status(200).json({ message: "có thể tạo tiếp đấy thèn ngu" });
      const enrollment = await db.Enrollment.create({
        course_id,
        user_id,
        status,
      });
      // Thực hiện thanh toán cho khóa học (enrollment)
      if (enrollment) {
        const payment = await db.Payment.create({
          create_user_id,
          course_id,
          user_id,
          amount,
          enrollment_id: enrollment.id,
          status,
          email_address,
          nameOder,
          currency_code,
          create_time,
        });
        if (payment)
          res.status(200).json({
            code: 0,
            message: "Mua Khoá Học thành công",
            data: payment,
          });
      } else {
        return res.status(404).json({ message: "Đăng ký thất bại" });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi thực hiện thanh toán" });
  }
};

const checkPayment = async (req, res) => {
  const { user_id, course_id } = req.query;

  try {
    if (!user_id || !course_id) {
      return res
        .status(404)
        .json({ message: "Thiếu một thứ gì đó rồi bạn ơi" });
    }
    // Kiểm tra xem khóa học có tồn tại hay không
    const course = await db.Course.findOne({
      where: { id: course_id },
    });

    if (!course) {
      return res.status(404).json({ message: "Khóa học không tồn tại" });
    }

    const enroll = await db.Enrollment.findOne({
      where: { user_id, course_id },
    });

    if (enroll) {
      return res.status(200).json({ message: "Khóa học đã được user đăng ký" });
    } else {
      return res
        .status(200)
        .json({ code: 0, message: "Khóa học chưa được user đăng ký" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

const getPayment = async (req, res) => {
  const { create_user_id } = req.params;

  try {
    if (!create_user_id) {
      return res.status(404).json({ message: "Missing params" });
    }

    const payments = await db.Payment.findAll({
      where: { create_user_id },
      include: [
        {
          model: db.Course,
          attributes: ["title", "thumbnail"],
        },
        {
          model: db.User,
          attributes: ["name", "email"],
        },
      ],
    });

    res.status(200).json({
      code: 0,
      message: "Get Payment completed",
      data: payments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  paymentEnrollment,
  checkPayment,
  getPayment,
};
