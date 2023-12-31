-- CREATE DATABASE carrental_db;

-- USE carrental_db;

CREATE TABLE
    Cars (
        id INT AUTO_INCREMENT PRIMARY KEY,
        brand VARCHAR(50) NOT NULL,
        model VARCHAR(50) NOT NULL,
        year INT NOT NULL,
        color VARCHAR(10) NOT NULL check (
            color in (
                'Blue',
                'Green',
                'Black',
                'White',
                'Red',
                'Silver',
                'Grey',
                'Bronze'
            )
        ),
        plateId VARCHAR(10) UNIQUE NOT NULL,
        status ENUM(
            'active',
            'outOfService',
            'rented'
        ) NOT NULL,
        office_id int NOT NULL,
        images TEXT,
        dailyPrice DECIMAL(10, 2) NOT NULL,
        weeklyPrice DECIMAL(10, 2) NOT NULL,
        mileage INT DEFAULT 0,
        features TEXT
    );

CREATE TABLE
    Customers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fName VARCHAR(50) NOT NULL,
        lName VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(60) NOT NULL,
        address VARCHAR(255),
        phone VARCHAR(20),
        PassportNumber VARCHAR(20) UNIQUE
    );

CREATE TABLE
    Reservations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customerId INT NOT NULL,
        carId INT NOT NULL,
        startDate DATE NOT NULL,
        endDate DATE NOT NULL,
        totalPrice DECIMAL(10, 2) NOT NULL,
        status ENUM(
            'reserved',
            'confirmed',
            'completed',
            'canceled'
        ) NOT NULL
    );

CREATE TABLE
    Payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        reservationId INT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        cvc CHAR(3) NOT NULL,
        cardNumber CHAR(16) NOT NULL,
        cardOwner VARCHAR(20) NOT NULL
    );

CREATE TABLE
    Offices (
        office_id INT AUTO_INCREMENT PRIMARY KEY,
        country VARCHAR(50) NOT NULL,
        city VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL
    );

CREATE TABLE
    Admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(60) NOT NULL
    );

Alter table payments
ADD
    FOREIGN KEY (reservationId) REFERENCES Reservations(id);

Alter table Cars
ADD
    FOREIGN KEY(office_id) REFERENCES offices(office_id);

Alter table Reservations
add
    FOREIGN KEY (customerId) REFERENCES Customers(id);

Alter table Reservations add FOREIGN KEY (carId) REFERENCES Cars(id);

--DROP DATABASE carrental_db;