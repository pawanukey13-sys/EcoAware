const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  
  if (!authHeader || !authHeader.startsWith("Bearer "))
     {
    return res.status(401).json({
      message: "Access denied.Please login first",
      
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Inavlid or expired token.Please login again",
    });
  }
};
module.exports = verifyToken;
