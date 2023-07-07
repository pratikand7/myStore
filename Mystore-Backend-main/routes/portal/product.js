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

router.get("/:id", (request, response) => {
  const { id } = request.params;
  const sql = `SELECT p.*, c.title as categoryTitle, b.title as brandTitle FROM product p JOIN category c ON p.categoryId = c.id JOIN brand b ON p.brandId = b.id WHERE p.id = ${id}`;
  db.conn.execute(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

router.get("/search/:text", (request, response) => {
  const { text } = request.params;
  const sql = `SELECT p.*, c.title as categoryTitle, b.title as brandTitle FROM product p JOIN category c ON p.categoryId = c.id JOIN brand b ON p.brandId = b.id WHERE p.title LIKE '%${text}%' OR p.description LIKE '%${text}%'`;
  db.conn.execute(sql, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

router.post("/filter", (request, response) => {
  const { categoryId, brandId } = request.body;
  let categoryClause = "",
    brandClause = "";

  if (categoryId != 0) categoryClause = ` p.categoryId = ${categoryId}`;
  if (brandId != 0) brandClause = ` p.brandId = ${brandId}`;

  let whereClause = "";
  if (categoryClause.length > 0 || brandClause.length > 0) {
    whereClause = categoryClause;
    if (whereClause.length == 0) whereClause = brandClause;
    else {
      if (brandClause.length > 0)
        whereClause = categoryClause + " and " + brandClause;
    }
    whereClause = " WHERE" + whereClause;
  }

  const sql = `SELECT p.*, c.title as categoryTitle, b.title as brandTitle FROM product p JOIN category c ON p.categoryId = c.id JOIN brand b ON p.brandId = b.id ${whereClause}`;
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
