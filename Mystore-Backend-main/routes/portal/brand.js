const express = require("express");
const db = require("../../db");
const utils = require("../../utils");

const router = express.Router();

router.get("/:categoryId", (request, response) => {
  const { categoryId } = request.params;
  let sql = "";
  if (categoryId == 0) sql = `SELECT * FROM brand;`;
  else
    sql = `SELECT DISTINCT b.title, b.id FROM brand b INNER JOIN product p ON b.id = p.brandId WHERE p.categoryId = ${categoryId};`;
  db.conn.execute(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

module.exports = router;
