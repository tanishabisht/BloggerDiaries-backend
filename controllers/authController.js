const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };  
  if (err.message === 'incorrect email') errors.email = 'That email is not registered'; // incorrect email  
  if (err.message === 'incorrect password') errors.password = 'That password is incorrect'; // incorrect password 
  if (err.code === 11000) {errors.email = 'that email is already registered'; return errors;} // duplicate email error  
  if (err.message.includes('user validation failed')) Object.values(err.errors).forEach(({properties}) => errors[properties.path]=properties.message); // validation errors
  return errors;
}



// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'my-secret-token-to-change-in-production', {expiresIn:maxAge});
};



// POST :: /auth/signup :: signup
module.exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const data = { name, email, password }
  try {
    const user = await User.create(data);
    res.status(201).json({ success:true, user });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(401).json({ success:false, errors });
  }
}



// POST :: /auth/login :: login
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}



// PATCH :: /auth/changepass/:id :: login
module.exports.changePassword = async (req, res) => {
  const id = req.params.id
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(id);
    const isAuth = await bcrypt.compare(currentPassword, user.password);
    if(isAuth) {
      const salt = await bcrypt.genSalt();
      const newHashPassword = await bcrypt.hash(newPassword, salt);
      const user = await User.findByIdAndUpdate(id, {password:newHashPassword});
      const token = createToken(user._id);
      res.status(200).json({ success:true, mssg:'Password updated successfully', token });
    } else {
      res.status(400).json({ success:false, mssg:'Password not correct' });
    }
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}