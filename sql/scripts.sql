CREATE TABLE service(
    id SERIAL PRIMARY KEY,
    location VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    classification VARCHAR NOT NULL,
    additional_info VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    email VARCHAR NOT NULL
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

CREATE TABLE _user(
    id_user SERIAL NOT NULL,
    fullname VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL
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


DROP FUNCTION get_services();
CREATE OR REPLACE FUNCTION get_services()
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
 AS
    $$
        BEGIN
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
            FROM service AS s INNER
            JOIN images i on s.id = i.id_service_fk group by s.id;
        END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION save_user(_fullname VARCHAR, _username VARCHAR, _password VARCHAR)
RETURNS VOID
AS
    $$
        BEGIN
            INSERT INTO _user(fullname, username, password)
            VALUES(_fullname, _username, crypt(_password, gen_salt('bf', 5)));
        END;
    $$ LANGUAGE plpgsql;


DROP FUNCTION login(_username VARCHAR, _password VARCHAR);
CREATE OR REPLACE FUNCTION login(_username VARCHAR, _password VARCHAR)
RETURNS TABLE (_fullname VARCHAR, _id INTEGER, logged BOOLEAN)
AS
    $$
        BEGIN
            RETURN QUERY SELECT fullname AS _fullname, id_user AS _id, (SELECT password = crypt(_password, password)
            FROM _user WHERE username = _username) AS logged FROM _user;
        END
    $$ LANGUAGE plpgsql;

DROP FUNCTION get_services_by_user(_id INTEGER);
CREATE OR REPLACE FUNCTION get_services_by_user(_id_service INTEGER)
RETURNS TABLE (id_service INTEGER,_name VARCHAR, _classification VARCHAR, first_img VARCHAR)
AS
    $$
        BEGIN
           RETURN QUERY
               SELECT
                       service.id id_service,
                       name _name,
                       classification _classification,
                       i.url first_img
           FROM service JOIN user_service us ON
               service.id = us.id AND us.id_user = _id_service
           JOIN (
               SELECT url,
                      id_service_fk
               FROM images
                    JOIN service s ON
                        images.id_service_fk = s.id
                    JOIN user_service u ON
                        s.id = u.id AND u.id_user = _id_service
           ) i on service.id = i.id_service_fk;
        END
    $$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_tours_by_user(_id INTEGER)
RETURNS TABLE (_name VARCHAR, _classification VARCHAR, first_img VARCHAR)
AS
    $$
        BEGIN
           RETURN QUERY
               SELECT
                       name _name,
                       classification _classification,
                       i.url first_img
           FROM service JOIN user_tour us ON
               service.id = us.id AND us.id_user = _id
           JOIN (
               SELECT url,
                      id_service_fk
               FROM images
                    JOIN service s ON
                        images.id_service_fk = s.id
                    JOIN user_tour u ON
                        s.id = u.id AND u.id_user = _id
           ) i on service.id = i.id_service_fk;
        END
    $$ LANGUAGE plpgsql;


SELECT * FROM get_services_by_user(1);

CREATE OR REPLACE FUNCTION save_tour(_name VARCHAR, _description VARCHAR, _phones JSON, _email VARCHAR, _related_service INTEGER)
RETURNS VOID AS
    $$
        BEGIN
            INSERT INTO tour (name, description, phones, email, related_service)
            VALUES (_name, _description, _phones, _email, _related_service);
        END;
    $$ LANGUAGE plpgsql;


SELECT * FROM tour WHERE related_service = 31;

SELECT * FROM service;

SELECT * FROM service WHERE lower(name) SIMILAR TO lower('%ur%');