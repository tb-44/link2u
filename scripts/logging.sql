CREATE TABLE IF NOT EXISTS logging(
    id INT NOT NULL AUTO_INCREMENT,
    event_name VARCHAR(100),
    event_time DATETIME,
    job_id VARCHAR(100),
    applicant_email VARCHAR(100),
    recruiter_email VARCHAR(100),
    city VARCHAR(100),
    job_title VARCHAR(100),
    PRIMARY KEY(id)
);