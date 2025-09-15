from django.db import models
from django.utils import timezone

# Create your models here.

# Classe concernant un flux RSS
class Feed(models.Model):
    url = models.URLField(unique=True) # L'URL du flux
    title = models.CharField(max_length=255, blank=True) # Son titre
    description = models.TextField(blank=True) # Sa description
    last_fetched = models.DateTimeField(null=True, blank=True) # Quand il a été récupéré
    created_at = models.DateTimeField(auto_now_add=True) # Sa date de création
    updated_at = models.DateTimeField(auto_now=True) # Sa date de modification

    # Fonction qui retourne soit le titre du flux, ou son lien URL
    def __str__(self):
        return self.title or self.url

# Classe dédiée aux articles d'un flux
class FeedItem(models.Model):
    feed = models.ForeignKey(Feed, related_name='items', on_delete=models.CASCADE)
    guid = models.CharField(max_length=500) # Identifiant attribué par un flux RSS à un article
    title = models.CharField(max_length=255) # Titre
    link = models.URLField() # Lien
    description = models.TextField(blank=True) # Description
    published = models.DateTimeField(null=True, blank=True) # Date de publication
    created_at = models.DateTimeField(auto_now_add=True) # Date de mise à jour

    # Sous-classe qui va s'assurer de l'unicité de certaines données
    class Meta:
        unique_together = ('feed', 'guid') # Son flux et son identifiant
        ordering = ['-published'] 

    def __str__(self):
        return self.title # Renvoie le titre d'un article du flux