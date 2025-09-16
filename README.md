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
- Un dossier 

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

  1 - Sur le terminal, cloner le projet à partir de son lien GitHub :

        git clone https://github.com/AmaraABC/RSS-News-Reader.git

  2 - Une fois le projet cloné, à la racine du projet, créer un environnement virtuel avec l'instruction suivante :

        python -m venv .venv
  
  3 - Activer cet environnement virtuel avec les commandes suivantes :

        source .venv/bin/activate   # Sur Mac ou Linux
        source .venv\Scripts\activate   # Sur Windows

  4 - Installer les dépendances nécessaires au projet à l'aide du fichier [**requirements.txt**](backend/requirements.txt) :

        pip install -r /backend/requirements.txt
  
  5 - Se rendre dans le dossier [**backend**](/backend/) puis créer un fichier **.env** à la racine de ce dossier, à partir du fichier [**.env.example**](/backend/.env.example) :

        cd /backend
        cp .env.example .env

  7 - Ouvrir PostgreSQL / pdAdmin puis créer une base de données et un utilisateur à l'aide du fichier [**rss_feed.sql**](/backend/rss_feed.sql). Les champs en commentaires sont à remplacer par le nom de la base de données et de l'utilisateur de votre choix.

  8 - Remplacer les champs attendus dans le nouveau .env (en fonction de ce que vous avez renseigné pour la base de données et l'utilisateur pour PostgreSQL). Pour la clé secrète, l'utilisateur doit la générer à l'aide de cette commande :
        
        python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"

  Il doit copier cette clé dans le fichier .env, pour la variable ***SECRET_KEY***.

  9 - Effectuer les migrations vers la base de données :
        
        python manage.py makemigrations
        python manage.py migrate

  10 - Dans le même dossier, lancer le serveur Django à l'aide de cette commande :

        python manage.py runserver