-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 15 Mar 2025 pada 14.58
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `seatudy data`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `course data`
--

CREATE TABLE `course data` (
  `id` int(11) NOT NULL,
  `title` varchar(45) NOT NULL,
  `cdesc` varchar(255) NOT NULL,
  `cover` varchar(45) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `course data`
--

INSERT INTO `course data` (`id`, `title`, `cdesc`, `cover`, `price`) VALUES
(1, 'test title', 'test description', 'test cover', 95000),
(2, 'title from backend', 'desc from backend', 'cover from backend', 100),
(3, 'title from client', 'description from client', 'cover picture from client', 75000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user course`
--

CREATE TABLE `user course` (
  `user` varchar(15) NOT NULL,
  `courseId` int(11) NOT NULL,
  `title` varchar(45) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `cover` varchar(255) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `user data`
--

CREATE TABLE `user data` (
  `id` int(11) NOT NULL,
  `username` varchar(12) NOT NULL,
  `password` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user data`
--

INSERT INTO `user data` (`id`, `username`, `password`) VALUES
(1, 'testuser', 'testuser123');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `course data`
--
ALTER TABLE `course data`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user data`
--
ALTER TABLE `user data`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `course data`
--
ALTER TABLE `course data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `user data`
--
ALTER TABLE `user data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
