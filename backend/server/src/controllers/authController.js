const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../services/userService");
// const { connection } = require("../configs/dbconfig");
const connection = require("../configs/dbconfig");
const mysql = require("mysql");

const login = async (req, res) => {
  const { user, password } = req.body;
  try {
    const search_query = `SELECT * FROM userdb.user_table WHERE user='${user}'`;
    await connection.query(search_query, async (err, result) => {
      // connection.release();
      if (err) throw err;
      console.log(result);
      if (result.length == 0) {
        res.json({
          status: "Fail",
          message: "Enter username or password",
        });
      } else {
        const hashedPassword = result[0].password;
        if (await bcrypt.compare(password, hashedPassword)) {
          const accessToken = generateAccessToken(user, user);
          if (!accessToken) {
            res.json({
              status: "fail",
              message: "Something went wrong, Please try again later.",
            });
          } else {
            res.json({
              status: "success",
              message: "Loggedin",
              accessToken,
            });
          }
        } else {
          res.json({
            status: "fail",
            message: " Enter correct  password",
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Internal server error" });
  }
};

const create_user = async (req, res) => {
  const { user, password } = req.body;
  if (user && password) {
    const hashedPassword = await bcrypt.hash(password, 10);
      const search_query = `SELECT * FROM userdb.user_table WHERE user='${user}'`;
      const insert_query = `INSERT INTO userdb.user_table (user , password) VALUES ('${user}','${hashedPassword}')`;
      try {
        await connection.query(search_query, async (err, result) => {
          if (err) throw err;
          if (result.length != 0) {
            // connection.release();
            res.json({ status: "fail", message: "!!!user already exists!!!!" });
          } else {
            await connection.query(insert_query, (err, result) => {
              connection.release();
              if (err) throw err;
              // res.sendStatus(201);
              res.json({
                status: "success",
                message: "User Created Successfully. Please login to continue!",
              });
            });
          }
        });
      } catch (error) {
        // console.log(error);
        res.json({ status: "error", message: error.message });
      }

  } else {
    res.json({ status: "fail", message: "Username and password is required" });
  }
};

module.exports = { login, create_user };
