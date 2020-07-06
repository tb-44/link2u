var mysql = require("mysql");
var isConnectionPool = true;
var connection;

if (isConnectionPool == false) {
  connection = mysql.createConnection({
    host: "linkedinproject.cfs5kthazndf.us-west-1.rds.amazonaws.com",
    user: "nrupa16",
    password: "16Jan91*",
    database: "linkedin_project",
    port: 3306,
  });
} else {
  connection = mysql.createPool({
    connectionLimit: 20,
    host: "linkedinproject.cfs5kthazndf.us-west-1.rds.amazonaws.com",
    user: "nrupa16",
    password: "16Jan91*",
    database: "linkedin_project",
    port: 3306,
  });
}

function insertQuery(query, post) {
  console.log("query = ", query, post);
  return new Promise(async (resolve, reject) => {
    if (isConnectionPool == false) {
      connection.query(query, post, function (error, results) {
        if (error) reject(error);
        else resolve(results);
      });
    } else {
      connection.getConnection(function (err, con) {
        if (err) {
          // åcon.release();
          console.log("Could not get Pool Connection Object!!");
          reject();
        } else {
          console.log("Getting Pool Connection!");
          con.query(query, post, function (error, results) {
            if (error) {
              con.release();
              reject(error);
            } else {
              con.release();
              resolve(results);
            }
          });
        }
      });
    }
  });
}

function selectQuery(query, post) {
  console.log("query = ", query, post);
  return new Promise(async (resolve, reject) => {
    if (isConnectionPool == false) {
      connection.query(query, post, function (error, results) {
        if (error) reject(error);
        else resolve(results);
      });
    } else {
      connection.getConnection(function (err, con) {
        if (err) {
          con.release();
          console.log("Could not get Pool Connection Object!!", err);
          reject(err);
        } else {
          console.log("Getting Pool Connection!");
          con.query(query, post, function (error, results) {
            if (error) {
              con.release();
              console.log("some err", err);
              reject(error);
            } else {
              con.release();
              resolve(results);
            }
          });
        }
      });
    }
  });
}

function updateQuery(query, post) {
  console.log("query = ", query, post);
  return new Promise(async (resolve, reject) => {
    if (isConnectionPool == false) {
      connection.query(query, post, function (error, results) {
        if (error) reject(error);
        else resolve(null, results);
      });
    } else {
      connection.getConnection(function (err, con) {
        if (err) {
          con.release();
          console.log("Could not get Pool Connection Object!!");
          reject(err);
        } else {
          console.log("Getting Pool Connection!");
          con.query(query, post, function (error, results) {
            if (error) {
              con.release();
              reject(error);
            } else {
              con.release();
              resolve(results);
            }
          });
        }
      });
    }
  });
}

function deleteQuery(query, post) {
  console.log("query = ", query, post);
  return new Promise(async (resolve, reject) => {
    if (isConnectionPool == false) {
      connection.query(query, post, function (error, results) {
        if (error) reject(error);
        else resolve(results);
      });
    } else {
      connection.getConnection(function (err, con) {
        if (err) {
          con.release();
          console.log("Could not get Pool Connection Object!!", err);
          reject(err);
        } else {
          console.log("Getting Pool Connection!");
          con.query(query, post, function (error, results) {
            if (error) {
              con.release();
              console.log("some err", err);
              reject(error);
            } else {
              con.release();
              resolve(results);
            }
          });
        }
      });
    }
  });
}

function closeConnection() {
  console.log("state: ", connection.state);
  if (connection.state == "connected" || connection.state == "authenticated") {
    connection.end();
  }
}

function startConnection() {
  if (isConnectionPool == false) {
    connection.connect();
  }
}

module.exports = {
  insertQuery: insertQuery,
  closeConnection: closeConnection,
  selectQuery: selectQuery,
  updateQuery: updateQuery,
  deleteQuery: deleteQuery,
  startConnection: startConnection,
};
