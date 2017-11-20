--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(40) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `data_insert` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userEmail` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8; 

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(70) NOT NULL,
  `title` varchar(70) NOT NULL,
  `meta_keywords` varchar(255) NOT NULL,
  `meta_description` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `data_insert` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gallery` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `file_name` varchar(150) NOT NULL,
  `content_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `content_id` (`content_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `contents`
--

DROP TABLE IF EXISTS `contents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contents` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(70) NOT NULL,
  `title` varchar(70) NOT NULL,
  `meta_keywords` varchar(255) DEFAULT NULL,
  `meta_description` varchar(200) DEFAULT NULL,
  `description` text NOT NULL,
  `folder_files` varchar(50) NOT NULL,
  `home_featured` tinyint(1) unsigned DEFAULT '0',
  `featured_image` varchar(100) DEFAULT NULL,
  `link` varchar(150) DEFAULT NULL,
  `order_home_featured` int(11) DEFAULT '99',
  `status` tinyint(1) unsigned DEFAULT '0',
  `category_id` int(11) unsigned NOT NULL,
  `data_insert` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `slug` (`slug`),
  KEY `order_home_featured` (`order_home_featured`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;