const express = require("express");
const db = require("../../db");
const utils = require("../../utils");
const fs = require("fs");

const router = express.Router();

router.get("/", (request, response) => {
  const sql = `SELECT c.*, p.title as productTitle, p.description as productDescription, p.imageFile as imageFile, cat.title as categoryTitle, b.title as brandTitle FROM cart c JOIN product p ON c.productId = p.id JOIN category cat ON p.categoryId = cat.id JOIN brand b ON p.brandId = b.id WHERE userId = ${request.userId}`;
  db.conn.execute(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

router.post("/", (request, response) => {
  const { productId, price, quantity } = request.body;
  const sql = `INSERT INTO cart (userId, productId, price, quantity) VALUES (${request.userId}, ${productId}, ${price}, ${quantity})`;
  db.conn.execute(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

router.put("/:cartId", (request, response) => {
  const { cartId } = request.params;
  const { quantity } = request.body;
  const sql = `UPDATE cart SET quantity = ${quantity} WHERE id = ${cartId}`;
  db.conn.execute(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

router.delete("/:cartId", (request, response) => {
  const { cartId } = request.params;
  const sql = `DELETE FROM cart WHERE id = ${cartId}`;
  db.conn.execute(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

router.get("/image/:filename", (request, response) => {
  const { filename } = request.params;
  const path = __dirname + `/../../images/${filename}`;
  const data = fs.readFileSync(path);
  response.send(data);
});

module.exports = router;
