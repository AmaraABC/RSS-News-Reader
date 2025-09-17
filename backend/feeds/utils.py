import feedparser, datetime, time 
from django.utils import timezone
from .models import FeedItem

# Fonction pour convertir la date d'un élément de flux RSS sous format UTC (temps universel)
def _parse_entry_date(entry):
    # Pour une date de publication
    if entry.get('published_parsed'):
        return datetime.datetime.fromtimestamp(time.mktime(entry.published_parsed), tz=datetime.timezone.utc)
    
    # Pour une date de mise à jour, si la date de publication est inexistante
    if entry.get('updated_parsed'):
        return datetime.datetime.fromtimestamp(time.mktime(entry.updated_parsed), tz=datetime.timezone.utc)
    
    # Pour aucun des cas précédents
    return None

# Fonction concernant le fonctionnement d'un flux RSS
def fetch_feed(feed):
    """
    Télécharge et parse un feed RSS ;
    Analyse d'un objet représentant un feed via la dépendance feedparser ;
    Création de nouvelles entrées pour des nouveaux articles du flux (non existants pour le moment) dans la base de données ;
    Mise à jour de certaines infos du flux RSS ;
    """
    parsed = feedparser.parse(feed.url)
    if parsed.bozo:
        # Exception levée si erreur de parsing du feed
        raise Exception(getattr(parsed, 'bozo_exception', 'Feed parse error'))

    # Si nécessaire, une mise à jour des infos du feed
    feed.title = parsed.feed.get('title', feed.title) or feed.title
    feed.description = parsed.feed.get('description', feed.description) or feed.description

    created = 0 # Compteur qui indique le nombre d'articles de flux crées
    skipped = 0 # Compteur qui indique le nombre d'articles ignorés

    # Parcours du feed pour essayer de déterminer les articles crées ou ignorés
    for entry in parsed.entries:
        guid = entry.get('id') or entry.get('guid') or entry.get('link')

        if not guid:
            # Sauter les entrées sans identifiants uniques
            continue

        # Vérification de l'existance d'un article dans la BDD en fonction de son flux et son indentifiant
        if FeedItem.objects.filter(feed=feed, guid=guid).exists():
            skipped += 1
            # Ignorer l'article si c'est le cas (existant)
            continue

        # Création d'un nouvelle article du flux si inexistant auparavant
        published = _parse_entry_date(entry) # Récupération de la date de publication d'un article du flux
        FeedItem.objects.create(
            feed=feed,
            guid=guid,
            title=(entry.get('title') or 'No title')[:255],
            link=entry.get('link') or '',
            description=entry.get('summary') or entry.get('description',''),
            published=published,
        )
        created += 1

    feed.last_fetched = timezone.now() # Mise à jour de la date de récupération du feed
    feed.save(update_fields=['last_fetched','title','description']) # Sauvegarde des changements (titre, description et la dernière date de récupération du feed)
    return created, skipped # Renvoie le nombre d'articles ignorés ou crées sous forme de tuples