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
        .then(data => {
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

function deleteTour(req, res) {
  client = new pg.Client(db);

  client.connect(err => {
    if (err) {
      client.end();
      res.status(400).send(err);
      console.log(`err when connecting on deleteTour: ${err}`);
    } else {
      let query = {
        text: 'SELECT * FROM delete_tour($1);',
        values: [Number(req.params.id_tour)]
      };
      client
        .query(query)
        .then(data => {
          res.status(200).send();
          client.end();
        })
        .catch(err => {
          client.end();
          res.status(400).send(err);
          console.log(`err when query on deleteTour: ${err}`);
        });
    }
  });
}

/**
 * Functions to get all the services in the db
 * @param {*} req
 * @param {*} res
 */
function getTours(req, res) {
  client = new pg.Client(db);

  client.connect(err => {
    if (err) {
      client.end();
      res.status(400).send(err);
      console.log(`err when connecting on getTours: ${err}`);
    } else {
      let query = {
        text: "SELECT * FROM get_tours($1, $2);",
        values: [Number(req.query.limit), Number(req.query.offset)]
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
          console.log(`err when query on getTours: ${err}`);
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
        text: "SELECT * FROM get_tour_for_update($1);",
        values: [Number(req.params.id_tour)]
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
          console.log(`err when query on getTour: ${err}`);
        });
    }
  });
}

function deleteRelatedService(req, res) {
  client = new pg.Client(db);

  client.connect(err => {
    if (err) {
      client.end();
      res.status(400).send(err);
      console.log(`err when connecting on deleteTour: ${err}`);
    } else {
      let query = `UPDATE tour SET related_service = NULL`;
      client
        .query(query)
        .then(data => {
          res.status(204).send();
          client.end();
        })
        .catch(err => {
          client.end();
          res.status(400).send(err);
          console.log(`err when query on deleteTour: ${err}`);
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
        values: [Number(req.params.related_service)]
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

function updateTour(req, res) {
  client = new pg.Client(db);
  client.connect(err => {
    if (err) {
      client.end();
      console.log(`err when connecting on updateTour: ${err}`);
    } else {
      let query = {
        text: "SELECT * FROM update_tour($1, $2, $3, $4, $5, $6);",
        values: [
          req.body.name,
          req.body.description,
          req.body.email,
          req.body.related_service,
          req.body.phones,
          Number(req.params.id_tour)
        ]
      };
      client
        .query(query)
        .then(() => {
          ImagesCTRL.saveTourImages(req.body.imgs, req.params.id_tour);
          res.status(204).send();
          client.end();
        })
        .catch(err => {
          client.end();
          console.log(`err when query on updateTour: ${err}`);
        });
    }
  });
}

module.exports = {
  saveTour: saveTour,
  deleteTour: deleteTour,
  getTours: getTours,
  getTour: getTour,
  getRelatedTours: getRelatedTours,
  deleteRelatedService: deleteRelatedService,
  updateTour: updateTour
};
