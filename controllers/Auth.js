const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { validationAuth, validationAuthLogin } = require("../validations/auth");
const User = require("../models/UserModel");
dotenv.config();

const { SECRET_CODE } = process.env;

class AuthController {
  async register(req, res) {
    try {
      const { userName, email, password } = req.body;
      // * Bước 1: Validation values
      const { error } = validationAuth.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ messages: errors });
      }
      // Bước 2: Email người dùng đăng ký đã tồn tại trong DB hay chưa?
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(400).json({
          message: "Email này đã được đăng ký",
        });
      }

      // Bước 3: Mã hoá mật khẩu
      const hashPassword = await bcryptjs.hash(password, 10);
      await User.create({
        userName,
        email,
        password: hashPassword,
      });
      res.status(200).json({ message: "Đăng kí tài khoản thành công" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // [POST] /auth/login
  async login(req, res) {
    try {
      const { email, password } = req.body;
      // Bước 1: Validate email
      const { error } = validationAuthLogin.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ messages: errors });
      }
      // Bước 2: Kiểm tra xem email có trong db hay không?
      const checkEmail = await User.findOne({ email });
      if (!checkEmail) {
        return res.status(404).json({
          message: "Email này chưa đăng ký, bạn có muốn đăng ký không?",
        });
      }

      // Bước 3: Kiểm tra password
      const isMatch = await bcryptjs.compare(password, checkEmail.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Email or Password không đúng, vui lòng kiểm tra lại!",
        });
      }

      // Bước 4: Tạo ra token
      const token = jwt.sign({ id: checkEmail._id }, SECRET_CODE, {
        expiresIn: "1d",
      });

      res.json({
        message: "Đăng nhập tài khoản thành công!",
        token,
        user: {
          userName: checkEmail.userName,
          email: checkEmail.email,
        },
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
