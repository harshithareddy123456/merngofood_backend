const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const mongoDB = require("./db");
mongoDB();

// CORS middleware
app.use(
  cors({
    origin: ["https://merngofood-frontend.vercel.app/"],
    methods: ["POST", "GET"], // Note: Use 'methods' instead of 'method'
    credentials: false,
  })
);

app.use(express.json());

// Define your routes after setting up middleware
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/Orderdata"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
