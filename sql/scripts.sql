CREATE TABLE service(
    id SERIAL PRIMARY KEY,
    location VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    classification VARCHAR NOT NULL,
    additional_info VARCHAR NOT NULL,
    phones JSON,
    email VARCHAR NOT NULL,
    website VARCHAR
);

CREATE TABLE images(
    id SERIAL PRIMARY KEY,
    url VARCHAR NOT NULL,
    id_service_fk INTEGER REFERENCES service(id)
);

CREATE TABLE tour_images(
    id SERIAL PRIMARY KEY,
    url VARCHAR NOT NULL,
    id_tour_fk INTEGER REFERENCES tour(id)
);

CREATE table tour(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    email VARCHAR,
    related_service INTEGER,
    FOREIGN KEY (related_service) REFERENCES service(id)
);

CREATE TABLE service_rates(
    id SERIAL PRIMARY KEY,
    header1 VARCHAR NOT NULL,
    header2 VARCHAR NOT NULL,
    values JSON NOT NULL,
    observations VARCHAR NOT NULL,
    id_service_fk INTEGER REFERENCES service(id)
);

CREATE TABLE tour_rates(
    id SERIAL PRIMARY KEY,
    header1 VARCHAR NOT NULL,
    header2 VARCHAR NOT NULL,
    values JSON NOT NULL,
    observations VARCHAR NOT NULL,
    id_tour_fk INTEGER REFERENCES tour(id)
);

DROP TABLE _user;
CREATE TABLE _user(
    id_user SERIAL NOT NULL PRIMARY KEY ,
    fullname VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);

CREATE TABLE recovery_password_code(
    id SERIAL NOT NULL PRIMARY KEY,
    code VARCHAR(6),
    id_user_fk INTEGER REFERENCES _user(id_user),
    date TIMESTAMP
);

CREATE TABLE user_service(
  id_user INTEGER REFERENCES _user,
  id INTEGER REFERENCES service,
  PRIMARY KEY (id_user, id)
);

CREATE TABLE user_tour(
  id_user INTEGER REFERENCES _user,
  id INTEGER REFERENCES tour,
  PRIMARY KEY (id_user, id)
);


DROP FUNCTION save_service(location VARCHAR, name VARCHAR, classification VARCHAR,
additional_info VARCHAR, email VARCHAR, website VARCHAR, phones JSON, _id_user INTEGER);

CREATE OR REPLACE FUNCTION save_service(location VARCHAR, name VARCHAR, classification VARCHAR,
    additional_info VARCHAR, email VARCHAR, website VARCHAR, phones JSON, _id_user INTEGER )
    RETURNS INTEGER AS
    $$
        DECLARE
            id_service integer;
        BEGIN
            INSERT INTO service (location, name, classification, additional_info, email, website, phones)
            VALUES (location, name, classification, additional_info, email, website, phones) RETURNING id INTO id_service;

            INSERT INTO user_service (id_user, id) VALUES (_id_user, id_service);

            RETURN id_service;
        END;

    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION save_service_rates(header1 VARCHAR, header2 VARCHAR, _values JSON, observations VARCHAR, id_service INTEGER)
    RETURNS VOID AS
    $$
        BEGIN
           INSERT INTO service_rates (header1, header2, values, observations, id_service_fk)
           VALUES (header1, header2, _values, observations, id_service);
        END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION save_image(url VARCHAR, id_service INTEGER)
RETURNS VOID AS
    $$
        BEGIN
            INSERT INTO images (url, id_service_fk) VALUES(url, id_service);
        END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION save_tour_image(url VARCHAR, id_tour INTEGER)
RETURNS VOID AS
    $$
        BEGIN
            INSERT INTO tour_images (url, id_tour_fk) VALUES(url, id_tour) ON CONFLICT DO NOTHING;
        END;
    $$ LANGUAGE plpgsql;


DROP FUNCTION get_services();
CREATE OR REPLACE FUNCTION get_services(_limit INTEGER, _offset INTEGER, _filter VARCHAR)
    RETURNS TABLE(
        _name VARCHAR,
        _location VARCHAR,
        _classification VARCHAR,
        _additional_info VARCHAR,
        _email VARCHAR,
        _website VARCHAR,
        _phones JSON,
        id_service INTEGER,
        imgs VARCHAR[]
    )
    language plpgsql
as
$$
BEGIN
            IF length(_filter) = 0 THEN
                RETURN QUERY SELECT
                       s.name _name,
                       s.location _location,
                       s.classification _classification,
                       s.additional_info _additional_info,
                       s.email _email,
                       s.website _website,
                       s.phones _phones,
                       s.id id_service,
                       array_agg(i.url) as imgs
                FROM service AS s
                LEFT OUTER JOIN images i on s.id = i.id_service_fk group by s.id LIMIT _limit OFFSET _offset;
            ELSE
                RETURN QUERY SELECT
                       s.name _name,
                       s.location _location,
                       s.classification _classification,
                       s.additional_info _additional_info,
                       s.email _email,
                       s.website _website,
                       s.phones _phones,
                       s.id id_service,
                       array_agg(i.url) as imgs
                FROM service AS s
                LEFT OUTER JOIN images i on s.id = i.id_service_fk WHERE s.classification LIKE '%'|| _filter ||'%'
                group by s.id LIMIT _limit OFFSET _offset;
            END IF;
        END;
$$;
DROP FUNCTION get_tours(_limit INTEGER, _offset INTEGER);
CREATE OR REPLACE FUNCTION get_tours(_limit INTEGER, _offset INTEGER)
    RETURNS TABLE (
        _name VARCHAR,
        _description VARCHAR,
        _email VARCHAR,
        _related_service INTEGER,
        _phones JSON,
        imgs VARCHAR[]
    )
AS
    $$
        BEGIN
            RETURN QUERY
                SELECT
                    t.name _name,
                    t.description _description,
                    t.email _email,
                    t.related_service _related_service,
                    t.phones _phones,
                    array_agg(ti.url) as imgs
                FROM tour t
                LEFT OUTER JOIN tour_images ti on t.id = ti.id_tour_fk
                GROUP BY t.id
                LIMIT COALESCE(_limit, (SELECT COUNT(*) FROM tour)) OFFSET COALESCE(_offset, 0);
        END
    $$ LANGUAGE plpgsql;

DROP FUNCTION save_user(_fullname VARCHAR, _username VARCHAR, _password VARCHAR);
CREATE OR REPLACE FUNCTION save_user(_fullname VARCHAR, _username VARCHAR, _password VARCHAR, _email VARCHAR)
RETURNS VOID
AS
    $$
        BEGIN
            INSERT INTO _user(fullname, username, password, email)
            VALUES(_fullname, _username, crypt(_password, gen_salt('bf', 5)), _email);
        END;
    $$ LANGUAGE plpgsql;


DROP FUNCTION login(_username VARCHAR, _password VARCHAR);
CREATE OR REPLACE FUNCTION login(_username VARCHAR, _password VARCHAR)
RETURNS TABLE (_fullname VARCHAR _id INTEGER, logged BOOLEAN)
AS
    $$
        BEGIN
            RETURN QUERY SELECT fullname AS _fullname, id_user AS _id, (SELECT password = crypt(_password, password)
            FROM _user WHERE username = _username) AS logged FROM _user WHERE username = _username;
        END
    $$ LANGUAGE plpgsql;



DROP FUNCTION get_services_by_user(_id INTEGER);
CREATE OR REPLACE FUNCTION get_services_by_user(_id_user INTEGER)
RETURNS TABLE (id_service INTEGER, _name VARCHAR, _classification VARCHAR, imgs VARCHAR[])
AS
    $$
        BEGIN
           RETURN QUERY
               SELECT
                       DISTINCT service.id id_service,
                       name _name,
                       classification _classification,
                       array_agg(i.url) imgs
           FROM service JOIN user_service us ON
               service.id = us.id AND us.id_user = _id_user
           LEFT OUTER JOIN (
               SELECT url,
                      id_service_fk
               FROM images
                    JOIN service s ON
                        images.id_service_fk = s.id
                    JOIN user_service u ON
                        s.id = u.id AND u.id_user = _id_user
           ) i on service.id = i.id_service_fk GROUP BY service.id;
        END
    $$ LANGUAGE plpgsql;



DROP FUNCTION get_related_tours(id_service INTEGER);
CREATE OR REPLACE FUNCTION get_related_tours(id_service INTEGER)
RETURNS TABLE (id INTEGER, _name VARCHAR, description VARCHAR, email VARCHAR, phones JSON, imgs VARCHAR[])
AS
    $$
        BEGIN
           RETURN QUERY
            SELECT t.id id,
                   t.name _name,
                   t.description description,
                   t.email email,
                   t.phones phones,
                   array_agg(i.url) imgs
            FROM tour t
            JOIN (
               SELECT url,
                      id_tour_fk
               FROM tour_images
                    JOIN tour ON
                        tour_images.id_tour_fk = tour.id
           ) i on t.id = i.id_tour_fk WHERE t.related_service = id_service GROUP BY t.id;
        END;
    $$ LANGUAGE plpgsql;

DROP FUNCTION get_tours_by_user(_id INTEGER);
CREATE OR REPLACE FUNCTION get_tours_by_user(_id INTEGER)
RETURNS TABLE (id_tour INTEGER, _name VARCHAR, description VARCHAR, email VARCHAR, _phones JSONB, related_service INTEGER, imgs VARCHAR[])
AS
    $$
        BEGIN
           RETURN QUERY
           SELECT
               DISTINCT t.id id_tour,
               t.name _name,
               t.description description,
               t.email email,
               t.phones::JSONB AS _phones,
               t.related_service related_service,
               array_agg(i.url) imgs
           FROM tour t JOIN user_tour us ON
               t.id = us.id AND us.id_user = _id
           LEFT OUTER JOIN (
               SELECT url,
                      id_tour_fk
               FROM tour_images
                    JOIN tour ON
                        tour_images.id_tour_fk = tour.id
                    JOIN user_tour u ON
                        tour.id = u.id AND u.id_user = _id
           ) i on t.id = i.id_tour_fk GROUP BY t.id;
        END
    $$ LANGUAGE plpgsql;

DROP FUNCTION save_tour(_name VARCHAR, _description VARCHAR, _phones JSON, _email VARCHAR, _id_user INTEGER, _related_service INTEGER);
CREATE OR REPLACE FUNCTION save_tour(
    _name VARCHAR,
    _description VARCHAR,
    _phones JSON,
    _email VARCHAR,
    _id_user INTEGER,
    _related_service INTEGER,
    header1 VARCHAR,
    header2 VARCHAR,
    "values" JSON,
    observations VARCHAR
)
RETURNS INTEGER AS
    $$
        DECLARE
            id_tour integer;
        BEGIN
            INSERT INTO tour (name, description, phones, email, related_service)
            VALUES (_name, _description, _phones, _email, _related_service) RETURNING id INTO id_tour;

            INSERT INTO user_tour (id_user, id) VALUES (_id_user, id_tour);

            IF($7 IS NOT NULL AND $8 IS NOT NULL) THEN
                INSERT INTO tour_rates (header1, header2, "values", observations, id_tour_fk) VALUES ($7, $8, $9, $10, id_tour);
            END IF;
            RETURN id_tour;
        END;
    $$ LANGUAGE plpgsql;

DROP FUNCTION update_tour(_location VARCHAR, _name VARCHAR, _classification VARCHAR, _additional_info VARCHAR, _email VARCHAR, _website VARCHAR, _phones JSON, _id INTEGER);
CREATE OR REPLACE FUNCTION update_tour(_location VARCHAR, _name VARCHAR, _classification VARCHAR,
    _additional_info VARCHAR, _email VARCHAR, _website VARCHAR, _phones JSON, _id INTEGER)
RETURNS VOID AS
    $$
        BEGIN
           UPDATE service SET
                              location = _location,
                              name = _name,
                              classification = _classification,
                              additional_info = _additional_info,
                              email = _email,
                              website = _website,
                              phones = _phones
            WHERE id = _id;
        END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_service(
    _location JSON,
    _name VARCHAR,
    _classification VARCHAR,
    _additional_info VARCHAR,
    _email VARCHAR,
    _website VARCHAR,
    _phones JSON,
    _id_service INTEGER,
    _header1 VARCHAR,
    _header2 VARCHAR,
    _values JSON,
    observations VARCHAR
) RETURNS VOID AS
    $$
        BEGIN
            UPDATE service SET
                               name = $2,
                               location = $1,
                               classification = $3,
                               additional_info = $4,
                               email = $5,
                               website = $6,
                               phones = $7
            WHERE id = $8;

            UPDATE service_rates SET
                                     header1 = $9,
                                     header2 = $10,
                                     "values" = $11,
                                     observations = $12
            WHERE id_service_fk = $8;

            IF NOT FOUND THEN
                INSERT INTO service_rates (header1, header2, "values", observations, id_service_fk) values ($9, $10, $11, $12, $8);
            END IF;
        END;
    $$ LANGUAGE plpgsql;

SELECT * FROM service;
CREATE OR REPLACE FUNCTION get_related_services_by_user()
RETURNS VOID AS
    $$
        BEGIN

        END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_service_name_id(_id_user INTEGER, _name VARCHAR)
    RETURNS TABLE(name VARCHAR, id INTEGER)
    language plpgsql
AS
$$
BEGIN
            RETURN QUERY SELECT service.name AS name,
                   service.id AS id
            FROM service
                JOIN user_service us ON us.id = service.id
                                            AND us.id_user = _id_user
                WHERE (lower(service.name) SIMILAR TO lower('%'||_name||'%'));
        END
$$;
create function get_service_rates(id_service integer)
    returns TABLE(id integer, header1 character varying, header2 character varying, _values json, observations character varying, _id_service_fk integer)
    language plpgsql
as
$$
BEGIN
            RETURN QUERY SELECT
                                sr.id id,
                                sr.header1 header1,
                                sr.header2 header2,
                                sr.values _values,
                                sr.observations observations,
                                sr.id_service_fk _id_service_fk

            FROM service_rates sr
            WHERE id_service_fk = id_service;
        END;
$$;
DROP FUNCTION get_service_for_update(id_service INTEGER);
CREATE OR REPLACE FUNCTION get_service_for_update(id_service INTEGER)
RETURNS TABLE (
    _id INTEGER,
    _name VARCHAR,
    _location VARCHAR,
    _classification VARCHAR,
    _additional_info VARCHAR,
    _email VARCHAR,
    _website VARCHAR,
    _phones JSON,
    header1 VARCHAR,
    header2 VARCHAR,
    "values" JSON,
    observations VARCHAR
) AS
$$
    BEGIN
        RETURN QUERY SELECT s.id AS _id,
                            s.name _name,
                            s.location _location,
                            s.classification _classification,
                            s.additional_info _additional_info,
                            s.email _email,
                            s.website _website,
                            s.phones _phones,
                            sr.header1,
                            sr.header2,
                            sr."values",
                            sr.observations
        FROM service
            AS s
        LEFT JOIN service_rates sr on s.id = sr.id_service_fk
        WHERE s.id = $1;
    END
$$ LANGUAGE plpgsql;


SELECT * FROM get_service_for_update(51);

DROP FUNCTION get_tour_for_update(id_tour INTEGER);
CREATE OR REPLACE FUNCTION get_tour_for_update(id_tour INTEGER)
RETURNS TABLE (
    id INTEGER,
    name VARCHAR,
    description VARCHAR,
    email VARCHAR,
    phones JSON,
    related_service INTEGER,
    service_name VARCHAR,
    header1 VARCHAR,
    header2 VARCHAR,
    "values" JSON,
    observations VARCHAR
)
AS
    $$
        BEGIN
            RETURN QUERY
            SELECT tour.id,
                   tour.name,
                   tour.description,
                   tour.email,
                   tour.phones,
                   tour.related_service,
                   s.name service_name,
                   tr.header1,
                   tr.header2,
                   tr."values",
                   tr.observations
            FROM tour
            LEFT JOIN service s on tour.related_service = s.id
            LEFT JOIN tour_rates tr on tour.id = tr.id_tour_fk
            WHERE tour.id = $1;
        END;
    $$ LANGUAGE plpgsql;

DROP FUNCTION update_tour(_location VARCHAR, _name VARCHAR, _classification VARCHAR, _additional_info VARCHAR, _email VARCHAR, _website VARCHAR, _phones JSON, _id INTEGER);
CREATE OR REPLACE FUNCTION update_tour(
    _name VARCHAR,
    _description VARCHAR,
    _email VARCHAR,
    _related_service INTEGER,
    _phones JSON,
    id_tour INTEGER,
    _header1 VARCHAR,
    _header2 VARCHAR,
    _values JSON,
    observations VARCHAR
)
RETURNS VOID
AS
    $$
        BEGIN
            UPDATE tour SET name = $1,
                            description = $2,
                            email = $3,
                            related_service = $4,
                            phones = $5
            WHERE id = $6;

            UPDATE tour_rates SET
                                 header1 = $7,
                                 header2 = $8,
                                 "values" = $9,
                                 observations = $10
            WHERE id_tour_fk = $6;

            IF NOT FOUND THEN
                INSERT INTO tour_rates (header1, header2, "values", observations, id_tour_fk) values ($7, $8, $9, $10, $6);
            END IF;
        END;
    $$ LANGUAGE plpgsql;

DROP FUNCTION gen_recovery_code(_username VARCHAR);
CREATE OR REPLACE FUNCTION gen_recovery_code(_username VARCHAR)
RETURNS TABLE(email VARCHAR, code VARCHAR)
AS
    $$
        DECLARE
            last_inserted_val INTEGER;
        BEGIN

            INSERT INTO recovery_password_code(code, id_user_fk, date)
            VALUES(
                   (SELECT floor(random()*(999999-0+1))+0),
                   (SELECT id_user FROM _user WHERE _user.username = $1),
                   (SELECT NOW())
            ) RETURNING id INTO last_inserted_val;

            RETURN QUERY SELECT
                                u.email email,
                                rpc.code code
            FROM _user u
                JOIN recovery_password_code rpc
                    ON u.id_user = rpc.id_user_fk WHERE u.username = $1 AND rpc.id = last_inserted_val;
        END;
    $$ LANGUAGE plpgsql;

DROP FUNCTION delete_service(id_service INTEGER);
CREATE OR REPLACE FUNCTION delete_service(id_service INTEGER)
RETURNS VOID AS
$$
    BEGIN
        DELETE FROM user_service WHERE id = $1;
        DELETE FROM images WHERE id_service_fk = $1;
        DELETE FROM service_rates WHERE id_service_fk = $1;
        DELETE FROM service WHERE id = $1;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_tour(id_tour INTEGER)
RETURNS VOID AS
$$
    BEGIN
        DELETE FROM user_tour WHERE id = $1;
        DELETE FROM tour_images WHERE id_tour_fk = $1;
        DELETE FROM tour WHERE id = $1;
    END;
$$ LANGUAGE plpgsql;

-- inserciones de usuarios
-- 1

SELECT * FROM save_user(
    'Fernando Sandí',
    'fdosandi',
    'sandifdo',
    'guillermo.barquero@sinac.go.cr'
    );

SELECT * FROM save_user(
    'Luis Guillermo Ramírez Barquero',
    'lgrod',
    'lgrodbarq',
    'guillermo.barquero@sinac.go.cr'
    );

SELECT * FROM save_user(
    'Noylin Barquero',
    'noylinb',
    'noylin123',
    'ndn-bazu@outlook.com'
    );

SELECT * FROM save_user(
    'Esteban Cruz Pizarro',
    'EstebanCruzPizarro',
    'estCrzPizarro',
    'esteban.papito@hotmail.com'
    );

-- 2
SELECT * FROM save_user(
    'Luis Lira',
    'llira',
    'iraluis',
    'ventas@hamiltonleisure.com'
    );
-- 3
SELECT * FROM save_user(
    'Sisney Irigoyen',
    'sisiriyen',
    'yengoiri',
    'sisneyirigoyen12@hotmail.com'
    );

-- 4
SELECT * FROM save_user(
    'Yalvin Santiago Arana',
    'yaladele',
    'ledeyala',
    'adalenycastrol@gmail.com'
    );

-- 5
SELECT * FROM save_user(
    'Posada rural y senderos Oasis',
    'posasenoasis',
    'ruralpossen',
    'posadaoasis@hotmail.com'
    );

-- 6
SELECT * FROM save_user(
    'Jorge Alberto Bonilla Zeledón',
    'zelebotober',
    'joralboze',
    'jbonillazeledon@gmail.com'
    );

-- 7
SELECT * FROM save_user(
    'Paraíso Tropical',
    'caltropi',
    'sotropi',
    'paraisotropicalcanonegro@gmail.com'
    );

-- 8
SELECT * FROM save_user(
    'Marlon Castro',
    'troloncas',
    'martrocas',
    'castroflores81@gmail.com'
    );

-- 9
SELECT * FROM save_user(
    'Geri Brown',
    'rownrige',
    'norbri',
    'geri.brown@cincoramas.com'
    );

-- 10
SELECT * FROM save_user(
    'Jimmy Gutiérrez Canales',
    'lesnaca',
    'mmyrrez',
    'jimmygutierrezcanales@gmail.com'
    );

-- 11
SELECT * FROM save_user(
    'Juan Carlos Quesada',
    'sadalos',
    'jucaque',
    'hoteljabiru@gmail.com'
    );

-- 12
SELECT * FROM save_user(
    'Argell Saballos',
    'osbasa',
    'gelarba',
    'honitsha@gmail.com'
    );

-- 13
SELECT * FROM save_user(
    'Carmen Lidia Jiménez',
    'nezlidia',
    'menlidi',
    ''
    );
-- 14
SELECT * FROM save_user(
    'Cabinas Felicia',
    'cialife',
    'nascia',
    ''
    );

-- 15
SELECT * FROM save_user(
    'Alvaro Wiessel',
    'alvsel',
    'sselwi',
    'alvaro.wiessel@gmail.com'
    );

-- 16
SELECT * FROM save_user(
    'Kenneth Dominguez',
    'kendo',
    'thguez',
    'kennethdgcs@gmail.com'
    );

-- 17
SELECT * FROM save_user(
    'Antonio Flores',
    'nioan',
    'resflo',
    'floresantonio160@gmail.com'
    );