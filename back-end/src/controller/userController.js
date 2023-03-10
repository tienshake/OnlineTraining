import db from "../models/index";

const getUser = async (req, res) => {
  const user = await db.User.findOne({
    where: { id: 1 },
    raw: true,
  });
  console.log(user);
  res.send(JSON.stringify(user));
  console.log("alo");
};

const createUser = async (req, res) => {
  console.log("alo");
  await db.User.create({
    name: req.body.name,
  });
};

export default {
  getUser,
  createUser,
};
