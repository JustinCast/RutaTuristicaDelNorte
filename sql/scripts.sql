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

CREATE OR REPLACE FUNCTION save_service(location VARCHAR, name VARCHAR, classification VARCHAR, additional_info VARCHAR, phone VARCHAR, email VARCHAR)
  RETURNS VOID AS
  $$
    BEGIN
      INSERT INTO service VALUES (location, name, classification, additional_info, phone, email);
    END;
  $$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION save_image(url VARCHAR, id_service INTEGER)
  RETURNS VOID AS
  $$
    BEGIN
      INSERT INTO images VALUES(url, id_service);
    END;
  $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_services()
RETURNS TABLE(
    _name VARCHAR,
    _location VARCHAR,
    _classification VARCHAR,
    _additional_info VARCHAR,
    _phone VARCHAR,
    _email VARCHAR,
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
                   s.phone _phone,
                   s.email _email,
                   s.id id_service,
                   array_agg(i.url) as imgs
            FROM service AS s INNER
            JOIN images i on s.id = i.id_service_fk group by s.id;
        END;
    $$ LANGUAGE plpgsql;