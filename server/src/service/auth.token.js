const jwt = require('jsonwebtoken');
require("dotenv").config();

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "Không vào được. Thiếu token",
    });
  }
  token = token.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, dataDecoded) => {
    if (err) {
      return res.status(401).json({
        message: "Token không hợp lệ",
      });
    } else {
      req.token = token;
      req.user = dataDecoded;
      next();
    }
  });
};

const combinedAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "1" || req.user.role === "0") { // 1 là admin, 0 là user
      next();
    } else {
      return res.status(403).json({
        message: "Bạn không có quyền truy cập",
      });
    }
  });
};

module.exports = { verifyToken, combinedAuth };