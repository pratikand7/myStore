const express = require("express");
const db = require("../../db");
const utils = require("../../utils");

const router = express.Router();

router.get("/", (request, response) => {
  const sql = `SELECT * FROM user_address WHERE userId = ${request.userId}`;
  db.conn.execute(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

router.post("/", (request, response) => {
  const { title, line1, line2, city, state, pinCode } = request.body;
  const sql = `INSERT INTO user_address (userId, title, line1, line2, city, state, pinCode) VALUES ('${request.userId}','${title}', '${line1}', '${line2}', '${city}', '${state}', '${pinCode}')`;
  db.conn.execute(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

router.put("/:id", (request, response) => {
  const { id } = request.params;
  const { title, line1, line2, city, state, pinCode } = request.body;
  const sql = `UPDATE user_address SET title = '${title}', line1 = '${line1}', line2 = '${line2}', city = '${city}', state = '${state}', pinCode = '${pinCode}' WHERE id = ${id}`;
  db.conn.execute(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

router.delete("/:id", (request, response) => {
  const { id } = request.params;
  const sql = `DELETE FROM user_address WHERE id = ${id}`;
  db.conn.execute(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

module.exports = router;
