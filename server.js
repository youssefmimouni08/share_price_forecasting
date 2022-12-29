const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");

const jwt = require("jsonwebtoken");

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3000/*"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);
connectDB();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/users", require("./routes/api/user"));
app.use("/auth/", require("./routes/api/auth"));
app.use("/api/", require("./routes/continent"));
app.use("/api/", require("./routes/region"));
app.use("/api/", require("./routes/province"));
app.use("/api/", require("./routes/country"));
app.use("/api/", require("./routes/trigger"));
app.use("/api/", require("./routes/eventType"));
app.use("/api/", require("./routes/object"));
app.use("/api/", require("./routes/history"));
app.use("/", require("./routes/api/google_auth"));
app.use("/", require("./routes/forecast_model"));
app.get("/", (req, res) => res.send("API Running"));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
