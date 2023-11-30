import jwt from "jsonwebtoken";

//😊
export const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers.token;
  if (!authorizationHeader) throw new Error("You are not authenticated!");
  const token = authorizationHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) throw new Error("Token is not valid!");
    req.user = user;
    next();
  });
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!(req.user.id === req.params.id || req.user.isAdmin))
      throw new Error("You are not allowed to do that!");
    next();
  });
};

export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user.isAdmin) throw new Error("You are not allowed to do that!");
    next();
  });
};
