# RSS-News-Reader
Date de création du dossier : 14/09/2025

Une application qui rassemble et affiche des **flux RSS** à partir de différentes sources. Un **flux RSS** est un fichier source XML souvent utilisé par les sites d'actualités et les blogs pour présenter les titres de leurs articles.

La conception de cette application se base sur deux frameworks :
- [React](https://react.dev/), un framework orienté client **(Front-end)** basé sur le langage de programmation [JavaScript](https://www.javascript.com/) ;
- [Django](https://www.djangoproject.com/), un framework côté serveur **(Back-end)** qui se base essentiellement sur le langage [Python](https://www.python.org/).

Le **SGBDR** (Système de gestion de bases de données relationnelles) [PostgreSQL](https://www.postgresql.org/) a été utilisé pour le stockage des données / informations de l'application.

## Composition du projet
Puisque le projet possède une partie **frontend** et une partie **backend**, ce dernier est composé de deux dossiers correspondant à chacune de ces parties :
- Un dossier [`/backend`](/backend) ;
- Un dossier [`/frontend`](frontend) ;

### Côté serveur (Back-end)
Le dossier [`/backend`](/backend) comporte toute la logique fondamentale pour le bon fonctionnement du projet. Dans ce dossier, on retrouve :
- Le fichier [`manage.py`](/backend/manage.py), script pour éxécuter les commandes Django ;
- Un dossier nommé [`/feeds`](/backend/feeds/) qui gère la logique des flux RSS et de leurs articles. Cette gestion est permise via plusieurs fichiers et dossiers, notamment :
  - [`models.py`](/backend/feeds/models.py) et le dossier [`/migrations`](/backend/feeds/migrations/) pour la définition et la migration des tables vers la base de données ;     
  - [`utils.py`](/backend/feeds/utils.py) pour la définition de fonctions utilitaires spécifiques aux flux RSS ;      
  - [`serializers.py`](/backend/feeds/serializers.py) pour la transmission des données sous format JSON à la partie frontend ;
  - [`views.py`](/backend/feeds/views.py) pour la définition des comportements des routes et endpoints (API) de l'application comme les méthodes HTTP et les données envoyées côté frontend ;

- Un dossier [`/rss_backend`](/backend/rss_backend/) qui représente l'élément centrale du projet, en fournissant les configurations nécessaires au fonctionnement du projet, essentiellemnt avec les fichiers [`settings.py`](/backend/rss_backend/settings.py), et [`urls.py`](/backend/rss_backend/urls.py) pour la définition des routes et endpoints.

### Côté client / utilisateur (Front-end)
Le dossier [`/frontend`](/frontend) comporte tous les éléments visibles par l'utilisateur, et avec lesquels celui-ci peut intéragir. Dans ce dossier, on retrouve :
- Le dossier [source](/frontend/src/) qui regroupe l'ensemble des pages et composants de l'application. Parmi ces fichiers, nous avons :
  - Le composant [`Header.jsx`](/frontend/src/components/Header.jsx) qui est l'entête de page de l'application ;
  - Un dossier [`/pages`](/frontend/src/pages/) comprenant la page des flux [`FeedsList.jsx`](/frontend/src/pages/FeedsList.jsx) et la page des articles de chaque flux [`FeedDetails.jsx`](/frontend/src/pages/FeedDetails.jsx) ;
  - Un fichier [`api.js`](/frontend/src/api.js) qui communique les appels API au backend ;
  - Un fichier [`index.css`](/frontend/src/index.css) pour la stylisation des pages ;
  - Un fichier [`main.jsx`](/frontend/src/main.jsx) pour le rendu des pages sur le fichier [`index.html`](/frontend/index.html) ;

- Il y a également le fichier [`package.json`](/frontend/package.json) qui recense toutes les dépendances, bibliothèques et frameworks utilisés au niveau frontend.

## Fonctionnalités de l'application
Sur cette application, l'utilisateur peut :
- Ajouter des nouveaux flux RSS et les consulter ;
- Supprimer ses flux RSS ;
- Consulter les articles d'un flux spécifique ;
- Rafraîchir ses flux RSS via un bouton, pour mettre à jour leurs articles.

## Dépendances, frameworks et bibliothèques installées
Pour réaliser cette application, plusieurs dépendances  ont été installées, comme :
### Au niveau `Back-end` :
  - __django-cors-headers__, une dépendance qui va définir quels protocoles, domaines ou ports vont accéder aux APIs de l'application ;
  - __djangorestframework__, une bibliothèque qui rend le framework Django plus performant, notamment en me facilitant la création d'APIs ;
  - __feedparser__, une bibliothèque qui va analyser, parser et télécharger les flux RSS de l'application, à partir d'un URL.

### Au niveau `Front-end` :
  - __axios__, une bibliothèque JavaScript utile pour faire des requêtes HTTP depuis mon frontend vers mon backend ;
  - __react-router-dom__, une autre bibliothèque JavaScript qui gère les routes côté frontend ;

## Configuration et installation du projet
Tout d'abord, s'assurer que PostgreSQL et Python sont installés sur votre machine. Si cela n'est pas le cas, se rendre sur la [page d'installation de PostgreSQL](https://www.postgresql.org/download/) et de [Python](https://www.python.org/downloads/) et suivre les instructions.

**Node.js** est également requis pour faire fonctionner le projet. Il faut donc [l'installer](https://nodejs.org/en/download) si ce n'est pas dejà fait.

  **1** - Sur le terminal, cloner le projet à partir de son lien GitHub :

      git clone https://github.com/AmaraABC/RSS-News-Reader.git

  **2** - Une fois le projet cloné, se rendre dans le dossier [`/backend`](/backend) et créer un environnement virtuel avec les instructions suivantes :
      
      cd /backend
      python -m venv .venv
  
  **3** - Activer cet environnement virtuel avec les commandes suivantes :

      source .venv/bin/activate   # Sur Mac ou Linux
      source .venv/Scripts/activate   # Sur Windows

  **4** - Installer les dépendances nécessaires au projet à la racine du dossier [`/backend`](/backend), à l'aide de cette commande (et du fichier [`requirements.txt`](/backend/requirements.txt)) :

      pip install -r /backend/requirements.txt
  
  **5** - Créer un fichier `.env` à la racine du dossier [`/backend`](/backend), à partir du fichier [`.env.example`](/backend/.env.example) :

      cp .env.example .env

  **6** - Remplacer les champs attendus dans le nouveau `.env`. Pour la clé secrète `SECRET_KEY`, l'utilisateur doit la générer à l'aide de cette commande dans le terminal :
        
      python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"

  Il doit copier cette clé puis la coller dans le champ `SECRET_KEY`.

  **7** - Effectuer les migrations vers la base de données :
        
      python manage.py makemigrations
      python manage.py migrate

  **8** - Dans le même dossier, lancer le serveur Django à l'aide de cette commande :

      python manage.py runserver
  
  **9** - Se rendre désormais dans la partie Front-end du projet :

      cd ..
      cd frontend

  **10** - Installer les librairies nécessaires au projet :

      npm install

  **11** - Démarrer le serveur de développement :

      npm run dev

## Améliorations futures / envisagées
- L'authentification de l'utilisateur : l'utilisateur sera capable de s'inscrire, se connecter et s'abonner à ses flux préférés ;
- Permettre à l'utilisateur de marquer des articles comme étant ses favories ou comme étant lus ;
- Avertir l'utilisateur des nouveaux articles publiés récemment ;
- La possibilité de filtrer et rechercher certains articles d'un flux ;
- La sauvegarde des préférences de l'utilisateur et la personnalisation des flux par l'utilisateur ;
- La conteneurisation et le déploiement de l'application avec Docker, et fournir une série d'instructions claires avec un pipeline CI/CD.