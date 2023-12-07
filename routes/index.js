// code basec\
const books = require("./book.js");
const auth = require("./auth");
function routes(app) {
  app.use("/books", books)
  app.use("/auth", auth)

}
module.exports = routes;