const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
// const getToken = require("../utils/helpers.js");
const {getToken} = require("../utils/helpers.js");
const { Cookie } = require("express-session");
// 
// This POST route will help to register a user
router.post("/register", async (req, res) => {//
  
  const { firstName, lastName, email , password } = req.body;

  // Step 2 : Does a user with this email already exist? If yes, we throw an error.
  // const user = await User.findOne({ email: email });
  // if (user) {
  //   // status code by default is 200
  //   return res
  //     .status(403)
  //     .json({ error: "A user with this email already exists"});
  // }
  // This is a valid request

  // Step 3: Create a new user in the DB

  // Step 3.1 : We do not store passwords in plain text.
  // xyz: we convert the plain text password to a hash.
  // xyz ->   jfkaghajsflgsak
  // Mv hash of xyz depends on 2 parameters.
  // If I keep those 2 parameters same, xyz ALWAYS gives the same hash.
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUserData = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
  };
  console.log(newUserData)
  const newUser = await User.create(newUserData);

  // Step 4: We want to create the token to return to the user
  const token = await getToken(email,newUser);
  console.log("Token is: "+token);
   // Step 5: Return the result to the user
  const userToReturn = { ...newUser.toJSON(), token};
   delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

router.post("/login", async (req, res) => {
  // Step 1: Get email and password sent by user from req.body
  console.log("hhhhhh")
  const { email, password } = req.body;
  // Step 2: Check if a user with the guen email exists. If not, the credentials are invalid.
  const user = await User.findOne({ email: email });
  console.log(user)
  if (!user) {
    return res.status(403).json({ err: "Invalid credentials" });
  }

  // Step 3: If the user exists, check if the password is correct. If not, the credentials afre invalid.
  // This is a tricky step. why ? because we have stored the original password in a hashed form, which we can not use to get back the password.
  // I cannot do: if(password=== user.password)
  // bcrypt.compare enables us to compare 1 password in plaintext(pasword from req.body) to a hashed password(the one in our db) securely.
  const isPasswordValid = await bcrypt.compare(password, user.password);
  // This will be true or false.
  if (!isPasswordValid) {
    return res.status(403).json({ err: "Invalid credentialst" });
  }

  // Step 4: If the credentials are correct, return a token to the user.
  const token = await getToken(user.email, user);
  console.log(token)
  const userToReturn = { ...user.toJSON(), token };
  // Cookies.set("Data",userToReturn)
  // res.cookie('Data', userToReturn).send('cookie set'); //Sets name = express
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

module.exports = router;
