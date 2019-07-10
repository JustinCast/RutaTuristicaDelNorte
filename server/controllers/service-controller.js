const db = require('../config/db');

const pg = require("pg");
var client;

function saveService(req, res) {
  client = new pg.Client(config);

  client.connect(err => {
    if (err) {
      client.end();
      res.status(400).send(err);
      console.log(`err when connecting on getProducts: ${err}`);
    } else {
      let query = `SELECT * FROM get_products()`;
      client
        .query(query)
        .then(data => {
          res.status(200).send(data.rows);
          client.end();
        })
        .catch(err => {
          client.end();
          res.status(400).send(err);
          console.log(`err when query on getProducts: ${err}`);
        });
    }
  });
}
