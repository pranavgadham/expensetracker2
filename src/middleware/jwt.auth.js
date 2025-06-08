import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  try {
    const jwtToken = req.cookies.jwttocken;
    const { userId, email } = jwt.verify(jwtToken, process.env.jwtKey);
    if (userId && email) {
      req.user = { userId, email };
      next();
    } else {
      return res.json({
        success: false,
        message: "Unauthorized Login Required",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "Unauthorized",
      error: err.message,
    });
  }
};

export default jwtAuth;
