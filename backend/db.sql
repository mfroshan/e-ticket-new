-- Database Creation
CREATE DATABASE IF NOT EXISTS railway_eticket;

-- Use the Database
USE railway_eticket;

-- Table for Admins
CREATE TABLE IF NOT EXISTS admins (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Table for Clerks
CREATE TABLE IF NOT EXISTS clerks (
    clerk_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    station_id INT,
    FOREIGN KEY (station_id) REFERENCES stations(station_id)
);

-- Table for Passengers
CREATE TABLE IF NOT EXISTS passengers (
    passenger_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    nid VARCHAR(20) UNIQUE NOT NULL
);

-- Table for Stations
CREATE TABLE IF NOT EXISTS stations (
    station_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Table for Trains
CREATE TABLE IF NOT EXISTS trains (
    train_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    UNIQUE KEY (name)
);

-- Table for Train Paths (Stations a Train Passes Through)
CREATE TABLE IF NOT EXISTS train_paths (
    train_path_id INT PRIMARY KEY AUTO_INCREMENT,
    train_id INT,
    station_id INT,
    position INT,
    FOREIGN KEY (train_id) REFERENCES trains(train_id),
    FOREIGN KEY (station_id) REFERENCES stations(station_id),
    UNIQUE KEY (train_id, station_id)
);

-- Table for Classes
CREATE TABLE IF NOT EXISTS classes (
    class_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

-- Table for Fares (Fares for Different Classes)
CREATE TABLE IF NOT EXISTS fares (
    fare_id INT PRIMARY KEY AUTO_INCREMENT,
    train_id INT,
    class_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (train_id) REFERENCES trains(train_id),
    FOREIGN KEY (class_id) REFERENCES classes(class_id),
    UNIQUE KEY (train_id, class_id)
);

-- Table for Tickets
CREATE TABLE IF NOT EXISTS tickets (
    ticket_id INT PRIMARY KEY AUTO_INCREMENT,
    passenger_id INT,
    train_id INT,
    class_id INT,
    departure_station_id INT,
    arrival_station_id INT,
    journey_date DATE,
    booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Booked', 'Cancelled') DEFAULT 'Booked',
    PRIMARY KEY (passenger_id, train_id, class_id, departure_station_id, arrival_station_id, journey_date),
    FOREIGN KEY (passenger_id) REFERENCES passengers(passenger_id),
    FOREIGN KEY (train_id, class_id) REFERENCES fares(train_id, class_id),
    FOREIGN KEY (departure_station_id) REFERENCES stations(station_id),
    FOREIGN KEY (arrival_station_id) REFERENCES stations(station_id)
);
