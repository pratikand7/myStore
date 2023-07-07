const express = require("express");
const db = require("../../db");
const utils = require("../../utils");

const router = express.Router();

router.get("/:productId", (request, response) => {
  const { productId } = request.params;
  const sql = `SELECT * FROM product_reviews WHERE productId = ${productId}`;
  db.conn.execute(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

router.post("/:productId", (request, response) => {
  const { productId } = request.params;
  const { rating, review } = request.body;
  const sql = `INSERT INTO product_reviews (userId, productId, rating, review) VALUES (${request.userId}, ${productId}, ${rating}, '${review}');`;
  db.conn.execute(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

module.exports = router;
