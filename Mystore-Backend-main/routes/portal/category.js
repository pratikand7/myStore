const express = require("express");
const db = require("../../db");
const utils = require("../../utils");

const router = express.Router();

router.get("/", (request, response) => {
  const sql = `SELECT * FROM category`;
  db.conn.execute(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

module.exports = router;
