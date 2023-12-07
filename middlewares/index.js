const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/UserModel");
dotenv.config();
const { SECRET_CODE } = process.env;

const checkPermission = async (req, res, next) => {
  try {
    console.log("checkPermission");
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(403).json({ message: "Bạn chưa đăng nhập!" });
    }

    const decoded = jwt.verify(token, SECRET_CODE);
    console.log(decoded);

    const user = await User.findById(decoded.id);
    console.log(user);

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền thực hiện thao tác này!" });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Có lỗi xảy ra" });
  }
};
module.exports = checkPermission;
