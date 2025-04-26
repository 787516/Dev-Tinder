const express = require("express");
const { UserAuth, AdminAuth } = require("../middlewares/Auth");
const app = express();
const port = 7777;

app.use("/admin", AdminAuth );
app.use("/user", UserAuth );

app.get("/admin/login", (req, res) => {
  res.send("Data sent to the admin login page");
});

app.get("/user/login", (req, res) => {
  res.send("Data sent to the user login page");
}
);  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
