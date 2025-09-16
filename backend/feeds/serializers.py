from rest_framework import serializers
from .models import Feed, FeedItem

# Conversion des données de la table "Feed" en JSON pour les passer côté client (Front-end) via API
class FeedSerializer(serializers.ModelSerializer):
    items_count = serializers.IntegerField(source='items.count', read_only=True)
    class Meta:
        model = Feed
        fields = ['id','url','title','description','last_fetched','items_count']

# Conversion des données de la table "FeedItem" en JSON pour les passer côté client (Front-end) via API
class FeedItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedItem
        fields = ['id','guid','title','link','description','published','created_at']
