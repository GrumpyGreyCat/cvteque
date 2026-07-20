# Plateforme de Recrutement et Gestion de Talents - École Hexagone (School Project)

Cette application web complète permet de mettre en relation les étudiants de l'école (gestion de profil, CV, parcours académique, projets, compétences) avec des recruteurs, tout en offrant aux administrateurs un espace de gestion et d'importation de masse.

L'architecture repose sur un écosystème découplé :
- **Frontend** : Single Page Application (SPA) robuste développée avec **React** (v19/v18).
- **Backend** : API REST performante propulsée par **Symfony** (v7/v6) et sécurisée.
- **Base de données** : Système relationnel **PostgreSQL** pour garantir l'intégrité des relations complexes.

---

## 🚀 Fonctionnalités Principales

### 👨‍🎓 Espace Étudiant (Profil & CV)
- **Authentification sécurisée** basée sur le hachage de mots de passe.
- **Gestion du profil à onglets** : Informations personnelles, parcours académique, expériences professionnelles, projets et tags de compétences.
- **Synchronisation dynamique** : Sauvegarde asynchrone (`PUT`) dans PostgreSQL via des transactions isolées complexes.
- **Zone de Drop/Upload pour le CV** (Support PDF/DOC/DOCX limité à 5 Mo).

### 💼 Espace Emplois & Recherche
- **Filtres avancés** : Recherche croisée par mots-clés, compétences et localisation sur la page de recherche des talents.
- **Rendu d'offres d'emploi** : Affichage d'offres détaillées acceptant des descriptions techniques complexes de taille illimitée (`TEXT` SQL).

### 🛠️ Espace Administration (Import de Masse)
- **Importation JSON** : Module permettant de charger un fichier de données d'étudiants en masse.
- **Grille d'édition Live** : Modification, correction ou suppression des profils détectés directement dans l'interface avant validation.
- **Insertion intelligente** : Détection automatique et création à la volée des tags de compétences (`Skills`) non enregistrés en base de données pour éviter les doublons.
- **Mise à jour instantanée** : Système de rafraîchissement global via un contexte d'état unifié (`DataContext`) assurant la visibilité immédiate des nouveaux profils après l'import.

---

## 🛠️ Stack Technique

- **Frontend** : React, React Router (Navigation), Context API (Gestion d'état global centralisé), CSS3 natif (BEM/Scoping).
- **Backend** : PHP, Symfony, Doctrine ORM (Gestionnaire d'entités), Transactions SQL.
- **Database** : PostgreSQL (Types avancés, clés étrangères, tables de liaisons ManyToMany).

---

## 📦 Installation et Configuration

### 1. Prérequis
Assurez-vous d'avoir installé sur votre machine :
- **Node.js** (v18+) & **npm**
- **PHP** (v8.2+) & **Composer**
- Un serveur **PostgreSQL** actif

### 2. Configuration du Backend (Symfony)

1. Naviguez dans le dossier de votre projet backend :
   ```bash
   cd backend-symfony

```

2. Installez les dépendances PHP :
```bash
composer install

```


3. Configurez l'accès à votre base de données dans le fichier `.env` ou `.env.local` :
```env
DATABASE_URL="postgresql://utilisateur:mot_de_passe@127.0.0.1:5432/nom_bdd?serverVersion=16&charset=utf8"

```


4. Générez et appliquez les migrations pour configurer les tables (`jobs`, `students`, `skills`, `education`, `experience`, `project`) :
```bash
php bin/console doctrine:migrations:migrate

```


5. Lancez le serveur de développement Symfony (par défaut sur le port 8000) :
```bash
symfony server:start
# OU via PHP directement :
php -S 127.0.0.1:8000 -t public

```



### 3. Configuration du Frontend (React)

1. Naviguez dans le dossier de votre projet frontend :
```bash
cd frontend-react

```


2. Installez les paquets Node :
```bash
npm install

```


3. Vérifiez la correspondance de l'URL de base de l'API dans `src/context/DataContext.jsx` :
```javascript
const BASE_URL = '[http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)';

```


4. Démarrez l'application React en mode développement :
```bash
npm start

```



---

## 📂 Structure Clé des Fichiers Référencés

### 💻 Frontend (React)

* `src/context/DataContext.jsx` : Contexte d'état centralisé. Gère le cycle de vie des chargements asynchrones globaux de l'application et expose la fonction `refreshData()` pour forcer la synchronisation instantanée inter-pages.
* `src/page/Profile.jsx` : Composant maître de gestion du profil étudiant. Regroupe les états locaux complexes (Formations, Projets, Compétences) et orchestre l'envoi du payload structuré en méthode `PUT`.
* `src/page/AdminImport.jsx` : Interface d'administration pour charger, analyser et modifier les fichiers JSON d'étudiants avant la soumission en base de données.

### ⚙️ Backend (Symfony)

* `src/Controller/Api/StudentProfileApiController.php` : Contrôleur de mise à jour du profil. Gère les transactions sécurisées, nettoie les anciennes relations en cascade et réhydrate les entités liées à l'étudiant connecté.
* `src/Controller/Api/AdminApiController.php` : Contrôleur d'importation de masse. Valide les structures JSON entrantes, hache les mots de passe de connexion via `UserPasswordHasherInterface` et gère dynamiquement la table pivot d'association des compétences.

---

## 🔒 Sécurité & Bonnes Pratiques

* **Contrôle des flux** : Toutes les requêtes critiques de modification (`PUT`, `POST`) intègrent des blocs `try / catch` hermétiques interceptant les exceptions `\Throwable` afin de garantir que le serveur réponde **exclusivement sous forme de JSON valide** à React (évite les erreurs de parsing HTML).
* **Intégrité de la BDD** : Utilisation du mécanisme `$em->beginTransaction()`, `$em->commit()` et `$em->rollback()`. Si un seul profil ou une seule ligne d'un fichier d'importation de masse est corrompu, l'intégralité de la transaction SQL est annulée pour préserver la propreté de la base de données.
* **Hachage** : Les mots de passe transitent sous forme brute uniquement lors de l'import, puis sont immédiatement convertis en clés cryptographiques sécurisées avant l'écriture finale dans PostgreSQL.

```

```
