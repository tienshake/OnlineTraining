import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

export default hashUserPassword;
