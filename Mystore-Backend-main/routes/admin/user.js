const express = require("express");
const db = require("../../db");
const utils = require("../../utils");
const config = require("../../config");

const router = express.Router();

router.get("/", (request, response) => {
  const sql = "SELECT * FROM user;";
  db.conn.execute(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

router.put("/change-status/:id", (request, response) => {
  const { id } = request.params;
  const { status } = request.body;
  const sql = `UPDATE user SET status = ${status} WHERE id = ${id}`;
  db.conn.execute(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

module.exports = router;
