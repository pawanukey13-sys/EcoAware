require("dotenv").config();

const app = require("./src/app");
const dns = require("dns");
const connectDB = require("./src/databse/db");
const cors = require("cors");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

connectDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`server running on port ${PORT}`);
});
