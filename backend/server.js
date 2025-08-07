const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

const authRoutes = require("./routes/auth.routes");
const forumRoutes = require("./routes/forum.routes")

const server = express();
server.use(cors());
server.use(express.json());

server.use("/auth/", authRoutes);
server.use("/forum/", forumRoutes);

server.get("/", (req, res) => {
    console.log('OK')
    res.send("OK!");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
