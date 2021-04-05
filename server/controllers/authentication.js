const User = require('../models').User;
const  {constants}  = require("../config/constants");
const {errorHandler} = require("../utils/errors");

module.exports = {
  async create(req, res) {
    try {
      const user = await User.create(req.body)
      return res.status(201).send(user)
    } catch (e) {
      res.status(400).send(e)
    }
  },

  async login(req, res){
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(403).json({
        status: "failed",
        data: "Please provide an email and password"
      });
    }

    try {
      const user = await User.findOne({ where:{email}});
      if (user === null) {
        res.status(401).json({
          type: "login",
          statusCode: 401,
          data: "Invalid credentials"
        });
      }

      const isMatch = await user.matchPassword(password);

      if (!isMatch) {
        res.status(401).json({
          type: "login",
          status: "failed",
          data: "Invalid credentials"
        });
      } else {

        sendTokenResponse(user, 200, res)
      }
    } catch (e) {
      return errorHandler(e, res);
    }
  },

  async getUser(req, res) {
    try {
      console.log(req.user)
      //delete req.user.password;
      res.status(200).json({
        status: "success",
        user: req.user
      })
    } catch (e) {
      console.log(`${e}`.red);
      errorHandler(e, res);
    }
  }
};

const sendTokenResponse = async(user, statusCode, res) => {
  // Create token
  const token = await user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + constants.JWT_EXPIRE * 24 * 60 * 60 * 100000
    ),
    httpOnly: true
  };

  if (constants.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .json({
      status: "success",
      token,
    });
};