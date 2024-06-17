const connection = require("../configs/dbconfig");

const getUsers = async (req, res) => {
  try {
    const sql = "SELECT user as username FROM user_table";
    connection.query(sql, (err, result) => {
      if (err) {
        res
          .status(500)
          .json({ status: "fail", message: "Internal Server Error" });
        return;
      }
      res.json({
        status: "success",
        message: "Data received successfully",
        data_list: result,
      });
    });
  } catch (error) {
    res.json({
      status: "fail",
      message: "Failed to get users",
    });
  }
};

module.exports = { getUsers };
