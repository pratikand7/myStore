const express = require("express");
const db = require("../../db");
const utils = require("../../utils");

const router = express.Router();

router.get("/", (request, response) => {
  const sql = `SELECT * FROM brand`;
  db.conn.execute(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

router.post("/", (request, response) => {
  const { title, description } = request.body;
  const sql = `INSERT INTO brand VALUES(default, '${title}', '${description}', default);`;
  db.conn.execute(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

router.put("/:id", (request, response) => {
  const { id } = request.params;
  const { title, description } = request.body;
  const sql = `UPDATE brand SET title = '${title}', description = '${description}' WHERE id = ${id}`;
  db.conn.execute(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

router.delete("/:id", (request, response) => {
  const { id } = request.params;
  const sql = `DELETE FROM brand WHERE id = ${id};`;
  db.conn.execute(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

module.exports = router;
