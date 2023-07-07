const express = require("express");
const utils = require("../../utils");
const db = require("../../db");
const mysql2 = require("mysql2/promise");
const { query } = require("express");
const router = express.Router();

const pool = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "brk231",
  database: "mystore",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

router.get("/", (request, response) => {
  const sql = `SELECT * FROM user_order WHERE userId = ${request.userId}`;
  db.conn.query(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

router.delete("/cancel/:id", (request, response) => {
  const { id } = request.params;
  const sql = `UPDATE user_order SET orderStatus = 6 WHERE id = ${id}`;
  db.conn.query(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

router.post("/", (request, response) => {
  const { addressId } = request.body;

  (async () => {
    const sql1 = `SELECT * FROM cart WHERE userId = ${request.userId}`;
    const [cartProducts] = await pool.query(sql1);

    let totalAmount = 0;
    cartProducts.forEach((product) => {
      totalAmount += product.price * product.quantity;
    });

    const sql2 = `INSERT INTO user_order (userId, addressId, totalAmount) VALUES (${request.userId}, ${addressId}, ${totalAmount});`;
    const [result] = await pool.query(sql2);

    const orderId = result.insertId;
    cartProducts.forEach(async (product) => {
      const sql3 = `INSERT INTO user_order_details (orderId, productId, price, quantity, totalAmount) VALUES (${orderId},${
        product.productId
      },${product.price},${product.quantity},${
        product.price * product.quantity
      });`;
      await pool.query(sql3);
    });

    const sql4 = `DELETE FROM cart WHERE userId = ${request.userId}`;
    await pool.query(sql4);

    response.send({ status: "success" });
  })();
});

router.get("/preview/:id", (request, response) => {
  const id = request.params.id;
  const sql = `SELECT p.title, p.imageFile, c.title as category, b.title as brand, o.price, o.quantity, o.totalAmount FROM user_order_details o INNER JOIN product p ON o.productId = p.id INNER JOIN category c ON p.categoryId = c.id INNER JOIN brand b ON p.brandId = b.id WHERE o.orderId = ${id};`;
  db.conn.query(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

module.exports = router;
