-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 26, 2021 at 08:52 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `panzabi_tailors`
--

-- --------------------------------------------------------

--
-- Table structure for table `style_measure_parts`
--

CREATE TABLE `style_measure_parts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dependency` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `option` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `style_measure_parts`
--

INSERT INTO `style_measure_parts` (`id`, `name`, `dependency`, `image`, `option`) VALUES
(1, 'শেরওয়ানী কলার ক্যাটালগ', 'collar', NULL, NULL),
(2, 'শেরওয়ানী রাউন্ড কলার ক্যাটালগ', 'collar', NULL, NULL),
(3, 'শেরওয়ানী কলার', 'collar', NULL, NULL),
(4, 'শেরওয়ানী রাউন্ড কলার', 'collar', NULL, NULL),
(5, 'বেল্ড কলার', 'collar', NULL, NULL),
(6, 'রাউন্ড বেল্ড গলা', 'collar', NULL, NULL),
(7, 'গোল গলা', 'collar', NULL, NULL),
(8, 'শার্ট কলার', 'collar', NULL, NULL),
(9, 'কলারে হালকা সেইভ', 'collar', NULL, NULL),
(10, 'কলার প্লাটে নরম পেস্টিং', 'collar', NULL, NULL),
(11, 'কলার প্লেট', 'collar', NULL, NULL),
(12, 'লুজ হাতা', 'sleeve', NULL, NULL),
(13, 'হাতার নিচ ৩ সুতা', 'sleeve', NULL, NULL),
(14, 'সাইড ১.৫ সুতা', 'sleeve', NULL, NULL),
(15, 'স্ট্যাট কাফ', 'cuff', NULL, NULL),
(16, 'রাউন্ড কাফ', 'cuff', NULL, NULL),
(17, 'ডাবল প্লেট', 'plate', NULL, NULL),
(18, 'ডাবল প্লেট উল্টা', 'plate', NULL, NULL),
(19, 'নরমাল প্লেট', 'plate', NULL, NULL),
(20, 'নক সহ', 'plate', NULL, NULL),
(21, 'চোক্কা প্লেট', 'plate', NULL, NULL),
(22, 'ডিজাইন বুতাম', 'plate', NULL, NULL),
(23, 'বুকে এক পকেট', 'pocket', NULL, NULL),
(24, 'বুকে দুই পকেট', 'pocket', NULL, NULL),
(25, 'বুকে মেসওয়াক পকেট', 'pocket', NULL, NULL),
(26, 'বুকে ১ ১/২ পকেট', 'pocket', NULL, NULL),
(27, 'বুকে ভেতরে পকেট', 'pocket', NULL, NULL),
(28, 'কলার, প্লেট ও হাতায় পাইপিং', 'piping', NULL, NULL),
(29, 'কলারের ১ দিকে প্লাটের ৩ দিকে ও হাতার পাইপিং', 'piping', NULL, NULL),
(30, 'কলার প্লাট ও হাতার পট্টি অন্য কাপর দিয়ে পাইপিং', 'piping', NULL, NULL),
(31, 'কলার প্লেটে অন্য কাপর দিয়ে, শুধু হাতায় পাইপিং', 'piping', NULL, NULL),
(32, 'ডান পকেটে চেইন', 'zip', NULL, NULL),
(33, 'বাম পকেটে চেইন', 'zip', NULL, NULL),
(34, 'দুই পকেটে চেইন', 'zip', NULL, NULL),
(35, 'বুকে চেইন', 'zip', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `style_measure_parts`
--
ALTER TABLE `style_measure_parts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `style_measure_parts_name_unique` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `style_measure_parts`
--
ALTER TABLE `style_measure_parts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
