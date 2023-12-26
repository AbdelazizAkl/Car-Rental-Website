CREATE DATABASE carrental_db;

USE carrental_db;

CREATE TABLE Cars (
  id INT AUTO_INCREMENT PRIMARY KEY,
  model VARCHAR(50) NOT NULL,
  year INT NOT NULL,
  plateId VARCHAR(10) UNIQUE NOT NULL,
  status ENUM('active', 'outOfService', 'rented', 'maintenance') NOT NULL,
  office_id int NOT NULL,
  images TEXT,
  dailyPrice DECIMAL(10,2) NOT NULL,
  weeklyPrice DECIMAL(10,2) NOT NULL,
  mileage INT DEFAULT 0,
  features TEXT
);

CREATE TABLE Customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fName VARCHAR(50) NOT NULL,
  lName VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(60) NOT NULL,
  address VARCHAR(255),
  phone VARCHAR(20),
  driversLicense VARCHAR(20)
);

 CREATE TABLE Reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customerId INT NOT NULL,
  carId INT NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  totalPrice DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'confirmed', 'completed', 'canceled') NOT NULL,
  paymentDetails TEXT
);

CREATE TABLE Payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reservationId INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  paymentMethod VARCHAR(20) NOT NULL,
  transactionId VARCHAR(50),
  date DATETIME NOT NULL
  );

CREATE TABLE Offices (
  office_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  city VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  hoursOperation VARCHAR(50)
);

CREATE TABLE Admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(60) NOT NULL
);


Alter table payments ADD FOREIGN KEY (reservationId) REFERENCES Reservations(id);
Alter table Cars ADD FOREIGN KEY(office_id) REFERENCES offices(office_id);

Alter table Reservations add FOREIGN KEY (customerId) REFERENCES Customers(id);
Alter table Reservations add FOREIGN KEY (carId) REFERENCES Cars(id);


-- DROP DATABASE carrental_db;