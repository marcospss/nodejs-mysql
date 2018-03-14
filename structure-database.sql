--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gallery` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `file_name` varchar(150) NOT NULL,
  `project_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projects` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(70) NOT NULL,
  `title` varchar(70) NOT NULL,
  `meta_keywords` varchar(255) DEFAULT NULL,
  `meta_description` varchar(200) DEFAULT NULL,
  `description` text NOT NULL,
  `folder_files` varchar(50) NOT NULL,
  `highlight` tinyint(1) unsigned DEFAULT '0',
  `cover` varchar(100) DEFAULT NULL,
  `link` varchar(150) DEFAULT NULL,
  `order_display` int(11) DEFAULT '99',
  `status` tinyint(1) unsigned DEFAULT '0',
  `section_id` int(11) unsigned NOT NULL,
  `data_insert` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category_id` (`section_id`),
  KEY `slug` (`slug`),
  KEY `highlight` (`highlight`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sections`
--

DROP TABLE IF EXISTS `sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sections` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

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
  KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;