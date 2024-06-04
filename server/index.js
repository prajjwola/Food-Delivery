const express = require('express')
const dbConnect = require('./src/db/connection')
dbConnect()
const app = express()
require('dotenv').config()
//body parser
app.use(express.json())
const mongoose = require('mongoose')
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const saltRounds = 10;


const userSchema = new Schema({
  phoneNumber: String, // String is shorthand for {type: String}
  fullName: String,
  email: String,
  },
);
const User = mongoose.model('User', userSchema);
const port = process.env.PORT || 8000

app.post('/register', async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.password,saltRounds)
  console.log(hashPassword , req.body)
  const phoneExist  = await User.exists({phoneNumber: req.body.phoneNumber})
  const emailExist  = await User.exists({email: req.body.email})

  if(phoneExist ){
   return res.json({msg: "Phone Number is taken!"})
  }else if(emailExist){
    return res.json({msg: "Email is taken!"})
  }
  await User.create(req.body)
  return res.json({msg: "User registered"})
})

app.post('/login',async(req,res)=>{
})

app.get('/users',async(req,res)=>{
  const data = await User.find()
  res.json(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})