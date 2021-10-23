const User = require("../models/User");
const jwt = require('jsonwebtoken');



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



// GET :: /user ==> get_users
module.exports.get_users = async (req, res) => {
  try {
    const user = await User.find({}).select('-password');
    res.status(201).json({ success:true, user });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ success:false, errors });
  }
}



// GET :: /user/:id ==> get_user_by_id
module.exports.get_user_by_id = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id).select('-password');
        res.status(201).json({ success:true, user });
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ success:false, errors });
    }
}



// POST :: /user/update/:id ==> update_user
module.exports.update_user = async (req, res) => {
    const id = req.params.id
    const data = {
        ...req.body,
        updatedBy:res.decodedToken.id
    }
    try {
        const user = await User.findByIdAndUpdate(id, data);
        res.status(201).json({ success:true, mssg:'user successfully updated' });
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ success:false, errors });
    }
}



// DEL :: /user/delete/:id ==> delete_user
module.exports.delete_user = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findByIdAndDelete(id);
        res.status(201).json({ success:true, user:user._id });
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ success:false, errors });
    }
}