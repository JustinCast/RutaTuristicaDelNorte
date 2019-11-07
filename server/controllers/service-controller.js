const db = require("../config/db");
const ImagesCTRL = require("./image-controller");
const RatesCTRL = require("./rates-controller");
const pg = require("pg");
//import paginate from 'jw-paginate';
var client;

/**
 * Function to call saveService proc in the db
 * At the same time this function calls ImageCTRL.saveImages and RatesCTRL.saveRates
 * @param {*} req
 * @param {*} res
 */
function saveService(req, res) {
  client = new pg.Client(db);

  client.connect(err => {
    if (err) {
      client.end();
      res.status(400).send(err);
      console.log(`err when connecting on saveService: ${err}`);
    } else {
      let service = req.body.service;
      let query = {
        text: "SELECT save_service($1, $2, $3, $4, $5, $6, $7, $8)",
        values: [
          service._location,
          service._name,
          service._classification,
          service._additional_info,
          service._email,
          service._website,
          service._phones,
          req.body._id_user,
        ],
      };
      client
        .query(query)
        .then(data => {
          let id_service = data.rows[0].save_service;
          ImagesCTRL.saveImages(service.imgs, Number(id_service));
          if (service._rates)
            RatesCTRL.saveRates(
              service._rates,
              "save_service_rates",
              id_service
            );

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

function deleteService(req, res) {
  client = new pg.Client(db);

  client.connect(err => {
    if (err) {
      client.end();
      res.status(400).send(err);
      console.log(`err when connecting on deleteService: ${err}`);
    } else {
      let query = {
        text: "SELECT * FROM delete_service($1);",
        values: [Number(req.params.id_service)],
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
          console.log(`err when query on deleteService: ${err}`);
        });
    }
  });
}

/**
 * updateService function
 * @param {*} req
 * @param {*} res
 */
function updateService(req, res) {
  client = new pg.Client(db);
  client.connect(err => {
    if (err) {
      client.end();
      res.status(400).send(err);
      console.log(`err when connecting on udpateService: ${err}`);
    } else {
      let updatedService = req.body;
      let query = {
        text: "SELECT * FROM update_service($1, $2, $3, $4, $5, $6, $7, $8);",
        values: [
          updatedService._location,
          updatedService._name,
          updatedService._classification,
          updatedService._additional_info,
          updatedService._email,
          updatedService._website,
          updatedService._phones,
          updatedService._id,
        ],
      };
      client
        .query(query)
        .then(() => {
          ImagesCTRL.updateServiceImages(
            updatedService.imgs,
            updatedService._id
          );
          client.end();
          res.status(200).send();
        })
        .catch(err => {
          client.end();
          res.status(400).send(err);
          console.log(`err when query on updateService: ${err}`);
        });
    }
  });
}

/**
 * Functions to get all the services in the db
 * @param {*} _
 * @param {*} res
 */
function getServices(req, res) {
  client = new pg.Client(db);

  client.connect(err => {
    if (err) {
      client.end();
      res.status(400).send(err);
      console.log(`err when connecting on getServices: ${err}`);
    } else {
      let query = {
        text: "SELECT * FROM get_services($1, $2, $3);",
        values: [
          Number(req.query.limit),
          Number(req.query.offset),
          req.query.filter,
        ],
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

/**
 * Functions to get all the services in the db
 * @param {*} req
 * @param {*} res
 */
function getService(req, res) {
  client = new pg.Client(db);

  client.connect(err => {
    if (err) {
      client.end();
      res.status(400).send(err);
      console.log(`err when connecting on getService: ${err}`);
    } else {
      let query = {
        text: `SELECT * FROM get_service_for_update($1)`,
        values: [Number(req.params.id_service)],
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

function getServiceRates(req, res) {
  client = new pg.Client(db);
  client.connect(err => {
    if (err) {
      client.end();
      res.status(400).send(err);
      console.log(`err when connecting on getServiceRates: ${err}`);
    } else {
      let query = {
        text: `SELECT * FROM get_service_rates($1)`,
        values: [req.params.id_service],
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
          console.log(`err when query on getServiceRates: ${err}`);
        });
    }
  });
}

/**
 * @param {*} req
 * @param {*} res
 */
function getServiceNameId(req, res) {
  client = new pg.Client(db);
  client.connect(err => {
    if (err) {
      client.end();
      res.status(400).send(err);
      console.log(`err when connecting on getServicesNameId: ${err}`);
    } else {
      let query = {
        text: `SELECT * FROM get_service_name_id($1, $2)`,
        values: [req.params.id_user, req.params.name],
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
          console.log(`err when query on getServicesNameId: ${err}`);
        });
    }
  });
}

/**
 *
 * @param {*} _
 * @param {*} res
 */
function getServicesCount(req, res) {
  client = new pg.Client(db);
  client.connect(err => {
    if (err) {
      client.end();
      res.status(400).send(err);
      console.log(`err when connecting on getServicesCount: ${err}`);
    } else {
      let query;
      if (req.query.column === "undefined")
        query = "SELECT COUNT(*) FROM service;";
      else
        query = `SELECT COUNT(*) FROM service WHERE classification = '${req.query.value}';`;
      client
        .query(query)
        .then(data => {
          res.status(200).send(data.rows[0].count);
          client.end();
        })
        .catch(err => {
          client.end();
          res.status(400).send(err);
          console.log(`err when query on getServicesCount: ${err}`);
        });
    }
  });
}

function getServiceNames(req, res) {
  client = new pg.Client(db);
  client.connect(err => {
    if (err) {
      client.end();
      res.status(400).send(err);
      console.log(`err when connecting on getServiceNames: ${err}`);
    } else {
      let query = {
        text: `SELECT 
              service.id, 
              service.name FROM service JOIN user_service us ON us.id_user = $1 AND us.id = service.id`,
        values: [req.params.id_user],
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
          console.log(`err when query on getServicesCount: ${err}`);
        });
    }
  });
}

module.exports = {
  saveService: saveService,
  updateService: updateService,
  getServices: getServices,
  getService: getService,
  deleteService: deleteService,
  getServiceNameId: getServiceNameId,
  getServicesCount: getServicesCount,
  getServiceRates: getServiceRates,
  getServiceNames: getServiceNames,
};
