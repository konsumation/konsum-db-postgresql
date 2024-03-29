CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE,
    description VARCHAR(80),
    unit VARCHAR(10),
    fractional_digits INT NOT NULL DEFAULT 2,
    created TIMESTAMP NOT NULL DEFAULT current_timestamp,
    last_modified TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE meter (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    serial VARCHAR(100),
    category_id INT,
    description VARCHAR(80),
    unit VARCHAR(10),
    fractional_digits INT,
    valid_from TIMESTAMP,
    created TIMESTAMP NOT NULL DEFAULT current_timestamp,
    last_modified TIMESTAMP NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (category_id) REFERENCES category (id)
);

COMMENT ON COLUMN meter.unit IS 'physical unit like kWh or m3';

COMMENT ON COLUMN meter.fractional_digits IS 'display precission';

CREATE TABLE
values
    (
        value DECIMAL NOT NULL,
        meter_id INT NOT NULL REFERENCES meter (id),
        date TIMESTAMP NOT NULL,
        PRIMARY KEY(meter_id,date)
    );

CREATE TABLE note (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    meter_id INT NOT NULL REFERENCES meter (id),
    description VARCHAR(80)
);

CREATE TABLE version (
    schema_version VARCHAR(50) NOT NULL,
    migrated TIMESTAMP NOT NULL UNIQUE DEFAULT current_timestamp
);