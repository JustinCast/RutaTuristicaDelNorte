const db = require("../config/db");
const pg = require("pg");
var client;

function login(req, res) {
  client = new pg.Client(db);
  client.connect(err => {
    if (err) {
      client.end();
      res.status(400).send(err);
      console.log(`err when connecting on login: ${err}`);
    } else {
      let query = {
        text: "SELECT * FROM login($1, $2);",
        values: [req.body.username, req.body.password]
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
          console.log(`err when query on login: ${err}`);
        });
    }
  });
}

function getServicesByUser(req, res) {
  client = new pg.Client(db);
  client.connect(err => {
    if (err) {
      client.end();
      res.status(400).send(err);
      console.log(`err when connecting on getServicesByUser: ${err}`);
    } else {
      let query = {
        text: "SELECT * FROM get_services_by_user($1);",
        values: [req.params.id]
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
          console.log(`err when query on getServicesByUser: ${err}`);
        });
    }
  });
}

function getToursByUser(req, res) {
  client = new pg.Client(db);
  client.connect(err => {
    if (err) {
      client.end();
      res.status(400).send(err);
      console.log(`err when connecting on getToursByUser: ${err}`);
    } else {
      let query = {
        text: "SELECT * FROM get_tours_by_user($1);",
        values: [req.params.id]
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
          console.log(`err when query on getToursByUser: ${err}`);
        });
    }
  });
}

function verifyCodeUsername(req, res) {
  client = new pg.Client(db);
  client.connect(err => {
    if (err) {
      client.end();
      res.status(400).send(err);
      console.log(`err when connecting on verifyCodeUsername: ${err}`);
    } else {
      let query = {
        text: `select EXISTS(
                            SELECT 1 FROM recovery_password_code 
                            where id_user_fk = (
                              SELECT id_user FROM _user WHERE username = $1) AND code = $2);`,
        values: [req.body.username, req.body.code]
      };
      client.query(query)
      .then(
        data => {
          console.log(data.rows);
          client.end();
        }
      )
      .catch(err => {
        client.end();
        res.status(400).send(err);
        console.log(`err when query on verifyCodeUsername: ${err}`);
      });
    }
  });
}

function passwordRecovery(req, res) {
  client = new pg.Client(db);
  client.connect(err => {
    if (err) {
      client.end();
      res.status(400).send(err);
      console.log(`err when connecting on passwordRecovery: ${err}`);
    } else {
      let query = {
        text: "SELECT * FROM gen_recovery_code($1)",
        values: [req.params.username]
      };
      client
        .query(query)
        .then(data => {
          if (data.rows[0] !== null) {
            sendMail({
              to: data.rows[0].email,
              code: data.rows[0].code,
              username: req.params.username
            });
            res.status(200).send(true);
          } else res.status(200).send(false);

          client.end();
        })
        .catch(err => {
          client.end();
          res.status(400).send(err);
          console.log(`err when query on passwordRecovery: ${err}`);
        });
    }
  });
}

function sendMail(body) {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: body.to,
    from: "catuchi.site@gmail.com",
    templateId: "d-168b7e9d520147089cdd4c19d51a7d11",
    dynamic_template_data: {
      username: body.username,
      code: body.code
    }
  };
  sgMail
    .send(msg)
    .then(() => console.log(200))
    .catch(err => console.error(`ERROR AL ENVIAR EL CORREO: ${err}`));
}

module.exports = {
  login: login,
  verifyCodeUsername: verifyCodeUsername,
  passwordRecovery: passwordRecovery,
  getServicesByUser: getServicesByUser,
  getToursByUser: getToursByUser
};
