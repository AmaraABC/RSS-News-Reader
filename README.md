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

Le dossier [**backend**](backend) comporte toute la logique pour le bon fonctionnement du projet côté serveur. Dans ce dossier, on retrouve :
- Un fichier [**manage.py**](backend/manage.py), script pour éxécuter les commandes Django ;
- Un dossier nommé [**feeds**](backend/feeds/) qui gère les flux RSS et les articles. Cette gestion est permise via plusieurs fichiers et dossiers, notamment [**models.py**](backend/feeds/models.py) et le dossier [**migrations**](backend/feeds/migrations/) pour la définition puis la migration des tables vers la base de données, ainsi que [**utils.py**](backend/feeds/utils.py) pour la définition de fonctions utilitaires spécifiques aux flux RSS ;
- Un dossier [**rss_backend**](backend/rss_backend/) qui représente l'élément centrale du projet, en fournissant les configurations nécessaires au fonctionnement du projet ([**settings.py**](backend/rss_backend/settings.py)).

## Fonctionnalités de l'application
Plusieurs fonctionnalités sont présentes dans l'application :
#### Côté serveur (Back-end) avec Django :
  - 

#### Côté client / utilisateur (Front-end) avec React :
  -   


## Dépendances et bibliothèques installées
Pour réaliser cette application, plusieurs dépendances ont été installées :
- Au niveau Back-end :
  - *django-cors-headers*, une dépendance qui va définir quels protocoles, domaines ou ports vont accéder aux APIs de l'application ;
  - *djangorestframework*, une bibliothèque qui rend le framework Django plus performant, notamment en me facilitant la création d'APIs ;
  - *feedparser*, une bibliothèque qui va analyser, parser et télécharger les flux RSS de l'application, à partir d'un URL.

## Configuration et installation du projet
  1 - Sur le terminal, cloner le projet à partir de son lien GitHub :
        - git clone https://github.com/AmaraABC/RSS-News-Reader.git

  2 - Une fois le projet cloné, à la racine du projet, créer un environnement virtuel avec l'instruction suivante :
        - python -m venv .venv
  
  3 - Activer cet environnement virtuel avec les commandes suivantes :
    - Sur Mac ou Linux :
        - source .venv/bin/activate
    
    - Sur Windows :
        - source .venv\Scripts\activate

  4 - Installer les dépendances nécessaires au projet à l'aide du fichier [**requirements.txt**](backend/requirements.txt) :
        - pip install -r /backend/requirements.txt
  
  5 - Se rendre dans le dossier [**backend**](/backend/) puis créer un fichier **.env** à la racine de ce dossier, à partir du fichier [**.env.example**](/backend/.env.example) :
        - cd /backend
        - cp .env.example .env

  6 - Remplacer les champs attendus dans le nouveau .env