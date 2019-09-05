const db = require("../config/db");
const pg = require("pg");
const ImagesCTRL = require("./image-controller");
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
          let id_tour = data.rows[0].id_tour;
          ImagesCTRL.saveTourImages(service.imgs, Number(id_tour));
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

function getRelatedTours(req, res) {
  client = new pg.Client(db);
  client.connect(err => {
    if (err) {
      client.end();
      console.log(`err when connecting on getRelatedTours: ${err}`);
    } else {
      let query = {
        text: "SELECT * FROM tour WHERE related_service = $1",
        values: [
          Number(req.params.related_service)
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
          console.log(`err when query on getRelatedTours: ${err}`);
        });
    }
  });
}

module.exports = {
  saveTour: saveTour,
  getRelatedTours: getRelatedTours
};
