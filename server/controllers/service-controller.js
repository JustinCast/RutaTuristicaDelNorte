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
      let service = req.body;
      let query = {
        text: "SELECT save_service($1, $2, $3, $4, $5, $6)",
        values: [
          service.location,
          service.name,
          service.classification,
          service.additional_info,
          service.phone,
          service.email
        ]
      };
      client
        .query(query)
        .then(data => {
          let id_service = data.rows[0].save_service;
          ImagesCTRL.saveImages(service.images, Number(id_service))
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

module.exports = {
  saveService: saveService
};