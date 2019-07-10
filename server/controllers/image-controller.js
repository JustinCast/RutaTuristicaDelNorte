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
          values: [image.url, id_service]
        };
        client.query(query).catch(err => {
          client.end();
          console.log(`err when query on saveImages: ${err}`);
        });
      });
    }
  });
}

module.exports = {
  saveImages: saveImages
};