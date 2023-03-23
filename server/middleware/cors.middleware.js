function cors(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization, Authorization, Origin, X-Requested-With, Accept");
  next();
}

module.exports = cors;
