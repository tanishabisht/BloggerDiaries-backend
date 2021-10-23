const Blog = require("../models/Blog");


// POST :: /blogs ==> create_blogs
module.exports.create_blogs = async (req, res) => {
  const { userId, title, description, content } = req.body;
  const data = { 
    userId, 
    title,
    description,
    content, 
    createdBy:res.decodedToken.id
  }
  try {
    const blog = await Blog.create(data);
    res.status(201).json({ success:true, blog });
  }
  catch(err) {
    res.status(401).json({ success:false, err:err.message });
  }
}


// GET :: /blogs ==> get_blogs
module.exports.get_blogs = async (req, res) => {
  try {
    const blog = await Blog.find({});
    res.status(201).json({ success:true, blog });
  }
  catch(err) {
    res.status(400).json({ success:false, err });
  }
}


// GET :: /blogs/:id ==> get_blogs_by_id
module.exports.get_blogs_by_id = async (req, res) => {
    const id = req.params.id
    try {
        const blog = await Blog.findById(id);
        res.status(201).json({ success:true, blog });
    }
    catch(err) {
        res.status(400).json({ success:false, err:err.message });
    }
}


// PATCH :: /blogs ==> update_blogs_by_id
module.exports.update_blogs_by_id = async (req, res) => {
    const id = req.params.id
    const data = {
      ...req.body
    }
    try {
        const user = await Blog.findByIdAndUpdate(id, data);
        res.status(201).json({ success:true, mssg:'user successfully updated' });
    }
    catch(err) {
        res.status(400).json({ success:false, err });
    }
}


// DEL :: /blogs/:id ==> delete_blogs_by_id
module.exports.delete_blogs_by_id = async (req, res) => {
    const id = req.params.id
    try {
        const blog = await Blog.findByIdAndDelete(id);
        res.status(201).json({ success:true, blog:blog._id });
    }
    catch(err) {
        res.status(400).json({ success:false, err });
    }
}