CREATE TABLE IF NOT EXISTS user_profile(
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(2) NOT NULL,
    PRIMARY KEY (email )
);