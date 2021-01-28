require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: process.env.SDB_PASS,
    database: "userLogin",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    use_env_variable: process.env.JAWSDB_URL,
    dialect: "mysql",
  },
};
