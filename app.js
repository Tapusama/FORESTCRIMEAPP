const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const SqlConnector = require("./src/connector/sql_connector")
dotenv.config();

const app = express();
app.use(express.json({ extended: true }));
app.use(morgan(process.env.ENV));

const port = 3000;

const router = require("./src/routes/index");

app.use("/",router);

const startServer = () => {
  try {
    // await dbConnection()
    app.listen(port, () => {
      console.log(`Server is listening on port,${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};
startServer();


// const sql =new SqlConnector();
// sql.connect()