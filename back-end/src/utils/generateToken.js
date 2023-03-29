import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateAccessToken = (user) => {
  const accessToken = jwt.sign(
    {
      id: user.id,
      role_id: user.role_id,
      email: user.email,
      role: user.role.role_name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
  return accessToken;
};

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    {
      id: user.id,
      role_id: user.role_id,
      email: user.email,
      role: user.role.role_name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  return refreshToken;
};

export default {
  generateAccessToken,
  generateRefreshToken,
};
