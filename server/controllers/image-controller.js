const db = require("../config/db");

const pg = require("pg");
var client;

function saveImages(images, id_service) {
  client = new pg.Client(db);

  client.connect(err => {
    if (err) {
      client.end();
      console.log(`err when connecting on saveImages: ${err}`);
    } else {
      images.forEach(image => {
        let query = {
          text: "SELECT * FROM save_image($1, $2)",
          values: [image, id_service]
        };
        client.query(query).catch(err => {
          client.end();
          console.log(`err when query on saveImages: ${err}`);
        });
      });
    }
  });
}

function deleteTourImage(req, res) {
  client = new pg.Client(db);

  client.connect(err => {
    if (err) {
      client.end();
      console.log(`err when connecting on deleteTourImage: ${err}`);
    } else {
      let query = {
        text: "DELETE * FROM tour_images WHERE url = $1",
        values: [req.params.img]
      };
      client.query(query)
      .then(() => res.status(200).send())
      .catch(err => {
        client.end();
        console.log(`err when query on deleteTourImage: ${err}`);
      });
    }
  });
}

function deleteServiceImage(req, res) {
  client = new pg.Client(db);

  client.connect(err => {
    if (err) {
      client.end();
      console.log(`err when connecting on deleteServiceImage: ${err}`);
    } else {
      let query = {
        text: "DELETE * FROM images WHERE url = $1",
        values: [req.params.img]
      };
      client
        .query(query)
        .then(() => res.status(200).send())
        .catch(err => {
          client.end();
          console.log(`err when query on deleteServiceImage: ${err}`);
        });
    }
  });
}

function saveTourImages(images, id_tour) {
  client = new pg.Client(db);

  client.connect(err => {
    if (err) {
      client.end();
      console.log(`err when connecting on saveTourImages: ${err}`);
    } else {
      images.forEach(image => {
        let query = {
          text: "SELECT * FROM save_tour_image($1, $2)",
          values: [image, id_tour]
        };
        client.query(query).catch(err => {
          client.end();
          console.log(`err when query on saveTourImages: ${err}`);
        });
      });
    }
  });
}

function getServiceImages(req, res) {
  client = new pg.Client(db);

  client.connect(err => {
    if (err) {
      client.end();
      console.log(`err when connecting on getServiceImages: ${err}`);
    } else {
      let query = {
        text: "SELECT id, url FROM images WHERE id_service_fk = $1;",
        values: [req.params.id_service]
      };
      client
        .query(query)
        .then(images => {
          res.status(200).send(images.rows);
          client.end();
        })
        .catch(err => {
          client.end();
          console.log(`err when query on getServiceImages: ${err}`);
        });
    }
  });
}

function getTourImages(req, res) {
  client = new pg.Client(db);

  client.connect(err => {
    if (err) {
      client.end();
      console.log(`err when connecting on getTourImages: ${err}`);
    } else {
      let query = {
        text: "SELECT id, url FROM tour_images WHERE id_tour_fk = $1;",
        values: [req.params.id_tour]
      };
      client
        .query(query)
        .then(images => {
          res.status(200).send(images.rows);
          client.end();
        })
        .catch(err => {
          client.end();
          console.log(`err when query on getTourImages: ${err}`);
        });
    }
  });
}

module.exports = {
  saveImages: saveImages,
  saveTourImages: saveTourImages,
  getServiceImages: getServiceImages,
  getTourImages: getTourImages,
  deleteTourImage: deleteTourImage,
  deleteServiceImage: deleteServiceImage
};
