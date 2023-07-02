-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 02, 2023 at 11:52 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations_manager`
--
CREATE DATABASE IF NOT EXISTS `vacations_manager` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations_manager`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userCode` int(11) NOT NULL,
  `vacationCode` int(11) NOT NULL,
  `followerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userCode`, `vacationCode`, `followerId`) VALUES
(2, 153, 297),
(2, 161, 298);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userCode` int(11) NOT NULL,
  `firstName` varchar(25) NOT NULL,
  `lastName` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(25) NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userCode`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
(1, 'orel', 'mor', 'ormor@gmail.com', 'ormor', 'Admin'),
(2, 'mor', 'david', 'mordav@gmail.com', 'mordav', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationCode` int(11) NOT NULL,
  `destination` varchar(35) NOT NULL,
  `description` text NOT NULL,
  `startDate` text NOT NULL,
  `endDate` text NOT NULL,
  `price` int(11) NOT NULL,
  `imageName` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationCode`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(151, 'Rio de janeiro, Brazil', 'Parties and the beautiful beach of Copacabana and Ipanema', '2023-07-03', '2023-07-10', 456, '282ab5f9-b076-4ca3-8f26-021ba1216ab9.jpg'),
(152, 'Buzios, Brazil', 'The hottest location of this summer', '2023-07-20', '2023-07-25', 8700, '444d345a-28d7-43cb-a13b-f2ada0abfb2d.jpg'),
(153, 'Bariloche, Argentina', 'Sking in one the view of patagonia', '2023-07-14', '2023-07-19', 2400, '4b443c3e-d6af-4208-841a-c749f9d59399.jpg'),
(154, 'Naples, Italy', 'Visit the old town of Naples and try the italian cuisine', '2023-07-04', '2023-07-19', 6500, '863c6c3a-0e56-4382-ba32-8d97392782c3.jpg'),
(155, 'Amsterdam, Netherlands', 'Coffee shops and restaurants', '2023-08-01', '2023-08-04', 6578, '117d5750-5a7d-471c-9d95-1e03a06d37c0.jpg'),
(156, 'Cartagena, Colombia', 'The best destination of South America, visit the center and the culture around the locals, Jeep travels and hiking in the surrounding of the city, Walk in groups is recommended for tourists', '2023-07-04', '2023-07-05', 3445, '7ca330ea-fb06-4b3b-9e1b-47d8e6c79dfb.jpg'),
(157, 'Sinai Peninsula, Egypt', 'Rest your mind in the amazing desert on the Sinai peninsula in the view of the red sea,\r\nScuba diving and camel riding', '2023-07-03', '2023-07-05', 560, '44df2237-83a2-48db-b99d-f11900507167.jpg'),
(158, 'Madrid, Spain', 'Culinary travel for foodies', '2023-07-13', '2023-07-26', 6588, '8f134fe6-f02b-4b82-951d-99521e446c0a.jpg'),
(159, 'Salar De Ayuni, Bolivia', 'One of the seven wonders of the world the salt desert', '2023-07-22', '2023-07-29', 7689, 'd527fc38-6a47-437a-aab7-1698f7149170.jpg'),
(160, 'Sunny Beach, Bulgaria', 'Family vacation in eastern Europe,\r\nThe price is for 2 adults including the flight', '2023-07-04', '2023-07-12', 5566, '9936ea25-ce07-4a53-9486-5029e4a0f80f.jpg'),
(161, 'Islamabad, Pakistan', 'Nothing special to do', '2023-07-04', '2023-07-20', 78, 'fa887dcd-e7ff-4cb0-a2d7-c981299dd6f9.jpg'),
(162, 'Jakarta, Indonesia', 'South east Asia', '2023-07-20', '2023-07-28', 9999, '0117bba8-707a-47a4-8cc8-c32181a72c6a.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`followerId`),
  ADD KEY `userCode` (`userCode`),
  ADD KEY `vacationCode` (`vacationCode`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userCode`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationCode`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `followerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=299;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userCode` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationCode` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userCode`) REFERENCES `users` (`userCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationCode`) REFERENCES `vacations` (`vacationCode`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
