const express = require("express");
const app = express();
const port = 7777;

// app.get('/', (req, res) => {
//     res.send('Home page');
// })

// app.get('/test', (req, res) => {
//     res.send('Test page');
// })

// this will only handle the GET method
app.get("/hellow", (req, res) => {
  res.send({ username: "John Doe", age: 30 });
});

app.get("/hellow", (req, res) => {
  res.send("Hello World!");
});

app.post("/hellow", (req, res) => {
  res.send("data posted successfully");
});

app.delete("/hellow", (req, res) => {
  res.send("data deleted successfully");
});

//this will match all the HTTP API calls to Test
app.use("/test", (req, res, next) => {
  console.log("Test middleware");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
