CREATE TABLE shareholdersTable (
  id int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  stocksCount float NOT NULL,
  stocksType VARCHAR(255) NOT NULL
);