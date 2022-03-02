-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: diplomski
-- ------------------------------------------------------
-- Server version	8.0.18

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
-- Table structure for table `account_data`
--

DROP TABLE IF EXISTS `account_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_data` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `profile_picture_path` varchar(255) DEFAULT NULL,
  `username` varchar(128) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_r0lpw0jgd3rbg6i8y65autey1` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_data`
--

LOCK TABLES `account_data` WRITE;
/*!40000 ALTER TABLE `account_data` DISABLE KEYS */;
INSERT INTO `account_data` VALUES (1,'email@email.com','{bcrypt}$2a$10$48sD.TTbJdKOweR5gUHQxuAZMNXTmGcDLu20R/B5.nXlipUb7.sb2','images/profile_images/admin_1.png','admin1'),(2,'email2@email.com','{bcrypt}$2a$10$7m8hvvcaQ2CLOg4qiDSO5eLhkboUhLabHDNYYOkTsRfkSSU1cvc0G','images/profile_images/admin_2.png','admin2'),(3,'email3@email.com','{bcrypt}$2a$10$wr9NxjkujwAK95BpjnUYze3jB50YYI9ZUBL7LRlCLxg/cCBEsr1cS',NULL,'admin3'),(4,'email4@email.com','{bcrypt}$2a$10$7m8hvvcaQ2CLOg4qiDSO5eLhkboUhLabHDNYYOkTsRfkSSU1cvc0G','images/profile_images/critic_1.png','Petar_Petrovic'),(5,'email5@email.com','{bcrypt}$2a$10$7m8hvvcaQ2CLOg4qiDSO5eLhkboUhLabHDNYYOkTsRfkSSU1cvc0G','images/profile_images/critic_2.png','Marko_Markovic'),(6,'email6@email.com','{bcrypt}$2a$10$9ro3sqJbpNkWvIRVRKReqO/gkwgs0N4QIelzY0ShwzTy/JbwtAfsS','images/profile_images/critic_3.png','Ana_Anic'),(7,'email7@email.com','{bcrypt}$2a$10$9ZQvjdEZ61oktmHQKJHUfOTckG.ByU8irBXjE6kms5KLa.aRdNtfe','images/profile_images/student_student_77.png','user1'),(8,'email8@email.com','{bcrypt}$2a$10$lRlyaajA8qYTZIKl8FuzlO2Qs9opQ54UcSR5GVA0u6i25E0XejU3.','images/profile_images/admin_1.png','user2'),(9,'email9@email.com','{bcrypt}$2a$10$/W2M0s5zvtT7GHvAxg4UbevIKm8CEnG6lrzbhuNGIY7a/yKGkiYKm','images/profile_images/admin_1.png','user3'),(47,'user4@google.com','{bcrypt}$2a$10$CaUeiXMfi8cRimXL9SPrM.mz28nhPCAmasNiAKFIsJgcVULHrJH6O','images/profile_images/student_student_novi.png','user9');
/*!40000 ALTER TABLE `account_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_data_permission`
--

DROP TABLE IF EXISTS `account_data_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_data_permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_data_id` bigint(20) DEFAULT NULL,
  `permission_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKo5q9942hliaihiis3b452oq48` (`account_data_id`),
  KEY `FKd4s1clq07d84s1q4xx0cxbfek` (`permission_id`),
  CONSTRAINT `FKd4s1clq07d84s1q4xx0cxbfek` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`),
  CONSTRAINT `FKo5q9942hliaihiis3b452oq48` FOREIGN KEY (`account_data_id`) REFERENCES `account_data` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_data_permission`
--

LOCK TABLES `account_data_permission` WRITE;
/*!40000 ALTER TABLE `account_data_permission` DISABLE KEYS */;
INSERT INTO `account_data_permission` VALUES (1,1,1),(2,2,1),(3,3,1),(4,4,2),(5,5,2),(6,6,2),(7,7,3),(8,8,3),(9,9,3),(46,47,3);
/*!40000 ALTER TABLE `account_data_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `actor`
--

DROP TABLE IF EXISTS `actor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actor` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `deleted` bit(1) NOT NULL,
  `first_name` varchar(128) NOT NULL,
  `last_name` varchar(128) NOT NULL,
  `date_of_birth` datetime DEFAULT NULL,
  `profile_picture_path` varchar(128) NOT NULL,
  `place_of_birth` varchar(255) NOT NULL,
  `biography` varchar(1234) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actor`
--

LOCK TABLES `actor` WRITE;
/*!40000 ALTER TABLE `actor` DISABLE KEYS */;
INSERT INTO `actor` VALUES (19,_binary '\0','Jack','Nicholson','1937-04-22 00:00:00','images/actor_pictures/jack_nicholson.jpg','Neptune, New Jersey, USA','Jack Nicholson, an American actor, producer, director and screenwriter, is a three-time Academy Award winner and twelve-time nominee. Nicholson is also notable for being one of two actors - the other being Michael Caine - who have received an Oscar nomination in every decade from the \'60s through the \'00s.'),(20,_binary '\0','Louise','Fletcher','1934-07-22 00:00:00','images/actor_pictures/louise_fletcher.jpg','Birmingham, Alabama, USA','Born in Birmingham, Alabama, to Episcopal minister Robert Fletcher and his wife Estelle, both of whom were deaf, Louise Fletcher was introduced to performing at a young age by the aunt who taught her to speak. After graduating from the University of North Carolina, she took a trip out west with her roommates, finding herself in Los Angeles without enough money to return home. She took a temporary job as a receptionist and signed up for acting classes at night. Soon she was working regularly in television and film, but after marrying producer Jerry Bick and having two sons, the actress took a long hiatus to raise her children.'),(21,_binary '\0','Kurt','Russell','1951-03-17 00:00:00','images/actor_pictures/kurt_russell.jpg','Springfield, Massachusetts, USA','Kurt Vogel Russell was born on March 17, 1951 in Springfield, Massachusetts, to Louise Julia Russell (née Crone), a dancer, and Bing Russell, an actor. He is of English, German, Scottish and Irish descent. His first roles were as a child on television series, including a lead role on the Western series The Travels of Jaimie McPheeters (1963). Russell landed a role in the Elvis Presley movie, It Happened at the World\'s Fair (1963), when he was eleven years old. Walt Disney himself signed Russell to a 10-year contract, and, according to Robert Osborne, he became the studio\'s top star of the 1970s. Having voiced adult Copper in the animated Disney film The Fox and the Hound (1981), Russell is one of the few famous child stars in Hollywood who has been able to continue his acting career past his teen years.'),(24,_binary '\0','Brad','Pitt','1963-12-18 00:00:00','images/actor_pictures/brad_pitt.jpg','Shawnee, Oklahoma, USA','An actor and producer known as much for his versatility as he is for his handsome face, Golden Globe-winner Brad Pitt\'s most widely recognized role may be Tyler Durden in Fight Club (1999). However, his portrayals of Billy Beane in Moneyball (2011), and Rusty Ryan in the remake of Ocean\'s Eleven (2001) and its sequels, also loom large in his filmography.'),(25,_binary '\0','Henry','Fonda','1905-05-16 00:00:00','images/actor_pictures/henry_fonda.jpg','Grand Island, Nebraska, USA','Born in Grand Island, Nebraska, Henry Fonda started his acting debut with the Omaha Community Playhouse, a local amateur theater troupe directed by Dorothy Brando. He moved to the Cape Cod University Players and later Broadway, New York to expand his theatrical career from 1926 to 1934. His first major roles in Broadway include \"New Faces of America\" and \"The Farmer Takes a Wife\". The latter play was transfered to the screen in 1935 and became the start-up of Fonda\'s lifelong Hollywood career. The following year he married Frances Seymour Fonda with whom he had two children: Jane Fonda and Peter Fonda, also to become screen stars. He is most remembered for his roles as Abe Lincoln in Young Mr. Lincoln (1939), Tom Joad in The Grapes of Wrath (1940), for which he received an Academy Award Nomination, and more recently, Norman Thayer in On Golden Pond (1981), for which he received an Academy Award for Best Actor in 1982. Henry Fonda is considered one of Hollywood\'s old-time legends and was friend and contemporary of James Stewart, John Ford and Joshua Logan. His movie career which spanned almost 50 years is completed by a notable presence in American theater and television.'),(26,_binary '\0','George','Clooney','1961-05-06 00:00:00','images/actor_pictures/george_clooney.jpg','Lexington, Kentucky, USA','George Timothy Clooney was born on May 6, 1961, in Lexington, Kentucky, to Nina Bruce (née Warren), a former beauty pageant queen, and Nick Clooney, a former anchorman and television host (who was also the brother of singer Rosemary Clooney). He has English, German and Irish ancestry. Clooney spent most of his youth in Ohio and Kentucky, and graduated from Augusta High School. He was very active in sports such as basketball and baseball, and tried out for the Cincinnati Reds, but was not offered a contract.'),(27,_binary '\0','Leonardo','Dicaprio','1974-11-11 00:00:00','images/actor_pictures/leonardo_dicaprio.jpg','Hollywood, Los Angeles, California, USA','Few actors in the world have had a career quite as diverse as Leonardo DiCaprio\'s. DiCaprio has gone from relatively humble beginnings, as a supporting cast member of the sitcom Growing Pains (1985) and low budget horror movies, such as Critters 3 (1991), to a major teenage heartthrob in the 1990s, as the hunky lead actor in movies such as Romeo + Juliet (1996) and Titanic (1997), to then become a leading man in Hollywood blockbusters, made by internationally renowned directors such as Martin Scorsese and Christopher Nolan.'),(28,_binary '\0','Viggo','Mortensen','1958-10-20 00:00:00','images/actor_pictures/viggo_mortensen.jpg','Manhattan, New York City, New York, USA','Since his screen debut as a young Amish farmer in Peter Weir\'s Witness (1985), Viggo Mortensen\'s career has been marked by a steady string of well-rounded performances.  Mortensen was born in New York City, to Grace Gamble (Atkinson) and Viggo Peter Mortensen, Sr. His father was Danish, his mother was American, and his maternal grandfather was Canadian. His parents met in Norway. They wed and moved to New York, where Viggo, Jr. was born, before moving to South America, where Viggo, Sr. managed chicken farms and ranches in Venezuela and Argentina. Two more sons were born, Charles and Walter, before the marriage grew increasingly unhappy. When Viggo was seven, his parents sent him to a a strict boarding school, isolated in the foothills of the mountains of Argentina. Then, at age eleven, his parents divorced. His mother moved herself and the children back to her home state of New York.'),(29,_binary '\0','Drew','Barrymore','1975-02-22 00:00:00','images/actor_pictures/drew_barrymore.jpg','Culver City, California, USA','Since melting audiences\' hearts - at the age of six - in Steven Spielberg\'s beloved sci-fi blockbuster, E.T. the Extra-Terrestrial (1982), Drew Barrymore has emerged as one of the most endearing and talented actresses of her generation.  Drew Blyth Barrymore was born in Culver City, California, to actors John Drew Barrymore and Jaid Barrymore (née Ildiko Jaid Mako). Her father came from a long showbusiness legacy, as the son of actors John Barrymore and Dolores Costello, while her mother was the daughter of Hungarian refugees.'),(30,_binary '\0','Mark','Hamill','1951-09-25 00:00:00','images/actor_pictures/mark_hamill.jpg','Oakland, California, USA','Mark Hamill is best known for his portrayal of Luke Skywalker in the original Star Wars trilogy - Star Wars: Episode IV - A New Hope (1977), Star Wars: Episode V - The Empire Strikes Back (1980), and Star Wars: Episode VI - Return of the Jedi (1983) - a role he reprised in Star Wars: Episode VII - The Force Awakens (2015), Star Wars: Episode VIII - The Last Jedi (2017) and Star Wars: Episode IX - The Rise of Skywalker (2019). He also starred and co-starred in the films Corvette Summer (1978), The Big Red One (1980), and Kingsman: The Secret Service (2014). Hamill\'s extensive voice acting work includes a long-standing role as the Joker, commencing with Batman: The Animated Series (1992).'),(31,_binary '\0','Harrison','Ford','1942-07-13 00:00:00','images/actor_pictures/harrison_ford.jpg','Chicago, Illinois, USA','Harrison Ford was born on July 13, 1942 in Chicago, Illinois, to Dorothy (Nidelman), a radio actress, and Christopher Ford (born John William Ford), an actor turned advertising executive. His father was of Irish and German ancestry, while his maternal grandparents were Jewish emigrants from Minsk, Belarus. Harrison was a lackluster student at Maine Township High School East in Park Ridge Illinois (no athletic star, never above a C average). After dropping out of Ripon College in Wisconsin, where he did some acting and later summer stock, he signed a Hollywood contract with Columbia and later Universal. His roles in movies and television (Ironside (1967), The Virginian (1962)) remained secondary and, discouraged, he turned to a career in professional carpentry. He came back big four years later, however, as Bob Falfa in American Graffiti (1973). Four years after that, he hit colossal with the role of Han Solo in Star Wars: Episode IV - A New Hope (1977). Another four years and Ford was Indiana Jones in Indiana Jones and the Raiders of the Lost Ark (1981).'),(32,_binary '\0','Carrie','Fisher','1956-10-21 00:00:00','images/actor_pictures/carrie_fisher.jpg','Burbank, California, USA','Carrie Frances Fisher was born on October 21, 1956 in Burbank, California, to singers/actors Eddie Fisher and Debbie Reynolds. She was an actress and writer known for Star Wars: Episode IV - A New Hope (1977), Star Wars: Episode V - The Empire Strikes Back (1980) and Star Wars: Episode VI - Return of the Jedi (1983). Fisher is also known for her book, \"Postcards from the Edge\", and she wrote the screenplay for the movie based on her novel. Carrie Fisher and talent agent Bryan Lourd have a daughter, Billie Lourd (Billie Catherine Lourd), born on July 17, 1992.'),(33,_binary '\0','Mike','Myers','1963-05-25 00:00:00','images/actor_pictures/mike_myers.jpg','Scarborough, Ontario, Canada','Michael John Myers was born in 1963 in Scarborough, Ontario, to Alice E. (Hind), an officer supervisor, and Eric Myers, an insurance agent. His parents were both English, and had served in the Royal Air Force and British Army, respectively.  Myers\' television career really started in 1988, when he joined Saturday Night Live (1975), where he spent six seasons. He brought to life many memorable characters, such as Dieter and Wayne Cambell. His major movies include Wayne\'s World (1992), Wayne\'s World 2 (1993), So I Married an Axe Murderer (1993), the Austin Powers movies and The Cat in the Hat (2003).'),(34,_binary '\0','Tom','Hanks','1956-07-09 00:00:00','images/actor_pictures/tom_hanks.jpg','Concord, California, USA','Thomas Jeffrey Hanks was born in Concord, California, to Janet Marylyn (Frager), a hospital worker, and Amos Mefford Hanks, an itinerant cook. His mother\'s family, originally surnamed \"Fraga\", was entirely Portuguese, while his father was of mostly English ancestry. Tom grew up in what he has called a \"fractured\" family. He moved around a great deal after his parents\' divorce, living with a succession of step-families. No problems, no alcoholism - just a confused childhood. He has no acting experience in college and credits the fact that he could not get cast in a college play with actually starting his career. He went downtown, and auditioned for a community theater play, was invited by the director of that play to go to Cleveland, and there his acting career started.'),(35,_binary '\0','Jeff','Goldblum','1952-10-22 00:00:00','images/actor_pictures/jeff_goldblum.jpg','Pittsburgh, Pennsylvania, USA','Jeffrey Lynn Goldblum was born October 22, 1952 in Pittsburgh, Pennsylvania, one of four children of Shirley (Temeles), a radio broadcaster who also ran an appliances firm, and Harold L. Goldblum, a doctor. His father was of Russian Jewish descent and his mother was of Austrian Jewish ancestry.  Goldblum began his career on the New York stage after moving to the city at age seventeen. Possessing his own unique style of delivery, Goldblum made an impression on moviegoers with little more than a single line in Woody Allen\'s Annie Hall (1977), when he fretted about having forgotten his mantra. Goldblum went on to appear in the remake Invasion of the Body Snatchers (1978) and co-starred with Ben Vereen in the detective series Tenspeed and Brown Shoe (1980) before a high-profile turn in the classic ensemble film The Big Chill (1983).');
/*!40000 ALTER TABLE `actor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `actor_film`
--

DROP TABLE IF EXISTS `actor_film`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actor_film` (
  `film_id` bigint(20) NOT NULL,
  `actor_id` bigint(20) NOT NULL,
  PRIMARY KEY (`film_id`,`actor_id`),
  KEY `FK3nf2jjwluwx6klglcul22gc25` (`actor_id`),
  CONSTRAINT `FK3nf2jjwluwx6klglcul22gc25` FOREIGN KEY (`actor_id`) REFERENCES `actor` (`id`),
  CONSTRAINT `FK80gycmnpxqtiaf3m3duaobefw` FOREIGN KEY (`film_id`) REFERENCES `film` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actor_film`
--

LOCK TABLES `actor_film` WRITE;
/*!40000 ALTER TABLE `actor_film` DISABLE KEYS */;
INSERT INTO `actor_film` VALUES (4,19),(37,19),(37,20),(1,21),(18,21),(2,24),(2,26),(3,27),(4,27),(5,28),(6,28),(7,28),(8,29),(9,30),(10,30),(11,30),(9,31),(10,31),(11,31),(12,31),(13,31),(14,31),(9,32),(10,32),(11,32),(15,33),(16,34),(19,35);
/*!40000 ALTER TABLE `actor_film` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrator` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `deleted` bit(1) NOT NULL,
  `account_data_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKic0sst1db8vcw1fy3ey0bleqd` (`account_data_id`),
  CONSTRAINT `FKic0sst1db8vcw1fy3ey0bleqd` FOREIGN KEY (`account_data_id`) REFERENCES `account_data` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` VALUES (1,_binary '\0',1),(2,_binary '\0',2),(3,_binary '\0',3);
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_message`
--

DROP TABLE IF EXISTS `chat_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_message` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(128) NOT NULL,
  `date` datetime NOT NULL,
  `recipient` varchar(255) DEFAULT NULL,
  `sender` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_message`
--

LOCK TABLES `chat_message` WRITE;
/*!40000 ALTER TABLE `chat_message` DISABLE KEYS */;
INSERT INTO `chat_message` VALUES (5,'zdravo admin1, ovde petar, imam problem sa ovim','2021-08-25 01:36:37','admin1','Petar_Petrovic'),(6,'ok resicemo problem sa ovim','2021-08-25 01:36:56','Petar_Petrovic','admin1'),(7,'ok hvala lepo','2021-08-25 01:37:08','admin1','Petar_Petrovic'),(8,'a vi kako te','2021-08-25 01:37:35','admin2','user9'),(9,'lepo se izrazavaj','2021-08-25 01:38:13','user9','admin2'),(10,'necu','2021-08-25 01:38:26','admin2','user9'),(11,'user 3 salje adminu2','2021-08-25 12:21:12','admin2','user3'),(12,'admin2 odgovara useru3','2021-08-25 12:21:27','user3','admin2');
/*!40000 ALTER TABLE `chat_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `critic`
--

DROP TABLE IF EXISTS `critic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `critic` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `deleted` bit(1) NOT NULL,
  `first_name` varchar(128) NOT NULL,
  `last_name` varchar(128) NOT NULL,
  `account_data_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7qqcvlhlywclbnpargp2eexhn` (`account_data_id`),
  CONSTRAINT `FK7qqcvlhlywclbnpargp2eexhn` FOREIGN KEY (`account_data_id`) REFERENCES `account_data` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `critic`
--

LOCK TABLES `critic` WRITE;
/*!40000 ALTER TABLE `critic` DISABLE KEYS */;
INSERT INTO `critic` VALUES (1,_binary '\0','Petar','Petrovic',4),(2,_binary '\0','Marko','Markovic',5),(3,_binary '\0','Ana','Anic',6);
/*!40000 ALTER TABLE `critic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `critic_score`
--

DROP TABLE IF EXISTS `critic_score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `critic_score` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `deleted` bit(1) NOT NULL,
  `username_of_score` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `film_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKex94e8xgtovqedrtmhjykwxds` (`film_id`),
  CONSTRAINT `FKex94e8xgtovqedrtmhjykwxds` FOREIGN KEY (`film_id`) REFERENCES `film` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `critic_score`
--

LOCK TABLES `critic_score` WRITE;
/*!40000 ALTER TABLE `critic_score` DISABLE KEYS */;
INSERT INTO `critic_score` VALUES (6,_binary '\0','Ana_Anic','5',1),(7,_binary '\0','Marko_Markovic','5',1),(14,_binary '\0','Petar_Petrovic','3',1),(15,_binary '\0','Petar_Petrovic','3',2),(17,_binary '\0','Petar_Petrovic','4',3),(19,_binary '\0','Petar_Petrovic','5',5),(20,_binary '\0','Petar_Petrovic','4',6),(21,_binary '\0','Petar_Petrovic','5',7),(22,_binary '\0','Petar_Petrovic','3',8),(23,_binary '\0','Petar_Petrovic','4',9),(24,_binary '\0','Petar_Petrovic','5',10),(25,_binary '\0','Petar_Petrovic','3',11),(26,_binary '\0','Petar_Petrovic','4',12),(27,_binary '\0','Petar_Petrovic','2',13),(28,_binary '\0','Petar_Petrovic','5',14),(29,_binary '\0','Petar_Petrovic','2',15),(30,_binary '\0','Petar_Petrovic','5',16),(32,_binary '\0','Petar_Petrovic','2',18),(33,_binary '\0','Petar_Petrovic','2',19),(34,_binary '\0','Petar_Petrovic','4',4),(35,_binary '\0','Petar_Petrovic','5',37),(37,_binary '\0','Marko_Markovic','4',2);
/*!40000 ALTER TABLE `critic_score` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `director`
--

DROP TABLE IF EXISTS `director`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `director` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `deleted` bit(1) NOT NULL,
  `first_name` varchar(128) NOT NULL,
  `last_name` varchar(128) NOT NULL,
  `biography` varchar(1234) NOT NULL,
  `date_of_birth` datetime DEFAULT NULL,
  `place_of_birth` varchar(255) NOT NULL,
  `profile_picture_path` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `director`
--

LOCK TABLES `director` WRITE;
/*!40000 ALTER TABLE `director` DISABLE KEYS */;
INSERT INTO `director` VALUES (1,_binary '\0','John','Carpenter','John Howard Carpenter was born in Carthage, New York, to mother Milton Jean (Carter) and father Howard Ralph Carpenter. His family moved to Bowling Green, Kentucky, where his father, a professor, was head of the music department at Western Kentucky University. He attended Western Kentucky University and then USC film school in Los Angeles. He began making short films in 1962, and won an Academy Award for Best Live-Action Short Subject in 1970, for The Resurrection of Broncho Billy (1970), which he made while at USC. Carpenter formed a band in the mid-1970s called The Coupe de Villes, which included future directors Tommy Lee Wallace and Nick Castle. Since the 1970s, he has had numerous roles in the film industry including writer, actor, composer, producer, and director. After directing Dark Star (1974), he has helmed both classic horror films like Halloween (1978), The Fog (1980), and The Thing (1982), and noted sci-fi tales like Escape from New York (1981) and Starman (1984).','1948-01-16 00:00:00','Carthage, New York, USA','images/director_pictures/john_carpenter.jpg'),(2,_binary '\0','Steven','Sodebergh','Steven Andrew Soderbergh was born on January 14, 1963 in Atlanta, Georgia, USA, the second of six children of Mary Ann (Bernard) and Peter Soderbergh. His father was of Swedish and Irish descent, and his mother was of Italian ancestry. While he was still at a very young age, his family moved to Baton Rouge, Louisiana, where his father was a professor and the dean of the College of Education at Louisiana State University. While still in high school, around the age of 15, Soderbergh enrolled in the university\'s film animation class and began making short 16-millimeter films with second-hand equipment, one of which was the short film \"Janitor\". After graduating high school, he went to Hollywood, where he worked as a freelance editor. His time there was brief and, shortly after, he returned home and continued making short films and writing scripts.','1963-01-14 00:00:00','Atlanta, Georgia, USA','images/director_pictures/steven_soderbergh.jpg'),(3,_binary '\0','Martin','Scorsese','Martin Charles Scorsese was born on November 17, 1942 in Queens, New York City, to Catherine Scorsese (née Cappa) and Charles Scorsese, who both worked in Manhattan\'s garment district, and whose families both came from Palermo, Sicily. He was raised in the neighborhood of Little Italy, which later provided the inspiration for several of his films. Scorsese earned a B.S. degree in film communications in 1964, followed by an M.A. in the same field in 1966 at New York University\'s School of Film. During this time, he made numerous prize-winning short films including The Big Shave (1967), and directed his first feature film, Who\'s That Knocking at My Door (1967).','1942-11-17 00:00:00','Queens, New York City, New York, USA','images/director_pictures/martin_scorsese.jpg'),(4,_binary '\0','Peter','Jackson','Peter Jackson was born as an only child in a small coast-side town in New Zealand in 1961. When a friend of his parents bought him a super 8 movie camera (because she saw how much he enjoyed taking photos), the then eight-year-old Peter instantly grabbed the thing to start recording his own movies, which he made with his friends. They were usually short, but they already had the trademark that would make Jackson famous: impressive special effects, made at a very low cost. For example, for his film \"World War Two\" which he made as a teenager, he used to simulate a firing gun by punching little holes into the celluloid, so that, once projected, the gun gave the impression of displaying a small fire. Jackson\'s first step towards more serious film-making came with an entry in a local contest to stimulate amateur and children\'s films. For this film, he used stop-motion animation to create a monster that ruins a city in the style of Ray Harryhausen. Unfortunately, he didn\'t win. At twenty-two, he embarked on a movie-making adventure that would change his life.','1961-10-31 00:00:00','Pukerua Bay, North Island, New Zealand','images/director_pictures/peter_jackson.jpg'),(5,_binary '\0','George','Lucas','George Walton Lucas, Jr. was raised on a walnut ranch in Modesto, California. His father was a stationery store owner and he had three siblings. During his late teen years, he went to Thomas Downey High School and was very much interested in drag racing. He planned to become a professional racecar driver. However, a terrible car accident just after his high school graduation ended that dream permanently. The accident changed his views on life.','1944-05-14 00:00:00','Modesto, California, USA','images/director_pictures/george_lucas.jpg'),(6,_binary '\0','Andrew','Adamson','Andrew Adamson was born on December 1, 1966 in Auckland, New Zealand. He is a producer and director, known for Shrek 2 (2004), Shrek (2001) and The Chronicles of Narnia: The Lion, the Witch and the Wardrobe (2005). He has been married to Gyulnara Karaeva since January 16, 2016. He was previously married to Nikki Donald.','1966-12-01 00:00:00','Auckland, New Zealand','images/director_pictures/andrew_adamson.jpg'),(7,_binary '\0','Steven','Spielberg','One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywood\'s best known director and one of the wealthiest filmmakers in the world. He has an extraordinary number of commercially successful and critically acclaimed credits to his name, either as a director, producer or writer since launching the summer blockbuster with Jaws (1975), and he has done more to define popular film-making since the mid-1970s than anyone else.','1946-12-18 00:00:00','Cincinnati, Ohio, USA','images/director_pictures/steven_spielberg.jpg'),(8,_binary '\0','Milos','Forman','Milos Forman was born Jan Tomas Forman in Caslav, Czechoslovakia, to Anna (Svabova), who ran a summer hotel, and Rudolf Forman, a professor. During World War II, his parents were taken away by the Nazis, after being accused of participating in the underground resistance. His father died in Buchenwald and his mother died in Auschwitz, and Milos became an orphan very early on. He studied screen-writing at the Prague Film Academy (F.A.M.U.). In his Czechoslovakian films, Black Peter (1964), Loves of a Blonde (1965), and The Firemen\'s Ball (1967), he created his own style of comedy. During the invasion of his country by the troops of the Warsaw pact in the summer of 1968 to stop the Prague spring, he left Europe for the United States. In spite of difficulties, he filmed Taking Off (1971) there and achieved his fame later with One Flew Over the Cuckoo\'s Nest (1975) adapted from the novel of Ken Kesey, which won five Oscars including one for direction. Other important films of Milos Forman were the musical Hair (1979) and his biography of Wolfgang Amadeus Mozart, Amadeus (1984), which won eight Oscars.','1932-02-18 00:00:00','Cáslav, Czechoslovakia [now Czech Republic]','images/director_pictures/milos_forman.jpg'),(10,_binary '\0','Sidney','Lumet','Sidney Lumet was a master of cinema, best known for his technical knowledge and his skill at getting first-rate performances from his actors -- and for shooting most of his films in his beloved New York. He made over 40 movies, often complex and emotional, but seldom overly sentimental. Although his politics were somewhat left-leaning and he often treated socially relevant themes in his films, Lumet didn\'t want to make political movies in the first place.','1925-06-24 00:00:00','Philadelphia, Pennsylvania, USA','images/director_pictures/sidney_lumet.jpg');
/*!40000 ALTER TABLE `director` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `film`
--

DROP TABLE IF EXISTS `film`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `film` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `deleted` bit(1) NOT NULL,
  `profile_picture_path` varchar(255) DEFAULT NULL,
  `title` varchar(128) NOT NULL,
  `director_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4pqpakiyka8wwbiicmc0rgtwi` (`director_id`),
  CONSTRAINT `FK4pqpakiyka8wwbiicmc0rgtwi` FOREIGN KEY (`director_id`) REFERENCES `director` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `film`
--

LOCK TABLES `film` WRITE;
/*!40000 ALTER TABLE `film` DISABLE KEYS */;
INSERT INTO `film` VALUES (1,_binary '\0','images/film_posters/the_thing.png','The Thing (1982)',1),(2,_binary '\0','images/film_posters/oceans_eleven.png','Ocean\'s Eleven (2001)',2),(3,_binary '\0','images/film_posters/shutter_island.png','Shutter Island (2010)',3),(4,_binary '\0','images/film_posters/departed.png','The Departed (2006)',3),(5,_binary '\0','images/film_posters/lotr1.png','The Lord of the Rings: The Fellowship of the Ring (2001)',4),(6,_binary '\0','images/film_posters/lotr2.png','The Lord of the Rings: The Two Towers (2002)',4),(7,_binary '\0','images/film_posters/lotr3.png','The Lord of the Rings: The Return of the King (2003)',4),(8,_binary '\0','images/film_posters/et.png','E.T. (1982)',7),(9,_binary '\0','images/film_posters/sw4.png','Star Wars: A New Hope (1977)',5),(10,_binary '\0','images/film_posters/sw5.png','Star Wars: The Empire Strikes Back (1980)',5),(11,_binary '\0','images/film_posters/sw6.png','Star Wars: Return of the Jedi (1983)',5),(12,_binary '\0','images/film_posters/ij1.png','Indiana Jones - Raiders of the Lost Ark (1981)',7),(13,_binary '\0','images/film_posters/ij2.png','Indiana Jones and the Temple of Doom (1984)',7),(14,_binary '\0','images/film_posters/ij3.png','Indiana Jones and the Last Crusade (1989)',7),(15,_binary '\0','images/film_posters/shrek.png','Shrek (2001)',6),(16,_binary '\0','images/film_posters/spr.png','Saving Private Ryan (1998)',7),(18,_binary '\0','images/film_posters/efny.png','Escape From New York (1981)',1),(19,_binary '\0','images/film_posters/jp.png','Jurassick Park (1993)',7),(37,_binary '\0','images/film_posters/oneflew.png','One Flew Over the Cuckoo\'s Nest (1975)',8);
/*!40000 ALTER TABLE `film` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `film_forum`
--

DROP TABLE IF EXISTS `film_forum`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `film_forum` (
  `forum_id` bigint(20) DEFAULT NULL,
  `film_id` bigint(20) NOT NULL,
  PRIMARY KEY (`film_id`),
  KEY `FK4iqvsh6r3ss3amtcwhpaufew5` (`forum_id`),
  CONSTRAINT `FK4iqvsh6r3ss3amtcwhpaufew5` FOREIGN KEY (`forum_id`) REFERENCES `forum` (`id`),
  CONSTRAINT `FKcj5dxgt6s8qnpcug28nmsfnh6` FOREIGN KEY (`film_id`) REFERENCES `film` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `film_forum`
--

LOCK TABLES `film_forum` WRITE;
/*!40000 ALTER TABLE `film_forum` DISABLE KEYS */;
INSERT INTO `film_forum` VALUES (11,1),(12,2),(13,3),(14,4),(15,5),(16,6),(17,7),(18,8),(19,9),(20,10),(21,11),(22,12),(23,13),(24,14),(25,15),(26,16),(28,18),(29,19),(32,37);
/*!40000 ALTER TABLE `film_forum` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `film_user`
--

DROP TABLE IF EXISTS `film_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `film_user` (
  `user_id` bigint(20) NOT NULL,
  `film_id` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`,`film_id`),
  KEY `FKg7t5u3pc2w2dihccrrd36rrfc` (`film_id`),
  CONSTRAINT `FKg7t5u3pc2w2dihccrrd36rrfc` FOREIGN KEY (`film_id`) REFERENCES `film` (`id`),
  CONSTRAINT `FKqbgsrl9e2ne8683o1x9428kwu` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `film_user`
--

LOCK TABLES `film_user` WRITE;
/*!40000 ALTER TABLE `film_user` DISABLE KEYS */;
INSERT INTO `film_user` VALUES (1,5),(2,5),(3,5),(5,5),(2,16),(1,18),(5,18);
/*!40000 ALTER TABLE `film_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `film_user_dislike`
--

DROP TABLE IF EXISTS `film_user_dislike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `film_user_dislike` (
  `user_id` bigint(20) NOT NULL,
  `film_id` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`,`film_id`),
  KEY `FKraq1nh5n7ikt0sogn2l0i9lgu` (`film_id`),
  CONSTRAINT `FKfg7o89gh7jjpht81mnc0wwe9s` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKraq1nh5n7ikt0sogn2l0i9lgu` FOREIGN KEY (`film_id`) REFERENCES `film` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `film_user_dislike`
--

LOCK TABLES `film_user_dislike` WRITE;
/*!40000 ALTER TABLE `film_user_dislike` DISABLE KEYS */;
/*!40000 ALTER TABLE `film_user_dislike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forum`
--

DROP TABLE IF EXISTS `forum`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forum` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `deleted` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum`
--

LOCK TABLES `forum` WRITE;
/*!40000 ALTER TABLE `forum` DISABLE KEYS */;
INSERT INTO `forum` VALUES (11,_binary '\0'),(12,_binary '\0'),(13,_binary '\0'),(14,_binary '\0'),(15,_binary '\0'),(16,_binary '\0'),(17,_binary '\0'),(18,_binary '\0'),(19,_binary '\0'),(20,_binary '\0'),(21,_binary '\0'),(22,_binary '\0'),(23,_binary '\0'),(24,_binary '\0'),(25,_binary '\0'),(26,_binary '\0'),(28,_binary '\0'),(29,_binary '\0'),(32,_binary '\0');
/*!40000 ALTER TABLE `forum` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forum_message`
--

DROP TABLE IF EXISTS `forum_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forum_message` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `deleted` bit(1) NOT NULL,
  `forum_topic_id` bigint(20) DEFAULT NULL,
  `message` varchar(255) NOT NULL,
  `account_data_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhmeuq7p5mi9xc7ga551jddurb` (`forum_topic_id`),
  KEY `FKf19f9l5idof0o6yguu6hgsk5w` (`account_data_id`),
  CONSTRAINT `FKf19f9l5idof0o6yguu6hgsk5w` FOREIGN KEY (`account_data_id`) REFERENCES `account_data` (`id`),
  CONSTRAINT `FKhmeuq7p5mi9xc7ga551jddurb` FOREIGN KEY (`forum_topic_id`) REFERENCES `forum_topic` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum_message`
--

LOCK TABLES `forum_message` WRITE;
/*!40000 ALTER TABLE `forum_message` DISABLE KEYS */;
INSERT INTO `forum_message` VALUES (1,_binary '\0',1,'prvi message u topic je ovo',47),(2,_binary '\0',1,'drugi message u topic',7),(4,_binary '\0',1,'treci message koji je napisao petar petrovic',4),(9,_binary '\0',1,'cetvrti message u topic',7),(18,_binary '\0',9,'hello how is everyone',1);
/*!40000 ALTER TABLE `forum_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forum_topic`
--

DROP TABLE IF EXISTS `forum_topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forum_topic` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `deleted` bit(1) NOT NULL,
  `forum_id` bigint(20) DEFAULT NULL,
  `title` varchar(128) NOT NULL,
  `description` varchar(128) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKat6y1ucxlvxuh1jpbtww6ujpr` (`forum_id`),
  CONSTRAINT `FKat6y1ucxlvxuh1jpbtww6ujpr` FOREIGN KEY (`forum_id`) REFERENCES `forum` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum_topic`
--

LOCK TABLES `forum_topic` WRITE;
/*!40000 ALTER TABLE `forum_topic` DISABLE KEYS */;
INSERT INTO `forum_topic` VALUES (1,_binary '\0',11,'Ending','What do you think the ending means?'),(2,_binary '\0',11,'Dr Steve','I think dr steve was the thing '),(4,_binary '\0',13,'Shutter Island Ending','What do you think the ending meant?'),(9,_binary '\0',25,'shrek topic 1','desc');
/*!40000 ALTER TABLE `forum_topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `deleted` bit(1) NOT NULL,
  `description` varchar(128) NOT NULL,
  `name` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,_binary '\0','Action film is a genre in which the protagonist is thrust into a series of events that typically include physical feats etc','Action'),(2,_binary '\0','Science fiction is a genre of fiction literature whose content is imaginative, but based in science','Science fiction'),(3,_binary '\0','A thriller is a genre  whose primary feature is that it induces strong feelings of excitement, anxiety, tension, suspense','Thriller'),(4,_binary '\0',' Drama is a category of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone','Drama'),(5,_binary '\0','Comedy is a genre of fiction comprised of discourses or works intended to be humorous or amusing by inducing laughter','Comedy'),(6,_binary '\0','Fantasy is a genre that features magical and supernatural elements that do not exist in the real world','Fantasy'),(8,_binary '\0','A horror film is one that seeks to elicit fear or disgust in its audience for entertainment purposes.','Horror'),(9,_binary '\0','Crime fiction is the genre of fiction that deals with crimes, their detection, criminals, and their motives.','Crime');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre_film`
--

DROP TABLE IF EXISTS `genre_film`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre_film` (
  `film_id` bigint(20) NOT NULL,
  `genre_id` bigint(20) NOT NULL,
  PRIMARY KEY (`film_id`,`genre_id`),
  KEY `FK9p3dhf8wgeetdt06cavuc2fot` (`genre_id`),
  CONSTRAINT `FK9p3dhf8wgeetdt06cavuc2fot` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`),
  CONSTRAINT `FKdy326gtx6qt4mrjjvr1w5pdms` FOREIGN KEY (`film_id`) REFERENCES `film` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre_film`
--

LOCK TABLES `genre_film` WRITE;
/*!40000 ALTER TABLE `genre_film` DISABLE KEYS */;
INSERT INTO `genre_film` VALUES (2,1),(4,1),(5,1),(6,1),(7,1),(9,1),(10,1),(11,1),(12,1),(13,1),(14,1),(15,1),(16,1),(18,1),(19,1),(1,2),(8,2),(9,2),(10,2),(11,2),(18,2),(19,2),(1,3),(3,3),(4,3),(18,3),(1,4),(3,4),(4,4),(16,4),(37,4),(2,5),(15,5),(5,6),(6,6),(7,6),(12,6),(13,6),(14,6),(15,6),(1,8),(3,9),(4,9);
/*!40000 ALTER TABLE `genre_film` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_4p6nh7w0rbq9u7w9ryagupqc3` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (1,'ROLE_ADMINISTRATOR'),(2,'ROLE_CRITIC'),(3,'ROLE_USER');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `deleted` bit(1) NOT NULL,
  `review_text` longtext NOT NULL,
  `account_data_id` bigint(20) DEFAULT NULL,
  `film_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnvkafiad6k3bs713j06klif48` (`account_data_id`),
  KEY `FKloj6cgl63e2nd5ykk8gvlu15b` (`film_id`),
  CONSTRAINT `FKloj6cgl63e2nd5ykk8gvlu15b` FOREIGN KEY (`film_id`) REFERENCES `film` (`id`),
  CONSTRAINT `FKnvkafiad6k3bs713j06klif48` FOREIGN KEY (`account_data_id`) REFERENCES `account_data` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,_binary '\0','Far surpassing most of the CG work of the time, the practical creature and makeup effects continue to amaze even today.',4,1),(3,_binary '\0','The Thing is a peerless masterpiece of relentless suspense, retina-wrecking visual excess and outright, nihilistic terror',5,1),(4,_binary '\0','It is pretty scary and entertaining stuff, though I always get the feeling that nothing in it lives up to the tremendous opening section.',6,1),(9,_binary '\0','i nije bas nesto',6,2),(11,_binary '\0','Ja sam Marko i meni se svidja film :)',5,3),(12,_binary '\0','dugacak i zanimljiv i zabavan i bas bas',4,6),(17,_binary '\0','Peter Jackson throws you onto the battlefield with your favourite characters.',4,5),(25,_binary '\0','petar petrovic kaze da mu se departed svidja',4,4),(44,_binary '\0','petar petrovic kaze da mu se departed svidja',4,2),(51,_binary '\0','star wars a new hope je dobar film',4,9);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `deleted` bit(1) NOT NULL,
  `first_name` varchar(128) NOT NULL,
  `last_name` varchar(128) NOT NULL,
  `account_data_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqh5tmt6ib44fvuxhrec3gsghn` (`account_data_id`),
  CONSTRAINT `FKqh5tmt6ib44fvuxhrec3gsghn` FOREIGN KEY (`account_data_id`) REFERENCES `account_data` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,_binary '\0','Igor','Milanovic',7),(2,_binary '\0','Milan','Milanovic',8),(3,_binary '\0','Igor','Nicholson',9),(5,_binary '\0','Matija','Juric',47);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_score`
--

DROP TABLE IF EXISTS `user_score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_score` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `deleted` bit(1) NOT NULL,
  `username_of_score` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `film_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKkcxbqp6woi3xp7171n601lf29` (`film_id`),
  CONSTRAINT `FKkcxbqp6woi3xp7171n601lf29` FOREIGN KEY (`film_id`) REFERENCES `film` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_score`
--

LOCK TABLES `user_score` WRITE;
/*!40000 ALTER TABLE `user_score` DISABLE KEYS */;
INSERT INTO `user_score` VALUES (2,_binary '\0','user9','5',1),(6,_binary '\0','user1','3',3),(8,_binary '\0','user9','4',2),(13,_binary '\0','user1','1',1),(15,_binary '\0','user9','5',3),(16,_binary '\0','user2','5',3),(17,_binary '\0','user3','4',4),(18,_binary '\0','user3','3',5),(19,_binary '\0','user3','2',6),(20,_binary '\0','user3','5',7),(21,_binary '\0','user3','3',8),(22,_binary '\0','user3','2',9),(23,_binary '\0','user3','1',10),(24,_binary '\0','user3','1',11),(25,_binary '\0','user3','2',12),(26,_binary '\0','user3','3',13),(27,_binary '\0','user3','3',14),(28,_binary '\0','user3','2',15),(29,_binary '\0','user3','4',16),(31,_binary '\0','user3','3',18),(32,_binary '\0','user3','4',19),(33,_binary '\0','user9','5',5),(34,_binary '\0','user9','4',37),(35,_binary '\0','user2','5',1);
/*!40000 ALTER TABLE `user_score` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-25 13:50:11
