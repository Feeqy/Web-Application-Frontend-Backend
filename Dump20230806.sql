CREATE DATABASE  IF NOT EXISTS `spgames` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `spgames`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: spgames
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `cat_id` int(11) NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(100) NOT NULL,
  `cat_description` varchar(255) NOT NULL,
  PRIMARY KEY (`cat_id`),
  UNIQUE KEY `cat_name_UNIQUE` (`cat_name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Action','An action game emphasizes physical challenges, including hand–eye\ncoordination and reaction-time'),(2,'Horror','The three key components for a devilishly spooky and well-done horror game include unpredictability, an aversion to cheapness, and an awareness of environment.'),(8,'Strategy','A strategy game or strategic game is a game in which the players\' uncoerced, and often autonomous, decision-making skills have a high significance in determining the outcome.');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `gameid` int(11) NOT NULL AUTO_INCREMENT,
  `game_title` varchar(100) NOT NULL,
  `game_description` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  `game_image` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`gameid`),
  UNIQUE KEY `game_title_UNIQUE` (`game_title`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (47,'Granny The Oldie','Granny is a horror game lol',2023,'Granny1.jpg','2023-05-28 15:44:55'),(50,'Clash Royale','Clash Royale is all about clashing.',2023,'ClashRoyale.jpg','2023-07-14 07:34:08'),(51,'Granny The Oldie: The Beginning','This game talks about how Granny came about.',2023,'Granny2.jpg','2023-07-14 07:36:31'),(64,'Soul Knight','asdfa',2023,'SoulKnight.jpg','2023-08-06 09:03:04'),(72,'Game','asdfsdf',2023,'Game.png','2023-08-06 12:37:11');
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_category`
--

DROP TABLE IF EXISTS `game_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_gamecat_id` int(11) NOT NULL,
  `fk_catgame_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_gamecategory_id_idx` (`fk_gamecat_id`),
  KEY `fk_categorygame_id_idx` (`fk_catgame_id`),
  CONSTRAINT `fk_categorygame_id` FOREIGN KEY (`fk_catgame_id`) REFERENCES `category` (`cat_id`),
  CONSTRAINT `fk_gamecategory_id` FOREIGN KEY (`fk_gamecat_id`) REFERENCES `game` (`gameid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_category`
--

LOCK TABLES `game_category` WRITE;
/*!40000 ALTER TABLE `game_category` DISABLE KEYS */;
INSERT INTO `game_category` VALUES (5,47,1),(6,47,2),(10,50,1),(11,50,8),(12,51,1),(13,51,2),(14,51,8),(19,64,1),(20,72,1),(21,72,8);
/*!40000 ALTER TABLE `game_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_platform`
--

DROP TABLE IF EXISTS `game_platform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_platform` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_game_id` int(11) NOT NULL,
  `fk_platform_id` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `gameplatform_platform_idx` (`fk_platform_id`),
  KEY `gameplatform_game` (`fk_game_id`),
  CONSTRAINT `gameplatform_game` FOREIGN KEY (`fk_game_id`) REFERENCES `game` (`gameid`) ON DELETE CASCADE,
  CONSTRAINT `gameplatform_platform` FOREIGN KEY (`fk_platform_id`) REFERENCES `platform` (`plat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_platform`
--

LOCK TABLES `game_platform` WRITE;
/*!40000 ALTER TABLE `game_platform` DISABLE KEYS */;
INSERT INTO `game_platform` VALUES (43,47,1,40.30),(44,47,2,50.00),(45,47,3,59.50),(49,50,1,10.00),(50,50,2,20.30),(51,50,3,25.00),(52,51,1,12.00),(53,51,2,26.30),(54,51,3,28.00),(71,64,1,15.00),(72,64,2,10.00),(73,64,3,5.00),(83,72,1,15.00),(84,72,2,10.00),(85,72,3,5.00);
/*!40000 ALTER TABLE `game_platform` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platform`
--

DROP TABLE IF EXISTS `platform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platform` (
  `plat_id` int(11) NOT NULL AUTO_INCREMENT,
  `platform_name` varchar(100) NOT NULL,
  `platform_description` varchar(100) NOT NULL,
  PRIMARY KEY (`plat_id`),
  UNIQUE KEY `platform_name_UNIQUE` (`platform_name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platform`
--

LOCK TABLES `platform` WRITE;
/*!40000 ALTER TABLE `platform` DISABLE KEYS */;
INSERT INTO `platform` VALUES (1,'PC','Personal Computer'),(2,'PS5','Playstation 5'),(3,'Phone','Mobile Phone'),(4,'XBOX','It is a XBOX.');
/*!40000 ALTER TABLE `platform` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `reviewid` int(11) NOT NULL AUTO_INCREMENT,
  `review_userid` int(11) NOT NULL,
  `review_gameid` int(11) NOT NULL,
  `review_content` text NOT NULL,
  `review_rating` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reviewid`),
  KEY `fk_review_userid_idx` (`review_userid`),
  KEY `fk_review_gameid_idx` (`review_gameid`),
  CONSTRAINT `fk_review_gameid` FOREIGN KEY (`review_gameid`) REFERENCES `game` (`gameid`) ON DELETE CASCADE,
  CONSTRAINT `fk_review_userid` FOREIGN KEY (`review_userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (6,11,47,'Nah bro fr the game was fire man',5,'2023-05-28 16:06:33'),(10,13,50,'Clash Royale is such an awesome game.',4,'2023-07-18 04:28:29'),(11,15,51,'This game is not as good as the first one.',3,'2023-07-18 04:38:18'),(15,11,50,'Such a good strategy game!',5,'2023-07-20 03:31:42'),(16,13,47,'It\'s a wonderful game.',4,'2023-07-21 15:14:01'),(18,13,50,'qwertyu',4,'2023-07-31 06:18:52'),(24,13,50,'hello',3,'2023-08-01 03:12:51'),(25,13,50,'fdsdsfd',2,'2023-08-01 03:45:16'),(26,13,51,'xcvxcvx',2,'2023-08-06 13:48:31'),(27,13,72,'its a game',4,'2023-08-06 13:49:50');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `type` varchar(45) NOT NULL,
  `profile_pic_url` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (11,'Jimmy Bomb','jimmy@gmail.com','jimmy123','Customer','https://www.abc.com/jimmy.jpg','2023-05-26 16:24:46'),(12,'Terry Tan','terry@gmail.com','terry123','Admin','https://www.abc.com/terry.jpg','2023-05-27 08:39:49'),(13,'John Smith','johnsmith@gmail.com','john123','Customer','https://www.abc.com/john.jpg','2023-06-15 05:57:54'),(15,'Tim','tim@gmail.com','tim123','Customer','https://www.abc.com/tim.jpg','2023-06-20 04:14:23');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-06 22:28:05
