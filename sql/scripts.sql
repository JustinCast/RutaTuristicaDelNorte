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
            INSERT INTO tour_images (url, id_tour_fk) VALUES(url, id_tour);
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
                FROM service AS s INNER
                JOIN images i on s.id = i.id_service_fk group by s.id LIMIT _limit OFFSET _offset;
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
                FROM service AS s INNER
                JOIN images i on s.id = i.id_service_fk WHERE s.classification = _filter
                group by s.id LIMIT _limit OFFSET _offset;
            END IF;
        END;
$$;

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

ALTER TABLE tour ADD COLUMN phones JSON;

CREATE OR REPLACE FUNCTION save_tour(_name VARCHAR, _description VARCHAR, _phones JSON, _email VARCHAR, _id_user INTEGER, _related_service INTEGER)
RETURNS INTEGER AS
    $$
        DECLARE
            id_tour integer;
        BEGIN
            INSERT INTO tour (name, description, phones, email, related_service)
            VALUES (_name, _description, _phones, _email, _related_service) RETURNING id INTO id_tour;

            INSERT INTO user_tour (id_user, id) VALUES (_id_user, id_tour);

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

INSERT INTO public.service (id, location, name, classification, additional_info, email, website, phones) VALUES (31, '{"lat":10.4013824,"lng":-84.32271359999999}', 'Agami Tour', 'Tour', 'agami tour additional_info', 'agami@mail.com', null, null);
INSERT INTO public.service (id, location, name, classification, additional_info, email, website, phones) VALUES (33, '{"lat":10.4462727,"lng":-84.36470959999997}', 'Caño Negro Experience Tours', 'Tour', 'aquí va la información adicional', 'mail@mail.com', null, null);
INSERT INTO public.service (id, location, name, classification, additional_info, email, website, phones) VALUES (49, '{"lat":10.3592886,"lng":-84.5117219}', 'Caño Negro Wetlands Lodge', 'Servicio de hospedaje', 'El Refugio de Vida Silvestre Caño Negro fue declarado en 1991 “Humedal de
importancia Internacional”. Este tesoro ecológico es el hábitat natural de más de 600
especies de aves entre locales y migratorias, 6.500 especies de plantas y 150 especies de
mamíferos.', 'wetlandslodge@gmail.com', 'nd', '{"phones":["2471-1582"]}');
INSERT INTO public.service (id, location, name, classification, additional_info, email, website, phones) VALUES (50, '{"lat":10.3592886,"lng":-84.5117219}', 'Hotel Wilson Tulipán', 'Servicio de hospedaje', 'sin información adicional', 'mail@mail.com', '', '{"phones":[]}');
INSERT INTO public.service (id, location, name, classification, additional_info, email, website, phones) VALUES (51, '{"lat":10.3592886,"lng":-84.5117219}', 'Rancho Tabacón Veracruz', 'Servicio de hospedaje', 'Aquí va la info adicional', 'mail@mail.com', '', '{"phones":[]}');
INSERT INTO public.service (id, location, name, classification, additional_info, email, website, phones) VALUES (52, '{"lat":10.3592886,"lng":-84.5117219}', 'Poponjoche', 'Servicio de Alimentación', 'aquí va la información adicional', 'mail@mail.com', '', '{"phones":[]}');

--
INSERT INTO public.service_rates (id, header1, header2, values, observations, id_service_fk) VALUES (4, 'Habitación', 'Tarifa Neta', '[{"v1":"Sgl","v2":40}]', '', 49);
INSERT INTO public.service_rates (id, header1, header2, values, observations, id_service_fk) VALUES (5, 'Habitación', 'Tarifa Neta', '[{"v1":"1 habitación","v2":40}]', '', 50);
INSERT INTO public.service_rates (id, header1, header2, values, observations, id_service_fk) VALUES (6, 'Comida', 'Tarifa Neta', '[{"v1":"1 plato","v2":5}]', '', 51);
INSERT INTO public.service_rates (id, header1, header2, values, observations, id_service_fk) VALUES (7, 'Comida', 'Tarifa Neta', '[{"v1":"1 plato","v2":5}]', '', 52);

--
INSERT INTO public.images (id, url, id_service_fk) VALUES (6, 'https://firebasestorage.googleapis.com/v0/b/ruta-turistica-del-norte.appspot.com/o/1563229037560_FB_IMG_15546811344312652.jpg?alt=media&token=ab31d189-1926-4e58-8a7d-281a368bfbc1', 31);
INSERT INTO public.images (id, url, id_service_fk) VALUES (7, 'https://firebasestorage.googleapis.com/v0/b/ruta-turistica-del-norte.appspot.com/o/1563229040676_IMG-20190513-WA0023.jpg?alt=media&token=f45f037a-70a9-4072-9813-5bc83317d0e9', 31);
INSERT INTO public.images (id, url, id_service_fk) VALUES (8, 'https://firebasestorage.googleapis.com/v0/b/ruta-turistica-del-norte.appspot.com/o/1563229041936_IMG-20190513-WA0029.jpg?alt=media&token=c6576bb9-548f-410a-b9db-06ab077b1336', 31);
INSERT INTO public.images (id, url, id_service_fk) VALUES (9, 'https://firebasestorage.googleapis.com/v0/b/ruta-turistica-del-norte.appspot.com/o/1563289682254_Catuchi%201.jpg?alt=media&token=46e94f64-4cc8-47a3-a69b-05dc212c4d39', 33);
INSERT INTO public.images (id, url, id_service_fk) VALUES (10, 'https://firebasestorage.googleapis.com/v0/b/ruta-turistica-del-norte.appspot.com/o/1563289710385_Global%20Bid%20Day%20Oc%2018.jpg?alt=media&token=7975d277-56e8-450c-8aaf-6fc60d20ebbc', 33);
INSERT INTO public.images (id, url, id_service_fk) VALUES (11, 'https://firebasestorage.googleapis.com/v0/b/ruta-turistica-del-norte.appspot.com/o/1563289738344_vuelo.jpg?alt=media&token=28686d35-ed28-4dd7-83a0-c6757725ab51', 33);
INSERT INTO public.images (id, url, id_service_fk) VALUES (19, 'https://firebasestorage.googleapis.com/v0/b/ruta-turistica-del-norte.appspot.com/o/1567612786103_Piscina.jpg?alt=media&token=353ef6d2-53cd-49dd-ab02-c0db7ebc32e2', 49);
INSERT INTO public.images (id, url, id_service_fk) VALUES (20, 'https://firebasestorage.googleapis.com/v0/b/ruta-turistica-del-norte.appspot.com/o/1567612786759_Caba%C3%B1as%202011.jpg?alt=media&token=353fe385-df4d-4569-ba8a-18d55520723c', 49);
INSERT INTO public.images (id, url, id_service_fk) VALUES (21, 'https://firebasestorage.googleapis.com/v0/b/ruta-turistica-del-norte.appspot.com/o/1567612787520_Bar%20%26%20restaurant.jpeg?alt=media&token=f7cc6fa4-8d5e-48da-b5b4-7153c8524fd7', 49);
INSERT INTO public.images (id, url, id_service_fk) VALUES (22, 'https://firebasestorage.googleapis.com/v0/b/ruta-turistica-del-norte.appspot.com/o/1567617425575_IMG_2524.jpeg?alt=media&token=5371e3fd-0612-4e57-8aca-a3334c66da87', 50);
INSERT INTO public.images (id, url, id_service_fk) VALUES (23, 'https://firebasestorage.googleapis.com/v0/b/ruta-turistica-del-norte.appspot.com/o/1567617429166_675045f4-7012-4100-a13a-024b6da9c2ed.jpeg?alt=media&token=c5a02abe-b734-4138-bb50-b52bde8822e1', 50);
INSERT INTO public.images (id, url, id_service_fk) VALUES (24, 'https://firebasestorage.googleapis.com/v0/b/ruta-turistica-del-norte.appspot.com/o/1567617429858_9f3f660e-4188-4e54-a727-b95797f4d422.jpeg?alt=media&token=b152fda1-d59e-432c-af05-c4cb1d7ca5cb', 50);
INSERT INTO public.images (id, url, id_service_fk) VALUES (25, 'https://firebasestorage.googleapis.com/v0/b/ruta-turistica-del-norte.appspot.com/o/1567617430575_5e0f2dce-0c27-4627-a205-37d6c6935364.jpeg?alt=media&token=fb103906-9c15-4169-8b73-3c79a5882aaf', 50);
INSERT INTO public.images (id, url, id_service_fk) VALUES (26, 'https://firebasestorage.googleapis.com/v0/b/ruta-turistica-del-norte.appspot.com/o/1567636146305_FB_IMG_1541118222571.jpg?alt=media&token=9851beb5-bcc0-4447-80c5-e4b8d35ba3a3', 51);
INSERT INTO public.images (id, url, id_service_fk) VALUES (27, 'https://firebasestorage.googleapis.com/v0/b/ruta-turistica-del-norte.appspot.com/o/1567636147014_FB_IMG_1560458635736.jpg?alt=media&token=d29a4c2a-5326-4b2f-a31a-c1312f49f375', 51);
INSERT INTO public.images (id, url, id_service_fk) VALUES (28, 'https://firebasestorage.googleapis.com/v0/b/ruta-turistica-del-norte.appspot.com/o/1567636147575_FB_IMG_1560459919936.jpg?alt=media&token=45f23f2d-f810-44f4-805e-73cc819705de', 51);
INSERT INTO public.images (id, url, id_service_fk) VALUES (29, 'https://firebasestorage.googleapis.com/v0/b/ruta-turistica-del-norte.appspot.com/o/1567636245672_IMG_3032.JPG?alt=media&token=fbab9b17-489a-4e3f-98ed-7d082c4ff693', 52);
INSERT INTO public.images (id, url, id_service_fk) VALUES (30, 'https://firebasestorage.googleapis.com/v0/b/ruta-turistica-del-norte.appspot.com/o/1567636251277_IMG_3070.JPG?alt=media&token=b77cd2bd-d2c9-4f68-86ac-8e3aca75a673', 52);
INSERT INTO public.images (id, url, id_service_fk) VALUES (31, 'https://firebasestorage.googleapis.com/v0/b/ruta-turistica-del-norte.appspot.com/o/1567636256489_IMG_3152.JPG?alt=media&token=505db4c6-fdbd-45b8-87e1-40d5fc3e7b75', 52);

--
INSERT INTO public._user (id_user, fullname, username, password) VALUES (1, 'USUARIO 1', 'us1', '$2a$05$8cQb54mU.PgsuhaIqtz//eU3hLZSrAovpKPFOBFm7CsnBZSYLcE7q');

INSERT INTO public.user_service (id_user, id) VALUES (1, 49);
INSERT INTO public.user_service (id_user, id) VALUES (1, 50);
INSERT INTO public.user_service (id_user, id) VALUES (1, 51);
INSERT INTO public.user_service (id_user, id) VALUES (1, 52);

