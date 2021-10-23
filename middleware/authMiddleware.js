const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config()


const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) => {
      if (err) {
        res.status(401).json({mssg: err.message, err});
      } else {
        res.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({mssg:'token does not exist'});
  }
};



// check current user
const checkUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, 'my-secret-token-to-change-in-production', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


module.exports = { requireAuth, checkUser };