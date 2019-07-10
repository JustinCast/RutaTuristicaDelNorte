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