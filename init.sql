-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: lms_db
-- ------------------------------------------------------
-- Server version	9.7.0

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '6866b54f-5929-11f1-84db-de5938c26f70:1-107';

--
-- Table structure for table `SurveyUser`
--

DROP TABLE IF EXISTS `SurveyUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SurveyUser` (
  `id` varchar(36) NOT NULL,
  `total` int NOT NULL,
  `userId` varchar(36) DEFAULT NULL,
  `surveyId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c5be21defa47c705c6abafce32d` (`userId`),
  KEY `FK_ecbed1d585a9c5dd8254962f4ee` (`surveyId`),
  CONSTRAINT `FK_c5be21defa47c705c6abafce32d` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_ecbed1d585a9c5dd8254962f4ee` FOREIGN KEY (`surveyId`) REFERENCES `surveys` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SurveyUser`
--

LOCK TABLES `SurveyUser` WRITE;
/*!40000 ALTER TABLE `SurveyUser` DISABLE KEYS */;
INSERT INTO `SurveyUser` VALUES ('231fe889-a55e-40cd-a878-36746d5fae86',3,'34e17bec-fb11-4e71-a29f-634324e831dc','f043478e-f71f-4819-a4dc-519aca2f6d92'),('3550f7f9-8a39-432e-9598-3336857ba700',5,'34e17bec-fb11-4e71-a29f-634324e831dc','9b2f3011-f9a9-4c70-aa57-c22830ad28b4'),('38dc034a-2a36-46bb-845b-f7065b0f77c2',3,'34e17bec-fb11-4e71-a29f-634324e831dc','1a200e3e-2ead-47ed-add8-ac8aa655efd9'),('f513a0af-c38e-4492-9130-9c81ba3b90fe',3,'34e17bec-fb11-4e71-a29f-634324e831dc','e0768ec3-a7ca-46da-9e67-4a23bd58ba49');
/*!40000 ALTER TABLE `SurveyUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answers` (
  `id` varchar(36) NOT NULL,
  `rating` int NOT NULL,
  `questionsId` varchar(36) DEFAULT NULL,
  `responseId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_d879782d03bdc3e22ac3ce632f7` (`questionsId`),
  KEY `FK_7740f7edbfa151044d12ee85862` (`responseId`),
  CONSTRAINT `FK_7740f7edbfa151044d12ee85862` FOREIGN KEY (`responseId`) REFERENCES `SurveyUser` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_d879782d03bdc3e22ac3ce632f7` FOREIGN KEY (`questionsId`) REFERENCES `questions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
INSERT INTO `answers` VALUES ('01f798d3-45d8-4690-8e61-247a776031e2',2,'8571ece4-1a09-495c-b106-b28a620ed682','38dc034a-2a36-46bb-845b-f7065b0f77c2'),('08b0a16c-cbf4-45b5-b4ff-2883bdc3ba0b',5,'07b05d48-ef26-463a-9d4c-c12624c80842','3550f7f9-8a39-432e-9598-3336857ba700'),('1af23553-cb03-4d23-ac71-d598b027f4d9',4,'c5319cdf-941d-4c06-b44d-a91234f8fdab','f513a0af-c38e-4492-9130-9c81ba3b90fe'),('34896e20-c187-4e9f-8d69-4ad6d643ad38',5,'c440bd8b-105f-4987-aec8-d05a3ef6f8cd','38dc034a-2a36-46bb-845b-f7065b0f77c2'),('3f4880f6-35e4-49ac-8f81-fbe3e2cbcc1a',3,'b5ed491c-62d2-45ad-b7f9-97c4a9f94ef5','f513a0af-c38e-4492-9130-9c81ba3b90fe'),('4950b64a-a241-4b74-920b-fb7da931d215',3,'b8ee2f31-d7ff-4c4e-a34a-b47e01133507','38dc034a-2a36-46bb-845b-f7065b0f77c2'),('515eaa93-6bdf-4e92-b3c8-96511b36542f',1,'bb424a12-53a2-4576-a1a4-f94326b8b6d3','231fe889-a55e-40cd-a878-36746d5fae86'),('5c4ad1ed-882d-4677-9b3c-d9dcfa006417',4,'9192b049-62bd-48e3-a208-3f7694e4374b','38dc034a-2a36-46bb-845b-f7065b0f77c2'),('5ebc6e60-db09-4205-8014-d3600b5b6c96',5,'f20bb82d-b828-4340-b933-32e1da46d530','3550f7f9-8a39-432e-9598-3336857ba700'),('60747dfa-2a2c-4b38-88d3-8e962bbdbc87',5,'c81a175d-19e5-42a8-aa3e-2d13a57b4ff3','231fe889-a55e-40cd-a878-36746d5fae86'),('c8089fca-1e0b-42ce-a662-e0eb40de10c6',5,'10afb43e-0d0e-4885-b12e-2e54a2e14909','3550f7f9-8a39-432e-9598-3336857ba700'),('cb5706a4-f1a7-4c82-935d-0c8562d2aaa2',2,'2dec0cb5-3fb1-4581-921e-410b27ee5a75','f513a0af-c38e-4492-9130-9c81ba3b90fe'),('ccd10cbb-19e4-43ab-acf3-0976b26429f1',2,'a30f7ffa-00c8-4a46-b5fd-133eea3be39f','38dc034a-2a36-46bb-845b-f7065b0f77c2'),('cd02ce33-2678-4338-ab3e-03c2afdc17aa',4,'5a05f752-113d-414c-8203-5844031ff982','231fe889-a55e-40cd-a878-36746d5fae86'),('d03f4d95-94a8-48ce-adc1-27766b1c26b0',5,'298c3ba0-4997-432c-8415-c56d712b2fbd','3550f7f9-8a39-432e-9598-3336857ba700'),('d630f56a-0820-4c1c-ad25-8326a5da842f',1,'92f714e4-f8d7-4b8a-abe0-1c00dff23a20','f513a0af-c38e-4492-9130-9c81ba3b90fe'),('e30b8428-3b18-4e4f-aa91-57e1aac8750c',5,'b760e714-fea0-4553-862c-a1a90bbf5f37','3550f7f9-8a39-432e-9598-3336857ba700'),('ec80db6f-9739-4062-8028-9bda0e8aa261',1,'1d73616c-6e37-41ed-9cb2-85cb7c1c3215','231fe889-a55e-40cd-a878-36746d5fae86'),('ee2f3c1b-317a-4c4f-8a47-be2e4a9e3eb9',4,'63cbf653-f72d-41e6-aa1e-30ee205a418b','f513a0af-c38e-4492-9130-9c81ba3b90fe'),('f63174a3-a26f-4f0a-a3bf-1e2422f4affc',2,'4b2e71cf-0cc8-464c-82f7-9ef5e2df77b1','231fe889-a55e-40cd-a878-36746d5fae86');
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES ('a5550077-59b9-11f1-b08f-e6f4cb3a5261','Mobile development'),('aac70ed5-59b9-11f1-b08f-e6f4cb3a5261','Web development'),('ae0d8a8f-59b9-11f1-b08f-e6f4cb3a5261','Software development');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `files` (
  `id` varchar(36) NOT NULL,
  `originalName` varchar(255) NOT NULL,
  `key` varchar(255) NOT NULL,
  `mimeType` varchar(255) NOT NULL,
  `size` int NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `lessonId` varchar(36) DEFAULT NULL,
  `submitId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_99a93b6e242ce73592dbab8b5c8` (`lessonId`),
  KEY `FK_8a9046ec69c8c3693993ca94e23` (`submitId`),
  CONSTRAINT `FK_8a9046ec69c8c3693993ca94e23` FOREIGN KEY (`submitId`) REFERENCES `submit` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_99a93b6e242ce73592dbab8b5c8` FOREIGN KEY (`lessonId`) REFERENCES `lessons` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES ('0426a500-9aed-4a68-9eed-908588f97567','OIP (1).webp','746a4cb5-8b59-4f65-a16c-c04568937cef-OIP (1).webp','image/webp',2050,'2026-05-27 13:14:13.177320',NULL,NULL),('2fc5c85e-cdc7-4fa2-aed9-210f5432c191','Documentacion.pdf','9212b4f1-ebda-4462-8f15-59e8f2b784ee-Documentacion.pdf','application/pdf',7123315,'2026-05-27 13:55:15.124427',NULL,'2573d588-93dc-4e19-8612-25f58b787ab8'),('5108ea6b-f25b-4b18-add1-da704cd9d660','flutter_logo-freelogovectors.net_.png','737ad285-0783-409e-97cb-83ee9eefdaee-flutter_logo-freelogovectors.net_.png','image/png',9028,'2026-05-27 13:11:44.328679',NULL,NULL),('5388edc6-3c16-44cd-a589-fa5d7e93dfea','R.png','ed662e30-fd54-4cbe-941a-73392b7808d0-R.png','image/png',5953,'2026-05-27 13:09:15.855429',NULL,NULL),('74e1f9b7-32ea-4779-b911-039c30e36b9a','OIP.jpg','cbf62c15-8e85-4969-8cd6-00d2f7fc6936-OIP.jpg','image/jpeg',7272,'2026-05-27 13:15:15.250544',NULL,NULL),('807c4eb8-9cbd-46cb-ad5d-f28e66540689','angular.webp','becca56d-c1bc-45e4-a867-2a903f708d46-angular.webp','image/webp',5156,'2026-05-27 12:58:47.415224',NULL,NULL),('91071179-64f0-45c9-b8ed-343686609136','OIP.webp','8e04c6ad-10af-482f-8d7b-3de1c007fda4-OIP.webp','image/webp',5462,'2026-05-27 13:12:35.830233',NULL,NULL),('d6632a2d-f0a7-4ee8-9d1d-48e7b4a631cd','R.png','d0db57c6-80d0-47d3-92aa-f3fb94e2d004-R.png','image/png',5953,'2026-05-27 13:09:20.160115',NULL,NULL),('f721c897-4a0f-452d-b599-e3119bd39f62','OIP.webp','3bce564f-8d2b-438d-b1cf-714f20cd9f8e-OIP.webp','image/webp',5462,'2026-05-27 13:12:33.112567',NULL,NULL);
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grades`
--

DROP TABLE IF EXISTS `grades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grades` (
  `id` varchar(36) NOT NULL,
  `total` int NOT NULL,
  `min_range` int NOT NULL DEFAULT '0',
  `max_range` int NOT NULL DEFAULT '10',
  `feedback` varchar(255) NOT NULL,
  `teacherId` varchar(36) DEFAULT NULL,
  `studentId` varchar(36) DEFAULT NULL,
  `taskSubmittedId` varchar(36) DEFAULT NULL,
  `projectId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_d0865dffe1d3cbfff716684d05` (`taskSubmittedId`),
  KEY `FK_e60eb3569366f86a886f7027b3d` (`teacherId`),
  KEY `FK_fcfc027e4e5fb37a4372e688070` (`studentId`),
  KEY `FK_29541c35b895c162d8c30975bc6` (`projectId`),
  CONSTRAINT `FK_29541c35b895c162d8c30975bc6` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_d0865dffe1d3cbfff716684d05c` FOREIGN KEY (`taskSubmittedId`) REFERENCES `submit` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_e60eb3569366f86a886f7027b3d` FOREIGN KEY (`teacherId`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_fcfc027e4e5fb37a4372e688070` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grades`
--

LOCK TABLES `grades` WRITE;
/*!40000 ALTER TABLE `grades` DISABLE KEYS */;
/*!40000 ALTER TABLE `grades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lessons`
--

DROP TABLE IF EXISTS `lessons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lessons` (
  `id` varchar(36) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` longtext,
  `unitId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_7c9fe457707c44ae26910acf6c5` (`unitId`),
  CONSTRAINT `FK_7c9fe457707c44ae26910acf6c5` FOREIGN KEY (`unitId`) REFERENCES `sections` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lessons`
--

LOCK TABLES `lessons` WRITE;
/*!40000 ALTER TABLE `lessons` DISABLE KEYS */;
INSERT INTO `lessons` VALUES ('4dbf681d-5850-4158-ac7d-35bb928042a1','What\'s Angular?','<p>Angular&nbsp;is&nbsp;an&nbsp;<strong>open-source,&nbsp;TypeScript-based&nbsp;web&nbsp;application&nbsp;framework</strong>&nbsp;maintained&nbsp;by&nbsp;Google&nbsp;and&nbsp;a&nbsp;large&nbsp;developer&nbsp;community.&nbsp;It&nbsp;is&nbsp;designed&nbsp;for&nbsp;building&nbsp;<strong>dynamic,&nbsp;scalable,&nbsp;and&nbsp;maintainable&nbsp;single-page&nbsp;applications&nbsp;(SPAs)</strong>&nbsp;with&nbsp;a&nbsp;strong&nbsp;focus&nbsp;on&nbsp;performance,&nbsp;modularity,&nbsp;and&nbsp;developer&nbsp;productivity.</p><p>It&nbsp;offers&nbsp;a&nbsp;<strong>component-based&nbsp;architecture</strong>,&nbsp;a&nbsp;rich&nbsp;set&nbsp;of&nbsp;<strong>built-in&nbsp;libraries</strong>&nbsp;(routing,&nbsp;forms,&nbsp;HTTP&nbsp;client,&nbsp;animations),&nbsp;and&nbsp;<strong>developer&nbsp;tools</strong>&nbsp;like&nbsp;the&nbsp;Angular&nbsp;CLI&nbsp;and&nbsp;DevTools&nbsp;for&nbsp;efficient&nbsp;development&nbsp;and&nbsp;debugging.</p><p><strong>Key&nbsp;Features:</strong></p><ul><li><strong>Components</strong>&nbsp;–&nbsp;Encapsulated&nbsp;UI&nbsp;building&nbsp;blocks&nbsp;with&nbsp;HTML&nbsp;templates,&nbsp;TypeScript&nbsp;logic,&nbsp;and&nbsp;scoped&nbsp;styles.</li><li><strong>Two-Way&nbsp;Data&nbsp;Binding</strong>&nbsp;–&nbsp;Automatic&nbsp;synchronization&nbsp;between&nbsp;the&nbsp;UI&nbsp;and&nbsp;application&nbsp;state.</li><li><strong>Dependency&nbsp;Injection</strong>&nbsp;–&nbsp;Modular,&nbsp;reusable&nbsp;services&nbsp;injected&nbsp;where&nbsp;needed.</li><li><strong>Directives</strong>&nbsp;–&nbsp;Extend&nbsp;HTML&nbsp;with&nbsp;custom&nbsp;behaviors&nbsp;(<em>*ngIf</em>,&nbsp;<em>*ngFor</em>,&nbsp;etc.).</li><li><strong>Routing</strong>&nbsp;–&nbsp;SPA&nbsp;navigation&nbsp;with&nbsp;lazy&nbsp;loading,&nbsp;guards,&nbsp;and&nbsp;data&nbsp;resolvers.</li><li><strong>Forms&nbsp;&amp;&nbsp;Validation</strong>&nbsp;–&nbsp;Template-driven&nbsp;and&nbsp;reactive&nbsp;forms&nbsp;with&nbsp;built-in&nbsp;validation.</li><li><strong>Internationalization&nbsp;&amp;&nbsp;Security</strong>&nbsp;–&nbsp;ICU&nbsp;message&nbsp;formatting,&nbsp;HTML&nbsp;sanitization,&nbsp;and&nbsp;trusted&nbsp;types.</li></ul><p></p>','077fb966-83bf-4ef9-a3b5-af15789a5fbf');
/*!40000 ALTER TABLE `lessons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` varchar(36) NOT NULL,
  `title` varchar(50) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `last_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `description` longtext NOT NULL,
  `duration` int NOT NULL DEFAULT '105',
  `isActive` tinyint NOT NULL DEFAULT '0',
  `authorId` varchar(36) DEFAULT NULL,
  `imageId` varchar(36) DEFAULT NULL,
  `categoryId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_ef3ae594e51fcc648bb8656463` (`imageId`),
  KEY `FK_284d88f48163afb6eea98c8b0fc` (`authorId`),
  KEY `FK_b7d7d44e0e33834351af221757d` (`categoryId`),
  CONSTRAINT `FK_284d88f48163afb6eea98c8b0fc` FOREIGN KEY (`authorId`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_b7d7d44e0e33834351af221757d` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`),
  CONSTRAINT `FK_ef3ae594e51fcc648bb8656463d` FOREIGN KEY (`imageId`) REFERENCES `files` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES ('2a3807b1-8eb3-4d70-a0b4-8eb80a693f26','Flutter - Intermediate program','2026-05-27 13:11:44.332989','2026-05-27 11:12:45','<p><span style=\"color: rgb(31, 31, 31); background-color: rgba(0, 0, 0, 0);\">Stop&nbsp;wasting&nbsp;time&nbsp;and&nbsp;budget&nbsp;maintaining&nbsp;two&nbsp;separate&nbsp;codebases;&nbsp;master&nbsp;Flutter&nbsp;to&nbsp;build&nbsp;high-performance,&nbsp;pixel-perfect&nbsp;native&nbsp;apps&nbsp;for&nbsp;both&nbsp;iOS&nbsp;and&nbsp;Android&nbsp;from&nbsp;a&nbsp;single&nbsp;source&nbsp;of&nbsp;truth.</span></p><p></p>',105,1,'d6356fbc-7673-4d05-a156-d1590a2d6bff','5108ea6b-f25b-4b18-add1-da704cd9d660','a5550077-59b9-11f1-b08f-e6f4cb3a5261'),('75470f22-14e1-434f-aad3-6b66826940c3','Angular basics','2026-05-27 12:58:47.423308','2026-05-27 11:12:48','<p>Start&nbsp;your&nbsp;journey&nbsp;with&nbsp;Angular&nbsp;here!</p>',105,1,'d6356fbc-7673-4d05-a156-d1590a2d6bff','807c4eb8-9cbd-46cb-ad5d-f28e66540689','aac70ed5-59b9-11f1-b08f-e6f4cb3a5261'),('ac83ad67-d958-44bf-bd09-e9d004d2ef2f','React - Advanced course','2026-05-27 13:12:35.834632','2026-05-27 11:12:35','<p>Master&nbsp;the&nbsp;art&nbsp;of&nbsp;building&nbsp;scalable,&nbsp;high-performance&nbsp;cross-platform&nbsp;applications&nbsp;with&nbsp;React&nbsp;Native,&nbsp;enabling&nbsp;you&nbsp;to&nbsp;deliver&nbsp;seamless,&nbsp;native-grade&nbsp;mobile&nbsp;experiences&nbsp;for&nbsp;both&nbsp;iOS&nbsp;and&nbsp;Android&nbsp;from&nbsp;a&nbsp;single,&nbsp;unified&nbsp;codebase.</p>',105,1,'d6356fbc-7673-4d05-a156-d1590a2d6bff','91071179-64f0-45c9-b8ed-343686609136','aac70ed5-59b9-11f1-b08f-e6f4cb3a5261'),('e4987d7f-6795-4b32-a307-ccd1c7a397ba','Spring boot - Begginer course','2026-05-27 13:15:15.254653','2026-05-27 11:15:15','<p><span style=\"color: rgb(31, 31, 31); background-color: rgba(0, 0, 0, 0);\">Master&nbsp;the&nbsp;essentials&nbsp;of&nbsp;professional&nbsp;backend&nbsp;development&nbsp;with&nbsp;Spring&nbsp;Boot,&nbsp;the&nbsp;leading&nbsp;framework&nbsp;that&nbsp;simplifies&nbsp;Java&nbsp;application&nbsp;creation&nbsp;through&nbsp;automated&nbsp;configuration&nbsp;and&nbsp;a&nbsp;powerful&nbsp;ecosystem&nbsp;for&nbsp;building&nbsp;robust,&nbsp;scalable,&nbsp;and&nbsp;production-ready&nbsp;APIs.</span></p><p></p>',105,1,'d6356fbc-7673-4d05-a156-d1590a2d6bff','74e1f9b7-32ea-4779-b911-039c30e36b9a','ae0d8a8f-59b9-11f1-b08f-e6f4cb3a5261'),('f0c7a998-b030-4f03-8b8b-5860a69cd482','Kotlin - How to start mobile development!','2026-05-27 13:14:13.182077','2026-05-27 11:14:13','<p><span style=\"color: rgb(31, 31, 31); background-color: rgba(0, 0, 0, 0);\">Unlock&nbsp;the&nbsp;full&nbsp;power&nbsp;of&nbsp;modern&nbsp;mobile&nbsp;development&nbsp;by&nbsp;mastering&nbsp;Kotlin,&nbsp;the&nbsp;industry-standard&nbsp;language&nbsp;that&nbsp;combines&nbsp;conciseness,&nbsp;safety,&nbsp;and&nbsp;seamless&nbsp;interoperability&nbsp;to&nbsp;build&nbsp;robust,&nbsp;high-performance&nbsp;native&nbsp;Android&nbsp;applications.</span></p><p></p>',105,1,'d6356fbc-7673-4d05-a156-d1590a2d6bff','0426a500-9aed-4a68-9eed-908588f97567','a5550077-59b9-11f1-b08f-e6f4cb3a5261'),('f79e6ba6-ef39-414e-97a6-cf20d6be9273','NestJS - From Zero to Master!','2026-05-27 13:09:20.164455','2026-05-27 11:12:42','<p>Take&nbsp;your&nbsp;backend&nbsp;skills&nbsp;to&nbsp;the&nbsp;next&nbsp;level&nbsp;with&nbsp;structured&nbsp;and&nbsp;scalable&nbsp;NestJS&nbsp;development.</p>',105,1,'d6356fbc-7673-4d05-a156-d1590a2d6bff','d6632a2d-f0a7-4ee8-9d1d-48e7b4a631cd','ae0d8a8f-59b9-11f1-b08f-e6f4cb3a5261');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `surveyId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8eee23e5ccebd4025ecaccda1b2` (`surveyId`),
  CONSTRAINT `FK_8eee23e5ccebd4025ecaccda1b2` FOREIGN KEY (`surveyId`) REFERENCES `surveys` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES ('07b05d48-ef26-463a-9d4c-c12624c80842','Overall rating','9b2f3011-f9a9-4c70-aa57-c22830ad28b4'),('10afb43e-0d0e-4885-b12e-2e54a2e14909','What would you change?','9b2f3011-f9a9-4c70-aa57-c22830ad28b4'),('1d73616c-6e37-41ed-9cb2-85cb7c1c3215','Do you consider the content of this course was hard for you?','f043478e-f71f-4819-a4dc-519aca2f6d92'),('298c3ba0-4997-432c-8415-c56d712b2fbd','Do you think you earned new skills from this course?','9b2f3011-f9a9-4c70-aa57-c22830ad28b4'),('2dec0cb5-3fb1-4581-921e-410b27ee5a75','Do you consider the content of this course was hard for you?','e0768ec3-a7ca-46da-9e67-4a23bd58ba49'),('4b2e71cf-0cc8-464c-82f7-9ef5e2df77b1','What would you change?','f043478e-f71f-4819-a4dc-519aca2f6d92'),('5a05f752-113d-414c-8203-5844031ff982','Please evaluate the order of the content and teacher participation','f043478e-f71f-4819-a4dc-519aca2f6d92'),('63cbf653-f72d-41e6-aa1e-30ee205a418b','Overall rating','e0768ec3-a7ca-46da-9e67-4a23bd58ba49'),('8571ece4-1a09-495c-b106-b28a620ed682','Do you think the tasks were useful?','1a200e3e-2ead-47ed-add8-ac8aa655efd9'),('9192b049-62bd-48e3-a208-3f7694e4374b','Overall rating','1a200e3e-2ead-47ed-add8-ac8aa655efd9'),('92f714e4-f8d7-4b8a-abe0-1c00dff23a20','What would you change?','e0768ec3-a7ca-46da-9e67-4a23bd58ba49'),('a30f7ffa-00c8-4a46-b5fd-133eea3be39f','Do you consider the content of this course was hard for you?','1a200e3e-2ead-47ed-add8-ac8aa655efd9'),('b5ed491c-62d2-45ad-b7f9-97c4a9f94ef5','Please evaluate the order of the content and teacher participation','e0768ec3-a7ca-46da-9e67-4a23bd58ba49'),('b760e714-fea0-4553-862c-a1a90bbf5f37','Please evaluate the order of the content and teacher participation','9b2f3011-f9a9-4c70-aa57-c22830ad28b4'),('b8ee2f31-d7ff-4c4e-a34a-b47e01133507','Do you think you earned new skills from this course?','1a200e3e-2ead-47ed-add8-ac8aa655efd9'),('bb424a12-53a2-4576-a1a4-f94326b8b6d3','Do you think you earned new skills from this course?','f043478e-f71f-4819-a4dc-519aca2f6d92'),('c440bd8b-105f-4987-aec8-d05a3ef6f8cd','Please evaluate the order of the content and teacher participation','1a200e3e-2ead-47ed-add8-ac8aa655efd9'),('c5319cdf-941d-4c06-b44d-a91234f8fdab','Do you think you earned new skills from this course?','e0768ec3-a7ca-46da-9e67-4a23bd58ba49'),('c81a175d-19e5-42a8-aa3e-2d13a57b4ff3','Overall rating','f043478e-f71f-4819-a4dc-519aca2f6d92'),('f20bb82d-b828-4340-b933-32e1da46d530','Do you consider the content of this course was hard for you?','9b2f3011-f9a9-4c70-aa57-c22830ad28b4');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sections`
--

DROP TABLE IF EXISTS `sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sections` (
  `id` varchar(36) NOT NULL,
  `title` varchar(50) NOT NULL,
  `projectId` varchar(36) DEFAULT NULL,
  `description` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_5931b236026516e243c9f3da988` (`projectId`),
  CONSTRAINT `FK_5931b236026516e243c9f3da988` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sections`
--

LOCK TABLES `sections` WRITE;
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;
INSERT INTO `sections` VALUES ('077fb966-83bf-4ef9-a3b5-af15789a5fbf','Introduction','75470f22-14e1-434f-aad3-6b66826940c3','What\'s Angular, how was it created and what problem does it solve.');
/*!40000 ALTER TABLE `sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submit`
--

DROP TABLE IF EXISTS `submit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submit` (
  `id` varchar(36) NOT NULL,
  `date_send` date DEFAULT NULL,
  `studentId` varchar(36) DEFAULT NULL,
  `taskId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_6afc15c1be84673b4ff5d691d51` (`studentId`),
  KEY `FK_ea476aaa43346118e1ec7bf245c` (`taskId`),
  CONSTRAINT `FK_6afc15c1be84673b4ff5d691d51` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_ea476aaa43346118e1ec7bf245c` FOREIGN KEY (`taskId`) REFERENCES `tasks` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submit`
--

LOCK TABLES `submit` WRITE;
/*!40000 ALTER TABLE `submit` DISABLE KEYS */;
INSERT INTO `submit` VALUES ('2573d588-93dc-4e19-8612-25f58b787ab8','2026-05-27','34e17bec-fb11-4e71-a29f-634324e831dc','015db0b9-720e-4aae-b342-752db434f4e6');
/*!40000 ALTER TABLE `submit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `surveys`
--

DROP TABLE IF EXISTS `surveys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `surveys` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT 'Satisfaction survey',
  `userAuthorId` varchar(36) DEFAULT NULL,
  `projectsId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_77f3567a7de167b03e1578894e` (`projectsId`),
  KEY `FK_5b032df2237403b1a7df8fcf411` (`userAuthorId`),
  CONSTRAINT `FK_5b032df2237403b1a7df8fcf411` FOREIGN KEY (`userAuthorId`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_77f3567a7de167b03e1578894e3` FOREIGN KEY (`projectsId`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `surveys`
--

LOCK TABLES `surveys` WRITE;
/*!40000 ALTER TABLE `surveys` DISABLE KEYS */;
INSERT INTO `surveys` VALUES ('1a200e3e-2ead-47ed-add8-ac8aa655efd9','Satisfaction survey','d6356fbc-7673-4d05-a156-d1590a2d6bff','75470f22-14e1-434f-aad3-6b66826940c3'),('9b2f3011-f9a9-4c70-aa57-c22830ad28b4','Satisfaction survey','d6356fbc-7673-4d05-a156-d1590a2d6bff','ac83ad67-d958-44bf-bd09-e9d004d2ef2f'),('e0768ec3-a7ca-46da-9e67-4a23bd58ba49','Satisfaction survey','d6356fbc-7673-4d05-a156-d1590a2d6bff','f79e6ba6-ef39-414e-97a6-cf20d6be9273'),('f043478e-f71f-4819-a4dc-519aca2f6d92','Satisfaction survey','d6356fbc-7673-4d05-a156-d1590a2d6bff','e4987d7f-6795-4b32-a307-ccd1c7a397ba');
/*!40000 ALTER TABLE `surveys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `task_created` datetime DEFAULT NULL,
  `task_open` datetime DEFAULT NULL,
  `task_close` datetime DEFAULT NULL,
  `fileSize` int NOT NULL,
  `userAuthorId` varchar(36) DEFAULT NULL,
  `lessonTaskId` varchar(36) DEFAULT NULL,
  `description` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a71843efe98fa7510616d0590c7` (`userAuthorId`),
  KEY `FK_4730b1947835adf0e4b31dfe8f8` (`lessonTaskId`),
  CONSTRAINT `FK_4730b1947835adf0e4b31dfe8f8` FOREIGN KEY (`lessonTaskId`) REFERENCES `lessons` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_a71843efe98fa7510616d0590c7` FOREIGN KEY (`userAuthorId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES ('015db0b9-720e-4aae-b342-752db434f4e6','Essay about Angular origins.','2026-05-27 13:46:32','2026-05-20 13:46:00','2026-06-03 13:46:00',50000000,'d6356fbc-7673-4d05-a156-d1590a2d6bff','4dbf681d-5850-4158-ac7d-35bb928042a1','<h3><strong>Instructions</strong></h3><p>Write&nbsp;an&nbsp;essay&nbsp;between&nbsp;<strong>800&nbsp;and&nbsp;1200&nbsp;words</strong>&nbsp;covering&nbsp;the&nbsp;following&nbsp;topics:</p><ul><li>The&nbsp;creation&nbsp;of&nbsp;AngularJS&nbsp;and&nbsp;the&nbsp;problems&nbsp;it&nbsp;aimed&nbsp;to&nbsp;solve.</li><li>The&nbsp;role&nbsp;of&nbsp;Google&nbsp;in&nbsp;Angular’s&nbsp;development.</li><li>Key&nbsp;differences&nbsp;between&nbsp;AngularJS&nbsp;and&nbsp;modern&nbsp;Angular.</li><li>The&nbsp;introduction&nbsp;of&nbsp;TypeScript&nbsp;and&nbsp;component-based&nbsp;architecture.</li><li>How&nbsp;Angular&nbsp;compares&nbsp;to&nbsp;other&nbsp;frontend&nbsp;frameworks&nbsp;such&nbsp;as&nbsp;React&nbsp;and&nbsp;Vue.js.</li><li>The&nbsp;impact&nbsp;Angular&nbsp;has&nbsp;had&nbsp;on&nbsp;enterprise&nbsp;web&nbsp;applications.</li></ul><p></p><h3><strong>Submission&nbsp;Details</strong></h3><p></p><ul><li><strong>Format:</strong>&nbsp;PDF&nbsp;or&nbsp;DOCX</li><li><strong>File&nbsp;Name&nbsp;Format:</strong></li><li>&nbsp;<code>lastname_firstname_angular_essay</code></li></ul><p></p>');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `fullName` text NOT NULL,
  `isActive` tinyint NOT NULL DEFAULT '1',
  `roles` set('admin','super-user','user') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('34e17bec-fb11-4e71-a29f-634324e831dc','student@gmail.com','$2b$10$vHbAibXQqauEoArfnBIOPerqwC2b.7Isngx1lgHePnB7i77uwsqJK','Student 1',1,'user'),('b414e103-4ecb-40d6-bbe9-226e749ba61b','student2@gmail.com','$2b$10$te0DRhLwAP2ySjFSqdge7eZg1hRGsZiWtVMEgoiDqwyY7Z0213IZe','student2',1,'user'),('d6356fbc-7673-4d05-a156-d1590a2d6bff','lidiadmdt@gmail.com','$2b$10$i.n5oEEetCRQwcW/L.vuRO5o6XuwKK0qx9vzcJIv49YcO1ps/hsla','Lidia del Moral de la Torre',1,'admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users-projects`
--

DROP TABLE IF EXISTS `users-projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users-projects` (
  `id` varchar(36) NOT NULL,
  `start_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` date DEFAULT NULL,
  `userId` varchar(36) DEFAULT NULL,
  `projectId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_92636d0ab1932dd8823a56453c2` (`userId`),
  KEY `FK_2fb8be6540f732d0e1d6e0c0096` (`projectId`),
  CONSTRAINT `FK_2fb8be6540f732d0e1d6e0c0096` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_92636d0ab1932dd8823a56453c2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users-projects`
--

LOCK TABLES `users-projects` WRITE;
/*!40000 ALTER TABLE `users-projects` DISABLE KEYS */;
INSERT INTO `users-projects` VALUES ('2e153741-c87b-4bf6-9793-9449b82e48ef','2026-05-27 13:58:22','2026-05-27','34e17bec-fb11-4e71-a29f-634324e831dc','f79e6ba6-ef39-414e-97a6-cf20d6be9273'),('33e4428b-bbbd-4753-b9e7-2ca7c30134cb','2026-05-27 13:58:24','2026-05-27','34e17bec-fb11-4e71-a29f-634324e831dc','ac83ad67-d958-44bf-bd09-e9d004d2ef2f'),('4b0f6e66-8052-4d22-97fd-1c58658d8d6e','2026-05-27 13:58:17','2026-05-27','34e17bec-fb11-4e71-a29f-634324e831dc','e4987d7f-6795-4b32-a307-ccd1c7a397ba'),('a300c1cc-be30-4068-a081-d7b770db9a69','2026-05-27 13:58:20','2026-05-27','34e17bec-fb11-4e71-a29f-634324e831dc','f0c7a998-b030-4f03-8b8b-5860a69cd482'),('acf67a07-19fd-4659-9a3a-074dfc70bb1d','2026-05-27 13:16:10','2026-05-27','34e17bec-fb11-4e71-a29f-634324e831dc','75470f22-14e1-434f-aad3-6b66826940c3'),('d0819687-7371-4c16-84d1-6176ad6a8bda','2026-05-27 13:58:14','2026-05-27','34e17bec-fb11-4e71-a29f-634324e831dc','2a3807b1-8eb3-4d70-a0b4-8eb80a693f26');
/*!40000 ALTER TABLE `users-projects` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-27 14:42:55
