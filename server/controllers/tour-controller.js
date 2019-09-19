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
      let tour = req.body;
      let query = {
        text: "SELECT * FROM save_tour($1, $2, $3, $4, $5, $6)",
        values: [
          tour.name,
          tour.description,
          tour.phones,
          tour.email,
          tour.id_user,
          tour.related_service
        ]
      };
      client
        .query(query)
        .then((data) => {
          let id_tour = data.rows[0].save_tour;
          ImagesCTRL.saveTourImages(tour.imgs, Number(id_tour));
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

/**
 * Functions to get all the services in the db
 * @param {*} req
 * @param {*} res
 */
function getTour(req, res) {
  client = new pg.Client(db);

  client.connect(err => {
    if (err) {
      client.end();
      res.status(400).send(err);
      console.log(`err when connecting on getTour: ${err}`);
    } else {
      let query = {
        text: `SELECT name,
                      description,
                      email,
                      related_service,
                      phones
               FROM tour WHERE id = $1`,
        values: [req.params.id_tour]
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
          console.log(`err when query on getServices: ${err}`);
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
        text: "SELECT * FROM get_related_tours($1);",
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
  getTour: getTour,
  getRelatedTours: getRelatedTours
};
