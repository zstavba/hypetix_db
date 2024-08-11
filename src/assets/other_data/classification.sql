-- phpMyAdmin SQL Dump
-- version 5.2.1deb1ubuntu0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 29, 2024 at 04:14 PM
-- Server version: 8.0.35-0ubuntu0.23.04.1
-- PHP Version: 8.1.12-1ubuntu4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `konus`
--

-- --------------------------------------------------------

--
-- Table structure for table `classification`
--

CREATE TABLE `classification` (
  `id` int NOT NULL,
  `title` text CHARACTER SET utf8mb3 COLLATE utf8mb3_slovenian_ci,
  `status` text CHARACTER SET utf8mb3 COLLATE utf8mb3_slovenian_ci,
  `network` text CHARACTER SET utf8mb3 COLLATE utf8mb3_slovenian_ci,
  `active` tinyint DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `classification_id` text CHARACTER SET utf8mb3 COLLATE utf8mb3_slovenian_ci
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `classification`
--

INSERT INTO `classification` (`id`, `title`, `status`, `network`, `active`, `user_id`, `classification_id`) VALUES
(1, 'DOKUP TKANINA', '', '', 1, 1, '0001020000'),
(2, 'FLIS ZA KRPE', '', '', 1, 1, '0010100000'),
(3, 'DOKUP SHI', '', '', 1, 1, '0010200000'),
(4, 'FLIS ZA FILTRE', '', '', 1, 1, '0010300000'),
(5, 'FLIS ZVEZDA', '', '', 1, 1, '0010800000'),
(6, 'OBREZLINE', '', '', 1, 1, '0010900000'),
(7, 'KRPE ZA TLA', '', '', 1, 1, '0101010000'),
(8, 'KRPE DESORTIRANE', '', '', 1, 1, '0101011000'),
(9, 'KRPE ZA TLA PAKIRANE', '', '', 1, 1, '0101012000'),
(10, 'KRPE UNIVERZALNE', '', '', 1, 1, '0101020000'),
(11, 'KRPE ZA OKNA, AVTO', '', '', 1, 1, '0101030000'),
(12, 'KRPE GOBICE ZA STEKLO', '', '', 1, 1, '0101031000'),
(13, 'KRPE ZA OKNA PAKIRANE', '', '', 1, 1, '0101032000'),
(14, 'KRPE TWIN', '', '', 1, 1, '0101060000'),
(15, 'KRPE MULTI', '', '', 1, 1, '0101070000'),
(16, 'SILON KOMPOZITI', '', '', 1, 1, '0102000000'),
(17, 'SILON 300', '', '', 1, 1, '0102010000'),
(18, 'SILON 500 S', '', '', 1, 1, '0102020000'),
(19, 'SILON 500 SP', '', '', 1, 1, '0102030000'),
(20, 'SILON DESORTIRAN MATERIAL', '', '', 1, 1, '0102040000'),
(21, 'SILON F', '', '', 1, 1, '0102070000'),
(22, 'SILON ELAST', '', '', 1, 1, '0102071009'),
(23, 'KOMPONENTE ZA ZVEZDO', '', '', 1, 1, '0102071010'),
(24, 'SILON N/WR', '', '', 1, 1, '0102080000'),
(25, 'SILON N - CL', '', '', 1, 1, '0102080003'),
(26, 'SILON 200', '', '', 1, 1, '0102090000'),
(27, 'SILON KONFLINI', '', '', 1, 1, '0102100000'),
(28, 'SILON STOCK LOT', '', '', 1, 1, '0102120100'),
(29, 'SILON 600 S', '', '', 1, 1, '0102130000'),
(30, 'SILON WN', '', '', 1, 1, '0102150000'),
(31, 'SILON DOKUP VELOUR', '', '', 1, 1, '0102180000'),
(32, 'ZALOGA SILON MASTERROLLS', '', '', 1, 1, '0102190000'),
(33, 'ZVEZDA', '', '', 1, 1, '0102200000'),
(34, 'FILTRI', '', '', 1, 1, '0103000000'),
(35, 'FILTRI INDUSTRIJSKI', '', '', 1, 1, '0103010000'),
(36, 'TK.IZD.ZA SUHO FILTRACIJO IN BIGBAGS', '', '', 1, 1, '0103032200'),
(37, 'FILTER INDUSTRIJSKI - K', '', '', 1, 1, '0103040000'),
(38, 'TRANSPORTNI TRAKOVI', '', '', 1, 1, '0104000000'),
(39, 'SILON 60 HC, NA', '', '', 1, 1, '0104010000'),
(40, 'SILON 40 HC, NA', '', '', 1, 1, '0104020000'),
(41, 'SILON 25 HC, NA, FDA', '', '', 1, 1, '0104030000'),
(42, 'SILON 17 HC, FDA', '', '', 1, 1, '0104040000'),
(43, 'SILON 12 NA', '', '', 1, 1, '0104060000'),
(44, 'TRANSPORTNI TRAK PNEVMATSKI', '', '', 1, 1, '0104080000'),
(45, 'SILON 16', '', '', 1, 1, '0104100000'),
(46, 'KONFLINI ZA KONFEKCIJO - KO', '', '', 1, 1, '0105020000'),
(47, 'KONFLINI ZA KONFEKCIJO- KO', '', '', 1, 1, '0105021000'),
(48, 'KONFLINI ZA AVTOMOBILSKO INDUSTRIJO - A', '', '', 1, 1, '0105030000'),
(49, 'KONFLINI ZA ODEJE - OD', '', '', 1, 1, '0105040000'),
(50, 'KONFLINI / MEDVLOGE - M', '', '', 1, 1, '0105050000'),
(51, 'KONFLIN - DODELAVE', '', '', 1, 1, '0105070000'),
(52, 'KONFLIN - KONFEKCIJA T', '', '', 1, 1, '0105080000'),
(53, 'KONFLIN - KONFEKCIJA T', '', '', 1, 1, '0105080100'),
(54, 'FNA', '', '', 1, 1, '0105090000'),
(55, 'KOFIL - INDUSTRIJSKA FILTRACIJA IZDELEK KOS', '', '', 1, 1, '0106100000'),
(56, 'KOFIL - INDUSTRIJSKA FILTRACIJA MATERIAL M2', '', '', 1, 1, '0106110000'),
(57, 'KOFIL - INDUSTRIJSKA FILTRACIJA VISOKOTEMPERATURNI MATERIAL M2', '', '', 1, 1, '0106120000'),
(58, 'KOFIL - PROSTORSKA FILTRACIJA IZDELEK KOS', '', '', 1, 1, '0106200000'),
(59, 'KOFIL - PROSTORSKA FILTRACIJA MATERIAL M2', '', '', 1, 1, '0106210000'),
(60, 'KOFIL PROSTORSKA FILTRACIJA PROIZVODNJA TATKO IZDELEK KOS', '', '', 1, 1, '0106400000'),
(61, 'KOFIL S', '', '', 1, 1, '0106500000'),
(62, 'TIPI TOP', '', '', 1, 1, '0107100000'),
(63, 'TIPI TOP,KRPE,GOBE', '', '', 1, 1, '0107110000'),
(64, 'TIPI TOP,PLAVI PROGRAM', '', '', 1, 1, '0107130000'),
(65, 'TIPI TOP KOMPLETI,AKCIJE', '', '', 1, 1, '0107140000'),
(66, 'TIPI TOP LIKALNE PODLOGE', '', '', 1, 1, '0107150000'),
(67, 'KOFIL MASKE', '', '', 1, 1, '0107200000'),
(68, 'TIPI TOP NAPE', '', '', 1, 1, '0107400000'),
(69, 'TIPI TOP TRGOVINA', '', '', 1, 1, '0107600000'),
(70, 'M-130', '', '', 1, 1, '0108021010'),
(71, 'M-130, NEDODELANI', '', '', 1, 1, '0108021011'),
(72, 'M-290', '', '', 1, 1, '0108021020'),
(73, 'M-290, NEDODELANI', '', '', 1, 1, '0108021021'),
(74, 'OSTALO - PREHRAMB. TRAK.', '', '', 1, 1, '0108021030'),
(75, 'M-260', '', '', 1, 1, '0108021040'),
(76, 'METAL COILER', '', '', 1, 1, '0108052000'),
(77, 'EXTR. VRSTA 80', '', '', 1, 1, '0109111000'),
(78, 'EXTR. VRSTA 81', '', '', 1, 1, '0109112000'),
(79, 'EXTR. VRSTA 85', '', '', 1, 1, '0109113000'),
(80, 'CEPLJENEC Z LEPILOM', '', '', 1, 1, '0109116100'),
(81, 'LEPILO', '', '', 1, 1, '0109117000'),
(82, 'SPOJKE', '', '', 1, 1, '0109119000'),
(83, 'KLINASTI JERMENI', '', '', 1, 1, '0109120000'),
(84, 'OKROGLI JERMENI', '', '', 1, 1, '0109129000'),
(85, 'VARIATORSKI JERMENI', '', '', 1, 1, '0109130000'),
(86, 'ZOBATI JERMENI', '', '', 1, 1, '0109140000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `classification`
--
ALTER TABLE `classification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_1d336e2287f34f4487d7979759f` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `classification`
--
ALTER TABLE `classification`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `classification`
--
ALTER TABLE `classification`
  ADD CONSTRAINT `FK_1d336e2287f34f4487d7979759f` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
