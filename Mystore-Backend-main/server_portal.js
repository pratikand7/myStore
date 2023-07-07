const express = require("express");
const bodyParser = require("body-parser");
const utils = require("./utils");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const config = require("./config");

const userRouter = require("./routes/portal/user");
const productRouter = require("./routes/portal/product");
const categoryRouter = require("./routes/portal/category");
const brandRouter = require("./routes/portal/brand");
const cartRouter = require("./routes/portal/cart");
const addressRouter = require("./routes/portal/address");
const orderRouter = require("./routes/portal/order");
const productReviewRouter = require("./routes/portal/product-review");

function authorizeUser(request, response, next) {
  if (
    request.url == "/user/signup" ||
    request.url == "/user/login" ||
    request.url.startsWith("/user/image") ||
    request.url.startsWith("/cart/image") ||
    request.url.startsWith("/product/image")
  )
    next();
  else {
    const { token } = request.headers;
    if (!token) {
      response.status(401);
      response.send(utils.createResult("Token is missing !"));
    }
    try {
      const result = jwt.verify(token, config.secret);
      request.userId = result.id;
      next();
    } catch (ex) {
      response.status(401);
      response.send(utils.createResult("Invalid Token"));
    }
  }
}

const app = express();
app.use(cors("*"));
app.use(authorizeUser);
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/brand", brandRouter);
app.use("/cart", cartRouter);
app.use("/address", addressRouter);
app.use("/order", orderRouter);
app.use("/review", productReviewRouter);

app.listen(7100, "localhost", () => {
  console.log("Server started on port 7100");
});
