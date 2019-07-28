const db = require("../config/db");
const ImagesCTRL = require("./image-controller");

const pg = require("pg");
var client;

function saveService(req, res) {
  client = new pg.Client(db);

  client.connect(err => {
    if (err) {
      client.end();
      res.status(400).send(err);
      console.log(`err when connecting on saveService: ${err}`);
    } else {
      let service = req.body.service;
      console.log(service)
      let query = {
        text: "SELECT save_service($1, $2, $3, $4, $5, $6, $7)",
        values: [
          service._location,
          service._name,
          service._classification,
          service._additional_info,
          service._email,
          service._website,
          service._phones,
          req.body._id_user
        ]
      };
      client
        .query(query)
        .then(data => {
          let id_service = data.rows[0].save_service;
          ImagesCTRL.saveImages(service._imgs, Number(id_service))
          res.status(200).send(true);
          client.end();
        })
        .catch(err => {
          client.end();
          res.status(400).send(err);
          console.log(`err when query on saveService: ${err}`);
        });
    }
  });
}

function getServices(req, res) {
  client = new pg.Client(db);

  client.connect(err => {
    if (err) {
      client.end();
      res.status(400).send(err);
      console.log(`err when connecting on getServices: ${err}`);
    } else {
      let query = {
        text: "SELECT * FROM get_services();"
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
          console.log(`err when query on getServices: ${err}`);
        });
    }
  });
}

module.exports = {
  saveService: saveService,
  getServices: getServices
};