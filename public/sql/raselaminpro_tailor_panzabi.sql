-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 05, 2021 at 12:18 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `raselaminpro_tailor_panzabi`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `Full_Name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `user_id`, `Full_Name`, `mobile`, `email`, `address`, `photo`, `created_at`, `updated_at`) VALUES
(1, 1, 'হাসিব স্যার', '12345678768', NULL, NULL, 'hasib-szar-1636067685.jpg', '2021-11-04 17:14:45', '2021-11-04 17:14:45');

-- --------------------------------------------------------

--
-- Table structure for table `design_items`
--

CREATE TABLE `design_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `design_items`
--

INSERT INTO `design_items` (`id`, `name`, `slug`) VALUES
(1, 'কলার', 'collar'),
(2, 'হাতা', 'sleeve'),
(3, 'কাফ', 'cuff'),
(4, 'প্লেট', 'plate'),
(5, 'পকেট', 'pocket'),
(6, 'পিছনে', 'back'),
(7, 'পাইপিং', 'piping'),
(8, 'চেইন', 'zip'),
(9, 'সেলাই', 'sewing'),
(10, 'এমব্রয়ডারি', 'embroidery'),
(11, 'কারচুপি', 'karchupi'),
(12, 'অন্যান্য', 'other');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(4, '2019_08_19_000000_create_failed_jobs_table', 1),
(5, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(6, '2021_09_01_192539_create_sessions_table', 1),
(7, '2021_09_07_075245_create_roles_table', 1),
(8, '2021_09_08_193748_create_tailors_page_settings_table', 1),
(9, '2021_09_09_071441_create_products_table', 1),
(15, '2021_09_23_104226_create_design_items_table', 2),
(35, '2021_09_22_092010_create_style_measure_parts_table', 2),
(115, '2014_10_12_200000_add_two_factor_columns_to_users_table', 3),
(131, '2021_09_11_222208_create_customers_table', 4),
(132, '2021_09_11_222400_create_orders_table', 4),
(133, '2021_09_11_222430_create_order_items_table', 4),
(134, '2021_11_03_084801_create_order_item_styles_table', 4),
(135, '2021_11_04_213316_create_order_delivery_addresses_table', 4);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `order_number` bigint(20) UNSIGNED NOT NULL,
  `wages` decimal(8,2) NOT NULL,
  `discount` decimal(8,2) NOT NULL DEFAULT 0.00,
  `total` decimal(8,2) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `delivered_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `customer_id`, `order_number`, `wages`, `discount`, `total`, `status`, `delivered_date`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, '56.00', '0.00', '176.00', 1, '2021-11-06', '2021-11-04 17:14:45', '2021-11-04 17:14:45');

-- --------------------------------------------------------

--
-- Table structure for table `order_delivery_addresses`
--

CREATE TABLE `order_delivery_addresses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `order_number` int(11) NOT NULL,
  `delivery_system` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `courier_details` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `delivery_charge` decimal(8,2) DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'bd',
  `line1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `line2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `province` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zipcode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_delivery_addresses`
--

INSERT INTO `order_delivery_addresses` (`id`, `customer_id`, `order_id`, `order_number`, `delivery_system`, `courier_details`, `delivery_charge`, `country`, `line1`, `line2`, `province`, `city`, `zipcode`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, '1', 'সুন্দারবন কুরিয়ার', '120.00', 'bd', 'রায়ান্দা, শরন খোলা ', NULL, 'খুলনা', 'বাগেরহাট', '4567', '2021-11-04 17:14:45', '2021-11-04 17:14:45');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `order_number` bigint(20) UNSIGNED NOT NULL,
  `cloth_long` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cloth_body` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cloth_belly` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `belly_loose` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `body_loose` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cloth_enclosure` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hand_long` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sleeve_enclosure` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sleeve_pasting` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cloth_throat` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cloth_collar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cloth_shoulder` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cloth_mora` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `noke_shoho` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cloth_additional` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `customer_id`, `product_id`, `order_id`, `order_number`, `cloth_long`, `cloth_body`, `cloth_belly`, `belly_loose`, `body_loose`, `cloth_enclosure`, `hand_long`, `sleeve_enclosure`, `sleeve_pasting`, `cloth_throat`, `cloth_collar`, `cloth_shoulder`, `cloth_mora`, `noke_shoho`, `cloth_additional`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 1, '12', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', '8', NULL, NULL, '2021-11-04 17:14:45', '2021-11-04 17:14:45');

-- --------------------------------------------------------

--
-- Table structure for table `order_item_styles`
--

CREATE TABLE `order_item_styles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `order_number` bigint(20) UNSIGNED NOT NULL,
  `order_item_id` bigint(20) UNSIGNED NOT NULL,
  `style_id` int(11) NOT NULL,
  `style_details` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `item_style_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_item_styles`
--

INSERT INTO `order_item_styles` (`id`, `customer_id`, `order_id`, `order_number`, `order_item_id`, `style_id`, `style_details`, `item_style_type`) VALUES
(1, 1, 1, 1, 1, 1, ' ', 'collar'),
(2, 1, 1, 1, 1, 3, ' ', 'collar'),
(3, 1, 1, 1, 1, 23, 'fdkfjdkjf', 'pocket');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(5,2) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `option` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `slug`, `price`, `status`, `option`) VALUES
(1, 'একছাটা', 'একছাটা', NULL, 1, ''),
(2, 'পাঞ্জাবী', 'পাঞ্জাবী', NULL, 1, NULL),
(3, 'শর্ট পাঞ্জাবী', 'শর্ট পাঞ্জাবী', NULL, 1, ''),
(4, 'পায়জামা', 'পায়জামা', NULL, 1, NULL),
(5, 'একছাটা জুব্বা', 'একছাটা জুব্বা', NULL, 1, NULL),
(6, ' কাবলী', ' কাবলী', NULL, 1, NULL),
(7, 'এরাবিয়ান', 'এরাবিয়ান', NULL, 1, NULL),
(8, ' গোলজামা', ' গোলজামা', NULL, 1, NULL),
(9, 'ফতুয়া', 'ফতুয়া', NULL, 1, NULL),
(10, 'শেরওয়ানী', 'শেরওয়ানী', NULL, 1, NULL),
(11, 'কটি', 'কটি', NULL, 1, NULL),
(12, 'সালোয়ার', 'সালোয়ার', NULL, 1, NULL),
(13, 'চোষ পায়জামা', 'চোষ-পায়জামা', NULL, 1, NULL),
(14, 'আলিগড়', 'আলিগড়', NULL, 1, NULL),
(15, ' ধুতি', ' ধুতি', NULL, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `short_role` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payload` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('CM2SS8CRzrRNAUgaykhH465LUKhtWDWuuYyHR4ka', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36', 'YTo3OntzOjY6Il90b2tlbiI7czo0MDoiZHR0a2NmMXZLQlNHelNTdlpiamVKdWxSVmdJU2pwYXNFdEIxcUtUcCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9jdXN0b21lci9jdXN0b21lcnMiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO3M6NToidXR5cGUiO3M6MzoiQURNIjtzOjE3OiJwYXNzd29yZF9oYXNoX3dlYiI7czo2MDoiJDJ5JDEwJFAuN3dqWkxzdFFobWZQOGNvTWMzb09wcGFZQlZ4b09tWlY5b2ZOVS9JMzg2MG4uS2cwdFRPIjtzOjIxOiJwYXNzd29yZF9oYXNoX3NhbmN0dW0iO3M6NjA6IiQyeSQxMCRQLjd3alpMc3RRaG1mUDhjb01jM29PcHBhWUJWeG9PbVpWOW9mTlUvSTM4NjBuLktnMHRUTyI7fQ==', 1636067752);

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
(1, 'শেরওয়ানী রাউন্ড কলার ক্যাটালগ', 'collar', NULL, NULL),
(2, 'শেরওয়ানী কলার', 'collar', NULL, NULL),
(3, 'শেরওয়ানী কলার ক্যাটালগ', 'collar', NULL, NULL),
(4, 'শেরওয়ানী রাউন্ড কলার', 'collar', NULL, NULL),
(5, 'বেল্ড কলার', 'collar', NULL, NULL),
(6, 'রাউন্ড বেল্ড গলা', 'collar', NULL, NULL),
(7, 'শার্ট কলার', 'collar', NULL, NULL),
(8, 'কলারে হালকা সেইভ হবে', 'collar', NULL, NULL),
(9, 'কলার প্লেটে সাত সুতা', 'collar', NULL, NULL),
(10, 'কলার প্লেট', 'collar', NULL, NULL),
(11, 'লুজ হাতা', 'sleeve', NULL, NULL),
(12, 'হাতার নিচ ৩ সুতা', 'sleeve', NULL, NULL),
(13, 'সাইড ১.৫ সুতা', 'sleeve', NULL, NULL),
(14, 'স্ট্যাট কাফ', 'cuff', NULL, NULL),
(15, 'রাউন্ড কাফ', 'cuff', NULL, NULL),
(16, 'ডাবল প্লেট', 'plate', NULL, NULL),
(17, 'ডাবল প্লেট উল্টা', 'plate', NULL, NULL),
(18, 'নরমাল প্লেট', 'plate', NULL, NULL),
(19, 'নক সহ', 'plate', NULL, NULL),
(20, 'চোক্কা প্লেট', 'plate', NULL, NULL),
(21, 'ডিজাইন বুতাম', 'plate', NULL, NULL),
(22, 'বুকে এক পকেট', 'pocket', NULL, NULL),
(23, 'বুকে ১ ১/২ পকেট', 'pocket', NULL, NULL),
(24, 'বুকে মেসওয়াক পকেট', 'pocket', NULL, NULL),
(25, 'ডান পাশে ১ পকেট', 'pocket', NULL, NULL),
(26, 'বাম পাশে ১ পকেট', 'pocket', NULL, NULL),
(27, '২ পাশে পকেট', 'pocket', NULL, NULL),
(28, '১টি মোবাইল পকেট', 'pocket', NULL, NULL),
(29, 'পিছনে তিরা', 'back', NULL, NULL),
(30, 'কলার, প্লেট ও হাতায় পাইপিং', 'piping', NULL, NULL),
(31, 'কলার প্লাট ও হাতার পট্টি অন্য কাপর দিয়ে পাইপিং', 'piping', NULL, NULL),
(32, 'কলার প্লেটে অন্য কাপর দিয়ে, শুধু হাতায় পাইপিং', 'piping', NULL, NULL),
(33, 'কলারের ১ দিকে প্লাটের ৩ দিকে ও হাতার পাইপিং', 'piping', NULL, NULL),
(34, 'বুকে চেইন', 'zip', NULL, NULL),
(35, 'ডান পকেটে চেইন', 'zip', NULL, NULL),
(36, 'বাম পকেটে চেইন', 'zip', NULL, NULL),
(37, 'মোবাইল পকেটে চেইন', 'zip', NULL, NULL),
(38, 'হাতা নিচ ৩ সুতা', 'Sewing', NULL, NULL),
(39, 'TR', 'embroidery', NULL, NULL),
(40, 'BD', 'embroidery', NULL, NULL),
(41, 'No.', 'embroidery', NULL, NULL),
(42, 'কারচুপির নাম', 'karchupi', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tailors_page_settings`
--

CREATE TABLE `tailors_page_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `where_apply` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tailors_page_settings`
--

INSERT INTO `tailors_page_settings` (`id`, `name`, `value`, `where_apply`) VALUES
(1, 'rolestabsetting', 'newrole', NULL),
(2, 'productstabsetting', 'newproduct', NULL),
(3, 'measurestyleparttabsetting', 'newstylemeasure', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `two_factor_recovery_codes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role_id` tinyint(4) NOT NULL DEFAULT 6,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `disabled` tinyint(1) NOT NULL DEFAULT 0,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role_change_id` bigint(20) UNSIGNED DEFAULT NULL,
  `current_team_id` bigint(20) UNSIGNED DEFAULT NULL,
  `profile_photo_path` varchar(2048) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `username`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `role_id`, `status`, `disabled`, `remember_token`, `role_change_id`, `current_team_id`, `profile_photo_path`, `created_at`, `updated_at`) VALUES
(1, 'Abu Taher', 'abutaher267@gmail.com', 'taher267', NULL, '$2y$10$P.7wjZLstQhmfP8coMc3oOppaYBVxoOmZV9ofNU/I3860n.Kg0tTO', NULL, NULL, 1, 1, 0, NULL, NULL, NULL, NULL, '2021-10-26 14:43:58', '2021-10-26 14:43:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customers_mobile_unique` (`mobile`),
  ADD UNIQUE KEY `customers_email_unique` (`email`),
  ADD KEY `customers_user_id_foreign` (`user_id`);

--
-- Indexes for table `design_items`
--
ALTER TABLE `design_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `design_items_name_unique` (`name`),
  ADD UNIQUE KEY `design_items_slug_unique` (`slug`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_user_id_foreign` (`user_id`),
  ADD KEY `orders_customer_id_foreign` (`customer_id`);

--
-- Indexes for table `order_delivery_addresses`
--
ALTER TABLE `order_delivery_addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_delivery_addresses_customer_id_foreign` (`customer_id`),
  ADD KEY `order_delivery_addresses_order_id_foreign` (`order_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_customer_id_foreign` (`customer_id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`);

--
-- Indexes for table `order_item_styles`
--
ALTER TABLE `order_item_styles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_item_styles_customer_id_foreign` (`customer_id`),
  ADD KEY `order_item_styles_order_id_foreign` (`order_id`),
  ADD KEY `order_item_styles_order_item_id_foreign` (`order_item_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_name_unique` (`name`),
  ADD UNIQUE KEY `products_slug_unique` (`slug`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roles_user_id_foreign` (`user_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `style_measure_parts`
--
ALTER TABLE `style_measure_parts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `style_measure_parts_name_unique` (`name`);

--
-- Indexes for table `tailors_page_settings`
--
ALTER TABLE `tailors_page_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tailors_page_settings_name_unique` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_username_unique` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `design_items`
--
ALTER TABLE `design_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `order_delivery_addresses`
--
ALTER TABLE `order_delivery_addresses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `order_item_styles`
--
ALTER TABLE `order_item_styles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `style_measure_parts`
--
ALTER TABLE `style_measure_parts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `tailors_page_settings`
--
ALTER TABLE `tailors_page_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_delivery_addresses`
--
ALTER TABLE `order_delivery_addresses`
  ADD CONSTRAINT `order_delivery_addresses_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_delivery_addresses_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_item_styles`
--
ALTER TABLE `order_item_styles`
  ADD CONSTRAINT `order_item_styles_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_item_styles_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_item_styles_order_item_id_foreign` FOREIGN KEY (`order_item_id`) REFERENCES `order_items` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `roles`
--
ALTER TABLE `roles`
  ADD CONSTRAINT `roles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
