CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE,
    description VARCHAR(80),
    created TIMESTAMP NOT NULL DEFAULT current_timestamp,
    lastmodified TIMESTAMP
);

CREATE TABLE meter (
    id SERIAL UNIQUE,
    serial VARCHAR(100) NOT NULL,
    categoryid INT,
    description VARCHAR(80),
    unit VARCHAR(10),
    fractional_digits INT,
    valid_from DATE,
    lastmodified TIMESTAMP,
    FOREIGN KEY (categoryid) REFERENCES category (id)
);

ALTER TABLE
    meter
ADD
    CONSTRAINT pk_meter PRIMARY KEY (serial, categoryid);

COMMENT ON COLUMN meter.unit IS 'physical unit like kWh or m3';

COMMENT ON COLUMN meter.fractional_digits IS 'display precission';

CREATE TABLE
values
    (
        value DECIMAL NOT NULL,
        meter INT NOT NULL REFERENCES meter (id),
        date TIMESTAMP NOT NULL
    );

CREATE TABLE version (
    schema_version VARCHAR(50) NOT NULL,
    migrated TIMESTAMP NOT NULL DEFAULT current_timestamp
);

insert into
    version (schema_version)
values
    ('1');