
//variabel som använder express async handler (måste installeras) för att slippa skriva trycatch
const asyncHandler = require("express-async-handler");
//variabel att spara användarens token i (måste installeras)
const jwt = require("jsonwebtoken");

//hämta token från auth:bearer (token) header
const validateToken = asyncHandler(async (req, res, next) => {
  let token;

  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    // index 0  index 1
    //"bearer", "token....."
    token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401);
      throw new Error("Not auhtorized, no token");
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Not auhtorized");
      }
      console.log(decoded);
      req.user = decoded.user;
      next();
    });
  }
});
//verifiera token med access_token_secret i .env
//om giltigt = sätter req.user och kör next();
//om ogiltigt = skicka 401, stoppa

module.exports = validateToken;
