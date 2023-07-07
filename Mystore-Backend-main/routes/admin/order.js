const express = require("express");
const db = require("../../db");
const utils = require("../../utils");

const router = express.Router();

router.get("/", (request, response) => {
  const sql = `SELECT * FROM user_order;`;
  db.conn.query(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

router.put("/update-status/:id", (request, response) => {
  const { id } = request.params;
  const { orderStatus } = request.body;
  const sql = `UPDATE user_order SET orderStatus = ${orderStatus} WHERE id = ${id}`;
  db.conn.query(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

router.get("/details/:id", (request, response) => {
  const id = request.params.id;
  const sql = `SELECT p.title, p.imageFile, c.title as category, b.title as brand, o.price, o.quantity, o.totalAmount FROM user_order_details o INNER JOIN product p ON o.productId = p.id INNER JOIN category c ON p.categoryId = c.id INNER JOIN brand b ON p.brandId = b.id WHERE o.orderId = ${id};`;
  db.conn.query(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

module.exports = router;
