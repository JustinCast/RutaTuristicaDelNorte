const db = require("../config/db");
const pg = require("pg");
/**
 * Generic method that allows to call either service_rates or tour_rates
 * @param {*} rates all the set rates for a service or tour
 * @param {*} procName the name of the proc to call
 * @param {*} id the id of row in a service or tour table
 */
function saveRates(rates, procName, id) {
  client = new pg.Client(db);

  client.connect(err => {
    if (err) {
      client.end();
      console.log(`err when connecting on save${procName}Rates: ${err}`);
    } else {
      let query = {
        text: `SELECT * FROM ${procName}($1, $2, $3, $4, $5);`,
        values: [
          rates.header1,
          rates.header2,
          JSON.stringify(rates.items),
          rates.observations,
          id
        ]
      };
      client
        .query(query)
        .then(() => {
          client.end();
        })
        .catch(err => {
          client.end();
          console.log(`err when query on save${procName}Rates: ${err}`);
        });
    }
  });
}

module.exports = {
  saveRates: saveRates
};