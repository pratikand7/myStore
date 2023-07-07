const express = require("express");
const db = require("../../db");
const utils = require("../../utils");
const multer = require("multer");
const upload = multer({ dest: "./images" });
const fs = require("fs");

const router = express.Router();

router.get("/", (request, response) => {
  const sql = `SELECT p.*, c.title as categoryTitle, b.title as brandTitle FROM product p JOIN category c ON p.categoryId = c.id JOIN brand b ON p.brandId = b.id`;
  db.conn.execute(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

router.post("/", upload.single("image"), (request, response) => {
  const { title, description, price, categoryId, brandId } = request.body;
  const sql = `INSERT INTO product (title, description, price, categoryId, brandId, imageFile) VALUES ('${title}', '${description}', ${price}, ${categoryId}, ${brandId}, '${request.file.filename}');`;
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

router.put("/:id", upload.single("image"), (request, response) => {
  const { id } = request.params;
  const { title, description, price, categoryId, brandId } = request.body;
  const sql = `UPDATE product SET title = '${title}', description = "${description}", price = ${price}, categoryId = ${categoryId}, brandId = ${brandId}, imageFile = '${request.file.filename}' WHERE id = ${id}`;
  db.conn.execute(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

router.delete("/:id", (request, response) => {
  const { id } = request.params;
  const sql = `DELETE FROM product WHERE id = ${id};`;
  db.conn.execute(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

module.exports = router;
