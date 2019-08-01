const db = require("../config/db");
const pg = require("pg");
var client;

function login(req, res) {
  client = new pg.Client(db);
  client.connect(err => {
    if (err) {
      client.end();
      res.status(400).send(err);
      console.log(`err when connecting on login: ${err}`);
    } else {
      let query = {
        text: "SELECT * FROM login($1, $2);",
        values: [
          req.body.username,
          req.body.password
        ]
      };
      client
        .query(query)
        .then(data => {
          res.status(200).send(data.rows[0]);
          client.end();
        })
        .catch(err => {
          client.end();
          res.status(400).send(err);
          console.log(`err when query on login: ${err}`);
        });
    }
  });
}

function getServicesByUser(req, res) {
  client = new pg.Client(db);
  client.connect(err => {
    if (err) {
      client.end();
      res.status(400).send(err);
      console.log(`err when connecting on getServicesByUser: ${err}`);
    } else {
      let query = {
        text: "SELECT * FROM get_services_by_user($1);",
        values: [
          req.params.id
        ]
      };
      client
        .query(query)
        .then(data => {
          res.status(200).send(data.rows);
          client.end();
        })
        .catch(err => {
          client.end();
          res.status(400).send(err);
          console.log(`err when query on getServicesByUser: ${err}`);
        });
    }
  });
}

function getToursByUser(req, res) {
  client = new pg.Client(db);
  client.connect(err => {
    if (err) {
      client.end();
      res.status(400).send(err);
      console.log(`err when connecting on getToursByUser: ${err}`);
    } else {
      let query = {
        text: "SELECT * FROM get_tours_by_user($1);",
        values: [
          req.params.id
        ]
      };
      client
        .query(query)
        .then(data => {
          res.status(200).send(data.rows[0]);
          client.end();
        })
        .catch(err => {
          client.end();
          res.status(400).send(err);
          console.log(`err when query on getToursByUser: ${err}`);
        });
    }
  });
}

module.exports = {
  login: login,
  getServicesByUser: getServicesByUser,
  getToursByUser: getToursByUser
}