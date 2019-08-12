const db = require("../config/db");
const pg = require("pg");
var client;

function saveTour(req, res) {
  client = new pg.Client(db);
  client.connect(err => {
    if (err) {
      client.end();
      console.log(`err when connecting on saveTour: ${err}`);
    } else {
      let query = {
        text: "SELECT * FROM save_tour($1, $2, $3, $4, $5)",
        values: [
          req.body.name,
          req.body.description,
          req.body.phones,
          req.body.email,
          req.body.related_service
        ]
      };
      client
        .query(query)
        .then(() => {
          res.status(200).send(true);
          client.end();
        })
        .catch(err => {
          client.end();
          console.log(`err when query on saveTour: ${err}`);
        });
    }
  });
}

module.exports = {
  saveTour: saveTour
};
