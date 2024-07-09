const { encryptPassword } = require("./../helpers/password_encrypter");
const SqlConnector = require("./../connector/sql_connector");

const sql = new SqlConnector();

const registerUser = async (req, res) => {
  console.log(req.body);
  const { username, password, mobile, email } = req.body;

  if (!username || !password || !mobile || !email) {
    return res.status(400).json({ message: "Incomplete request" });
  }

  try {
    await sql.connect();

    const findByUserNameQuery = "SELECT * FROM users WHERE username = ?";
    const insertUserQuery =
      "INSERT INTO users (username, password, mobile, email) VALUES (?, ?, ?, ?)";

    const results = await sql.execute_query(findByUserNameQuery, [username]);

    if (results.length > 0) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashed_password = await encryptPassword(password);

    await sql.execute_query(insertUserQuery, [
      username,
      hashed_password,
      mobile,
      email,
    ]);

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

const logInUser = async (req, res) => {
  console.log(req.body);
  const { username, password, mobile, email } = req.body;

  if (!username || !password || !mobile || !email) {
    return res.status(400).json({ message: "Incomplete request" });
  }

  try {
    await sql.connect();

    const findByUserNameQuery = "SELECT * FROM users WHERE username = ?";
    const insertUserQuery =
      "INSERT INTO users (username, password, mobile, email) VALUES (?, ?, ?, ?)";

    const results = await sql.execute_query(findByUserNameQuery, [username]);

    if (results.length > 0) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashed_password = await encryptPassword(password);

    await sql.execute_query(insertUserQuery, [
      username,
      hashed_password,
      mobile,
      email,
    ]);

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};
module.exports = { registerUser };
