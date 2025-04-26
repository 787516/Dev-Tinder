//middleware to check if the user is authenticated

const AdminAuth =
  ("/admin",
  (req, res, next) => {
    console.log("Admin Auth Middleware");
    const Token = "xyz";
    const adminToken = Token === "xyz";
    if (!adminToken) {
      return res.status(401).send("Unauthorized access");
    } else {
      next();
    }
  });

const UserAuth =
  ("/user",
  (req, res, next) => {
    console.log("User Auth Middleware");
    const Token = "xyzq";
    const userToken = Token === "xyz";
    if (!userToken) {
      return res.status(401).send("Unauthorized access");
    } else {
      next();
    }
  });

module.exports = { UserAuth, AdminAuth };
