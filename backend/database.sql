-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Jeu 26 Octobre 2017 à 13:53
-- Version du serveur :  5.7.19-0ubuntu0.16.04.1
-- Version de PHP :  7.0.22-0ubuntu0.16.04.1
SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

SET
  time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;

/*!40101 SET NAMES utf8mb4 */
;

--
-- Base de données :  `simple-mvc`
--
-- --------------------------------------------------------
CREATE TABLE `adm` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `temporaryPassword` varchar(255),
  `question` varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

-- Creation d'une table team au lieu d'une jointure qui marchait mal

CREATE TABLE `team` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(150) NOT NULL,
  `image` varchar(255) NOT NULL,
  `alt` varchar(255) NOT NULL,
  `text` text NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
INSERT INTO `team` (`name`, `image`, `alt`, `text`)
VALUES('Antoine Debray', '1667979987156-AntoinePicture.png', 'Antoine Debray Maraicher' , 
'Pourquoi m’être lancé dans la maraîchage ?
 Depuis mes 15 ans, j’ai toujours voulu reprendre l’entreprise familiale de poules pondeuses élevées en plein air. Après des études d’entrepreneuriat et de commerce,
 je suis parti en Irlande pendant deux ans où j’ai travaillé en tant que commercial.
 C’est en discutant avec mon père que je décide finalement de produire des légumes car je pense que les gens ont plus besoin d’excellents légumes que d’excellents œufs dans leur assiette. 
 Ensuite, j’ai fait un an de wwoofing (volontariat dans des fermes contre gîte et couvert) en Nouvelle-Zélande. Puis, une dernière année au Luxembourg chez Krautgaart,
 l’une des fermes maraichères d’Europe les plus renommées, où j’ai énormément appris. 
 C’est donc à mon retour fin 2021 que je dispose les premières brouettes de compost sur le terrain,
 avec l’aide de la famille et des copains du coin.
 Ma première source d’inspiration fut le film Demain et l’exemple de la Ferme du Bec Hellouin en Normandiequi montrait qu’on pouvait produire une grande quantité de légumes sur très petite surface,
 tout en créant de la biodiversité et se dégager un revenu décent. 
 Ensuite les travaux de Jean-Martin Fortier, Charles Dowding et Richard Perkins m’ont encouragé à passer le pas.');

CREATE TABLE `article` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(255) NULL,
  `link` mediumtext NULL,
  `image` varchar(255) NOT NULL,
  `alt` varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(255) NULL,
  `link` varchar(255) NULL,
  `image` mediumtext NOT NULL,
  `alt` varchar(255) NOT NULL,
  `visible` boolean NULL DEFAULT 0
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO `product` (`title`, `link`, `image`, `alt`, `visible`)

VALUES (
  'NOS LEGUMES', 'dummy-link', '1666294099194-vegetable.png', 'image legumes', 1),
  ('NOS PLANTS', 'dummy-link', '1666294111529-plant.png', 'image plante', 1),
  ('PRODUIT FERMIER', 'dummy-link', '1666294126374-oil.png', 'image huile', 1),
  ('LE PANIER', '', '1666294141053-basket.png', 'image panier', 1);



CREATE TABLE `preorder` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `lastname` varchar(80) NOT NULL,
  `firstname` varchar(80) NOT NULL,
  `email` varchar(255) NOT NULL,
  `paymentMethod` enum("1x", "3x", "12x") NOT NULL,
  `checkboxStatus` boolean NULL DEFAULT 0,
  `archived` boolean NULL DEFAULT 0,
  `date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

-- datetime default now fait un timestamp et inject automatiquement une date quand une donnée est créée
-- on ne specifie pas dans la query les champs id,checkboxStatus et date car id est auto incrémenté, checkbox par défaut est 0 et date est remplis avec l'explication au dessus
INSERT INTO
  `preorder` (`lastname`, `firstname`, `email`, `paymentMethod`)
VALUES
  (
    'Userlastname1',
    'Userfirstname1',
    'Useremail1',
    '1x'
  ),
  (
    'Userlastname2',
    'Userfirstname2',
    'Useremail2',
    '3x'
  ),
  (
    'Userlastname3',
    'Userfirstname3',
    'Useremail3',
    '12x'
  );

CREATE TABLE `pictures` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `file` varchar(255) NOT NULL,
  `alt` varchar(255) NOT NULL,
  `pictogram` varchar(255) NULL,
  `text_id` int NULL,
  `categories` enum(
    "carousel",
    "home",
    "methode",
    "produit",
    "propos",
    "amap",
    "contact"
  ),
  `picSection` int NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO
  `pictures`(`file`, `alt`, `categories`, `picSection`)
VALUES
  (
    '1657637017342-Carroussel1.JPG',
    'Antoine champs',
    'carousel',
    1
  ),
  (
    '1657637032509-Carroussel2.JPG',
    'Aubergine',
    'carousel',
    2
  ),
  (
    '1657637047615-Carroussel3.jpg',
    'Panier legumes',
    'carousel',
    3
  ),
  (
    '1657637108827-Carroussel4.jpg',
    'Serres',
    'carousel',
    4
  ),
  (
    '1657637414428-methode1.jpg',
    'Plan drone',
    'methode',
    1
  ),
  (
    '1657637509587-Carroussel4.jpg',
    'Serre',
    'methode',
    2
  ),
  (
    '1657637539532-methode3.png',
    'cycle fertilise',
    'methode',
    3
  ),
  (
    '1657637557592-methode4.jpg',
    'Arbres et fruits',
    'methode',
    4
  ),
  ('1670537428115-1659434132008-Carroussel1.JPG','Antoine champs','amap',1),
 ('1670537453033-1662119717847-1657637557592-methode4.jpg','Serres', 'amap',  2), 
('1670537763185-1657637047615-Carroussel3.jpg', 'Legumes', 'amap', 3), 
('1670538296188-1668682761549-tableauM.png','Panier', 'amap', 4);

CREATE TABLE `text` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(255) NULL,
  `body` mediumtext NULL,
  `page` enum(
    "home",
    "methode",
    "produit",
    "propos",
    "amap",
    "contact"
  ) NOT NULL,
  `textSection` int NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

-- ce cas précis des valeurs doivent être passées en null car si l'insert exige des champs en not null, nous sommes obligé de les renseigner pour pouvoir insérer nos valeurs 
-- text pour la page home
INSERT INTO
  `text`(`title`, `body`, `page`, `textSection`)
VALUES
  (
    'Notre raison d’être',
    'Le Maraîcheur est une microferme de production de légumes sur sol vivant créée en 2021 et s’appuyant sur les principes de la permaculture et de l’agroécologie.
 Notre objectif est de vous proposer des légumes d’excellente qualité nutritionnelle et gustative dans le respect du Vivant.',
    'home',
    1
  ),
  (
    'Paniers de légumes',
    'Un panier de légumes naturels, sur sol vivant et de saison chaque semaine, Composé d’au moins 6 variétés de légumes (selon saisonnalité)',
    'home',
    2
  ),
  -- text pour la page methode
  (
    'Sol vivant',
    'Saviez-vous que pour la consommation annuelle de nourriture de chaque personne sur terre (en moyenne 450kg), 10 tonnes de terres arables disparaissent chaque année ?
Tout ceci découle du travail du sol et notamment du labour qui crée de l’érosion. Si un sol est labouré et nu, chaque fois qu’il y a du vent ou de la pluie les fines particules d’argile s’échappent,
 entrainant des phénomènes comme les inondations ou les fameuses tempêtes de sable des Etats-Unis des années 30. 1mm de sol érodé équivaut à 10 tonnes d’argile perdu par hectare. Le sol a besoin d’être couvert,
  comme nous avons besoin de notre peau pour nous protéger des agressions extérieures.
En outre, nous avons déjà perdu 1/3 de terres arables dans le monde. Il est urgent d’agir si nous voulons sauver nos sols.',
    'methode',
    1
  ),
  (
    '',
    "Le maraîchage sol vivant (msv) découle des principes de Permaculture et d'agroécologie. Cela consiste à ne pas travailler le sol et à ajouter du paillis (matière organique) que les êtres vivants du sol vont manger.
 Les plantes vont ensuite se nourrir de leur digestat, au fur et à mesure de leurs besoins en nutriments. 
Cela donne des légumes pleins et vitamines et minéraux, avec du goût. 
Il y a énormément d'avantages à cette méthode que vous pouvez retrouver dans bon nombre d'ouvrages, mais en voici quelques-uns :
  •	Plus de vie du sol = plus de goût et de nutriments
	•	Énorme stockage de carbone dans le sol (le sol stocke plus de carbone que l'atmosphère et l'ensemble des êtres vivants), donc réduction du CO2 d’ans l’air
	•	Pas d'érosion ni de lessivage des argiles et engrais (quand on en met, ce n’est pas mon cas ) puisque l'eau pénètre dans le sol plus facilement = moins de risques d'inondation
	•	Moins d'arrosage ",
    'methode',
    2
  ),
  (
    '',
    'Plus de 50 variétés de légumes et de fruits sont cultivés sur 1000 m2 de sol vivant.
« The smaller the better » est la devise de Richard Perkins, référence dans le domaine de l’Agriculture Régénérative.
Plus la surface cultivée est petite, plus le jardin est maîtrisé. Cela permet de commencer avec des plus petits investissements et on obtient une rentabilité au m2 supérieure. 
C’est aussi un plaisir de travailler à la main, sans le bruit des machines et de bouger son corps.',
    'methode',
    3
  ),
  (
    '',
    'Autour du jardin seront prochainement plantées des arbres aux multiples bénéfices :
  Favorisent la biodiversité
	Limitent le vent
	Produisent des fruits (miam !) et du bois
	Font de l’ombre en été
	Donnent aux légumes des nutriments auxquels ils n’ont pas accès
	Améliorent le paysage
	Et tant d’autres !',
    'methode',
    4
  ),

  ('', 'Qu’est-ce qu’une AMAP ?
 Une Association pour le Maintien de l’Agriculture Paysanne (AMAP) est un partenariat entre un groupe de consommateurs et une ferme,
 basé sur un système de distribution de « paniers » composés des produits de la ferme. C’est un contrat solidaire, basé sur un engagement financier des consommateurs,
 qui paient à l’avance une part de la production sur une période définie par le type de production et le lieu géographique.', 'amap', 1),

 ('', 'L’AMAP comporte plusieurs avantages : tout d’abord le côté social, je rêve de constituer une petite communauté autour du jardin et de participer à la dynamisation des campagnes. Cela me permet également d’aborder la saison plus sereinement,
avec une certaine sécurité grâce au soutien financier (et moral!) des membres.
Avec une AMAP, vous soutenez l’agriculture paysanne, locale et de saison, avec peu de transports (lieu de distribution à 3km de la ferme).
Vous prenez soin de l’environnement et des paysans!', 'amap', 2),

('', 'Et l’AMAP Le Maraîcheur ?
Un panier de légumes naturels, sur sol vivant et de saison chaque semaine
Composé d’au moins 6 variétés de légumes (selon saisonnalité)
De début mai à fin novembre
Participation à des évènements collectifs pendant la saison
Retrait des paniers à Thiron-Gardais chez HD Ebénisterie, 2 place du marché à Thiron-Gardais, chaque samedi de 10h à 13h', 'amap', 3),

('', 'Comme vous pouvez le constater, la valeur du panier varie en fonction de la saison, mais il y aura plus de paniers « pleins », d’une valeur supérieure à 20 euros,
 que de paniers comme celui de mai. 
Pour quel prix ? Vous aurez accès pour 20€ par semaine à un panier de ce type, ce qui correspond à 600 euros par an. 
L’abonnement comprend l’approvisionnement en légumes naturels sur sol vivant pendant 30 semaines, de début mai à fin novembre.', 'amap', 4),

('', 'Le Maraîcheur propose des légumes riches en nutriments, qui ont poussé dans une terre vivante. Cultivés avec beaucoup damour et de passion, en harmonie avec la nature. Récoltés avec soin et lavés pour vous. 
Le meilleur dans tout ça ? A chaque abonnement, vous protégez activement l’environnement et contribuez à la transition agricole.
Et quand vous partez en vacances ?
Faites profiter votre panier à vos proches ! Vous pouvez le faire récupérer par vos amis, voisins, un membre de votre famille … qui aura la chance de déguster de délicieux légumes', 'amap', 5)

