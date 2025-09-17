# RSS-News-Reader
Date de création du dossier : 14/09/2025

Une application qui rassemble et affiche des flux RSS à partir de différentes sources. La conception de cette application se base sur deux frameworks :
- [React](https://react.dev/), un framework orienté client (Front-end) basé sur le langage de programmation [JavaScript](https://www.javascript.com/) ;
- [Django](https://www.djangoproject.com/), un framework côté serveur (Back-end) qui se base essentiellement sur le langage [Python](https://www.python.org/).

Le SGBDR (Système de gestion de bases de données relationnelles) [PostgreSQL](https://www.postgresql.org/) a été utilisé pour le stockage des données / informations de l'application.

## Composition du projet
Puisque le projet possède une partie Front-end et une partie Back-end, ce dernier est composé de deux dossiers correspondant à chacune de ces parties :
- Le dossier [**backend**](backend) ;
- Le dossier [**frontend**](frontend) (pour le moment indisponible) ;

### Côté serveur (Back-end)
Le dossier [**backend**](backend) comporte toute la logique fondamentale pour le bon fonctionnement du projet côté serveur. Dans ce dossier, on retrouve :
- Un fichier [**manage.py**](backend/manage.py), script pour éxécuter les commandes Django ;
- Un dossier nommé [**feeds**](backend/feeds/) qui gère les flux RSS et les articles. Cette gestion est permise via plusieurs fichiers et dossiers, notamment :
  - [**models.py**](backend/feeds/models.py) et le dossier [**migrations**](backend/feeds/migrations/) pour la définition et la migration des tables vers la base de données ;     
  - [**utils.py**](backend/feeds/utils.py) pour la définition de fonctions utilitaires spécifiques aux flux RSS ;      
  - [**serializers.py**](backend/feeds/serializers.py) et [**views.py**](backend/feeds/views.py) pour la conversion des données sous format JSON pour les transmettre côté client (Front-end), la reception des requêtes API et le renvoie d'une réponse côté client (Front-end) ;

- Un dossier [**rss_backend**](backend/rss_backend/) qui représente l'élément centrale du projet, en fournissant les configurations nécessaires au fonctionnement du projet, essentiellemnt avec les fichiers [**settings.py**](backend/rss_backend/settings.py) et [**urls.py**](backend/rss_backend/urls.py).

### Côté client / utilisateur (Front-end)
Le dossier [**frontend**](frontend) comporte tous les éléments visibles par l'utilisateur, et avec lesquels celui-ci peut intéragir. Dans ce dossier, on retrouve :
- Un dossier [**source**](/frontend/src/) qui regroupe l'ensemble des pages et composants de l'application. Parmi ces fichiers, nous avons :
  - Un composant [**Header.jsx**](/frontend/src/components/Header.jsx) qui est l'entête de page de l'application ;
  - Un dossier [**pages**](/frontend/src/pages/) comprenant la page des flux [**FeedsList.jsx**](/frontend/src/pages/FeedsList.jsx) et la page des articles de chaque flux [**FeedDetails.jsx**](/frontend/src/pages/FeedDetails.jsx) ;
  - Un fichier [**api.js**](/frontend/src/api.js) qui communique les appels API réalisés par le frontend au backend ;
  - Un fichier [**index.css**](/frontend/src/index.css) pour la stylisation des pages ;
  - Un fichier [**main.jsx**](/frontend/src/main.jsx) qui va transmettre les composants et pages au fichier [**index.html**](/frontend/index.html) ;

- Il y a également le fichier [**package.json**](/frontend/package.json) qui recense les configurations nécessaires pour le projet au niveau frontend.

## Fonctionnalités de l'application
Sur cette application, l'utilisateur peut :
- Ajouter des nouveaux flux RSS et les voir ;
- Supprimer ses flux RSS ;
- Consulter les articles d'un flux spécifique.

## Dépendances, librairies et bibliothèques installées
Pour réaliser cette application, plusieurs dépendances ont été installées, comme :
### - Au niveau **Back-end** :
  - ***django-cors-headers***, une dépendance qui va définir quels protocoles, domaines ou ports vont accéder aux APIs de l'application ;
  - ***djangorestframework***, une bibliothèque qui rend le framework Django plus performant, notamment en me facilitant la création d'APIs ;
  - ***feedparser***, une bibliothèque qui va analyser, parser et télécharger les flux RSS de l'application, à partir d'un URL.

### - Au niveau **Front-end** :
  - ***axios***, une librairie JavaScript utile pour faire des requêtes HTTP depuis mon frontend vers mon backend ;
  - ***react-router-dom***, une autre librairie JavaScript qui gère les routes côté client (Front-end) ;

## Configuration et installation du projet
Tout d'abord, s'assurer que PostgreSQL et Python sont installés sur votre machine. Si cela n'est pas le cas, se rendre sur la [page d'installation de PostgreSQL](https://www.postgresql.org/download/) et de [Python](https://www.python.org/downloads/) et suivre les instructions.

Node.js est également requis pour faire fonctionner le projet. Il faut donc [l'installer](https://nodejs.org/en/download) si ce n'est pas fait.

  **1** - Sur le terminal, cloner le projet à partir de son lien GitHub :

        git clone https://github.com/AmaraABC/RSS-News-Reader.git

  **2** - Une fois le projet cloné, à la racine du projet, créer un environnement virtuel avec l'instruction suivante :

        python -m venv .venv
  
  **3** - Activer cet environnement virtuel avec les commandes suivantes :

        source .venv/bin/activate   # Sur Mac ou Linux
        source .venv\Scripts\activate   # Sur Windows

  **4** - Installer les dépendances nécessaires au projet à l'aide du fichier [**requirements.txt**](backend/requirements.txt) :

        pip install -r /backend/requirements.txt
  
  **5** - Se rendre dans le dossier [**backend**](/backend/) puis créer un fichier **.env** à la racine de ce dossier, à partir du fichier [**.env.example**](/backend/.env.example) :

        cd /backend
        cp .env.example .env

  **6** - Ouvrir PostgreSQL / pdAdmin puis créer une base de données et un utilisateur à l'aide du fichier [**rss_feed.sql**](/backend/rss_feed.sql). Les champs en commentaires sont à remplacer par le nom de la base de données et de l'utilisateur de votre choix.

  **7** - Remplacer les champs attendus dans le nouveau .env (en fonction de ce que vous avez renseigné pour la base de données et l'utilisateur pour PostgreSQL). Pour la clé secrète, l'utilisateur doit la générer à l'aide de cette commande :
        
        python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"

  Il doit copier cette clé dans le fichier .env, pour la variable ***SECRET_KEY***.

  **8** - Effectuer les migrations vers la base de données :
        
        python manage.py makemigrations
        python manage.py migrate

  **9** - Dans le même dossier, lancer le serveur Django à l'aide de cette commande :

        python manage.py runserver
  
  **10** - Se rendre désormais dans la partie Front-end du projet :

        cd ..
        cd frontend

  **11** - Installer les librairies nécessaires au projet :

        npm install

  **12** - Démarrer le serveur de développement :

        npm run dev

## Améliorations futures / envisagées
- L'authentification de l'utilisateur : l'utilisateur sera capable de s'inscrire, se connecter et s'abonner à ses flux préférés ;
- Permettre à l'utilisateur de marquer des articles comme étant ses favories ou comme étant lus ;
- Avertir l'utilisateur des nouveaux articles publiés récemment ;
- La possibilité de filtrer et rechercher certains articles d'un flux ;
- La sauvegarde des préférences de l'utilisateur et la personnalisation des flux par l'utilisateur ;
- La conteneurisation et le déploiement de l'application avec Docker, et fournir une série d'instructions claires avec un pipeline CI/CD.