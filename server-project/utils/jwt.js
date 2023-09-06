const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();

const createAccessToken = (user) => {
  console.log(user);
  const expToken = new Date();
  expToken.setHours(expToken.getHours() + 3);
  const payload = {
    token_type: "access",
    user_id: user._id,
    iat: Date.now(),
    exp: expToken.getTime(),
  };

  console.log("accessToken del jwt: ", payload.user_id);
  return jwt.sign(payload, process.env.JWT_SECRET_KEY);
};

const createRefreshToken = (user) => {
  const expToken = new Date();
  expToken.setHours(expToken.getHours() + 3);
  const payload = {
    token_type: "refresh",
    user_id: user._id,
    iat: Date.now(),
    exp: expToken.getTime(),
  };
};

const verify = (token) => {
  return jwt.verify(token, JWT_SECRET_KEY);
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  verify,
};