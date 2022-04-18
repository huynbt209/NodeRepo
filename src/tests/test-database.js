const db = require("../models");
const Role = db.Role;
const User = db.User;
const Request = db.Request;
const hmacSHA512 = require('crypto-js/hmac-sha512.js');
const Base64 = require('crypto-js/enc-base64.js');
const sha256 = require('crypto-js/sha256.js');
const dotenv = require('dotenv');
dotenv.config();
const SECRET_KEY =process.env.SECRET_KEY;

async function createRole(){
  try{
    let role = new Role({
      role_name: 'admin test'
    });
    console.log(role);
    await role.save();
    console.log("createRole success");
  } catch(error){
    console.log("Error creating role", error);
  }
}

async function getRoles(){
  try {
    let roles = await Role.findAll();
    console.log(roles);
    console.log("getRoles success");
  } catch (error) {
    console.log("Error getRoles ", error);
  }
}

async function createUser(){
  try {
    let password = Base64.stringify(hmacSHA512(sha256('nvcgooner').toString(), SECRET_KEY));
    let user = new User({
      username: 'nvcgooner',
      password: password,
      full_name: 'Nguyễn Văn Cường',
      email: 'cuong@mail.com',
      time_off_total: '12',
      time_off_remain: '12',
      is_locked: false,
      role_id: 2,
    });
    console.log(user);
    await user.save();
    console.log("createUser success");
  } catch (error) {
    console.log("Error createUser ", error);
  }
}

async function getUsers(){
  try {
    let users = await User.findAll();
    console.log(users);
    console.log("getUsers success");
  } catch (error) {
    console.log("Error getUsers ", error)
  }
}

async function createRequest(){
  try {
    let request = new Request({
      full_name: "Nguyễn Văn Cường",
      request_type: "WFH",
      time_off: "morning 01/04/2022 - afternoon 01/04/2022",
      quantity: 0.5,
      content: "go home",
      status: "pending",
      user_id: 1,
    });
    console.log(request);
    await request.save();
    console.log("createRequest success");
  } catch (error) {
    console.log("Error createRequest ", error);
  }
}

async function getRequests(){
  try {
    let requests = await Request.findAll();
    console.log(requests);
    console.log("getRequests success");
  } catch (error) {
    console.log("Error getRequests ", error)
  }
}


async function test(){
  await createRole();
  await getRoles();
  await createUser();
  await getUsers();
  await createRequest();
  await getRequests();
}

test();
