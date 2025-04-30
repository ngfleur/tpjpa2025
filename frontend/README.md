# Projet de Gestion de Concerts - EV$NTIX (TP SIR - M1 MIAGE)

## 1. Présentation du projet

**EV$NTIX** est une application web complète de billetterie musicale permettant aux utilisateurs de consulter les événements à venir, de réserver des places et aux organisateurs de gérer leurs evenements.

Ce projet universitaire met en œuvre une architecture moderne basée sur Java JPA pour le back-end et React / Next.js pour le front-end. Il met l'accent sur la séparation des responsabilités, la sécurité, la convivialité et l'organisation claire du code.

## 2. Technologies utilisées

- **Backend** : Java 17, JPA (Jakarta Persistence API), RESTEasy, MySQL
- **Frontend** : React.js, Next.js, TailwindCSS
- **Outils** : Git, VS Code, IntelliJ IDEA, Postman, npm, cookies / localStorage

## 3. Architecture du projet

Le projet est organisé en deux grandes parties :

- **Backend** : contient les entités JPA, les DAO, les DTOs, les ressources REST (APIs) et le serveur RESTEasy.
- **Frontend** : application React / Next.js avec composants, pages, contextes, services, styles et routage dynamique.

## 4. Backend - Description

L'architecture backend suit un modèle classique en couches :

- **Entités JPA** : `Utilisateur`, `Evenement`, `Ticket`, `Salle`, `Place`, `GenreMusical`, `Artiste`, `Notification`, `TicketStandard`, `TicketPremium`
- **DAO** : chaque entité possède un DAO pour effectuer les opérations CRUD, et certaines requêtes personnalisées.
- **DTOs** : objets de transfert permettant de découpler les entités JPA de la couche présentation.
- **Ressources REST** : classes exposant les routes HTTP pour créer, lire, modifier ou supprimer les entités.
- **Sécurité simplifiée** : gestion d'authentification via token simulé (ex: `dummy-token-for-user-1`).

### Fonctionnalités backend disponibles

- Authentification et inscription d'utilisateurs (avec rôles : PARTICIPANT, ORGANISATEUR)
- Création, consultation et mise à jour d'événements
- Association d'artistes et de genres musicaux à un événement
- Achat de tickets standard ou premium avec vérification de disponibilité
- Notifications liées à un événement
- Gestion des places dans des salles

## 5. Frontend - Description

### Inscription & Connexion

L'application permet aux utilisateurs de s'inscrire et se connecter via des modales intuitives. Lors de l'inscription, l'utilisateur choisit un rôle : PARTICIPANT, ORGANISATEUR.

- **Inscription** : via `RegistrationModal`, un formulaire permet la création du compte avec rôle.
- **Connexion** : via `LoginModal`, l'utilisateur obtient un token stocké côté client.
- L'accès aux fonctionnalités est conditionné par le rôle, avec une navigation protégée.

L'interface web repose sur **Next.js** et **TailwindCSS**, avec des composants modulaires pour une UX fluide et moderne.

### Pages principales

- **Accueil** : `HomeScreen` affichant dynamiquement la liste des événements avec visuel et filtre
- **/evenements** : liste complète avec formulaire de création pour les organisateurs, affichage adapté au rôle utilisateur
- **/evenements/[id]** : page détaillée de chaque événement avec achat de ticket

### Sécurité et session

- Stockage du token dans `cookies` ou `localStorage`
- Redirection automatique vers la modale de connexion si action interdite
- Vérification du rôle pour afficher les actions (organisateur, participant...)

## 6. Installation et lancement

### Backend (Java)

1. Cloner le dépôt
2. Configurer `persistence.xml` avec votre base MySQL
3. Lancer la classe `RestEasyServer.java`
4. API disponible sur `http://localhost:8080`

### Frontend (React / Next.js)

```bash
cd front-end
npm install
npm run dev

```

accédez à l'application via : http://localhost:3000

### Connexion d'utilisateurs via postman

Sur postman avec la méthode POST via http://localhost:8080/utilisateur/login, avec une autorisation Bearer Token et des entêtes Postman token et Content-type via les champs

**"email" et "mdp"**


## 7. Scénarios de test

### En tant que participant

* Créer un compte avec le rôle PARTICIPANT
* Consulter la liste des evenements
* Acheter un ou plusieurs tickets (vérification du stock et du statut)

### En tant qu'organisateur

* Créer un compte avec le rôle ORGANISATEUR
* Ajouter de nouveaux evenements(titre, date, lieu, description, genre musiacl, artistes)
* Modifier les concerts créés

## 8. Avancement

* [X]  CRUD complet sur les entités principales (Utilisateur, Evenement, Ticket, Artiste...)
* [X]  Gestion des rôles et du jeton d'accès
* [X]  Communication REST entre front et back
* [X]  Design responsive et moderne (TailwindCSS)
* [X]  Inscripstion utilisateur & connexion
* [X]  Affichage de la liste des evenements si PARTICIPANT, et création d'évenements en plus si ORGANISATEUR
* [X]  Notifications et affichage des artistes/genres musicaux

## 9. Auteurs

* BAH Oumou
* N'GUESSAN Fleur
* Etudiantes en Master MIAGE à l'Université de Rennes

Merci à Monsieur **BARAIS Olivier** et Monsieur **Blot Aymeric** pour leur encadrement.

Merci pour votre lecture et votre intérêt pour ce projet réalisé dans le cadre d'un projet académique .
