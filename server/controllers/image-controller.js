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
      client.query(query)
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
  getTourImages: getTourImages
};
