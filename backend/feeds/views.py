from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Feed, FeedItem
from .serializers import FeedSerializer, FeedItemSerializer
from .utils import fetch_feed
import logging

logger = logging.getLogger(__name__)
# Create your views here.

# API: CRUD de l'application
class FeedViewSet(viewsets.ModelViewSet):
    queryset = Feed.objects.all().order_by('created_at')
    serializer_class = FeedSerializer

    # Méthode "POST": Ajouter un flux RSS
    @action(detail=True, methods=['post'])
    def fetch(self, request, pk=None):
        # Manuellement rafraîchir un flux RSS, via un bouton qui sera disponible côté Front-end
        feed = self.get_object()
        try:
            created, skipped = fetch_feed(feed) # Télécharger le flux en question, parser ses articles et les passer dans la BDD
            return Response({'created': created, 'skipped': skipped}) # Nombre d'articles ignorés ou crées
        except Exception as e:
            logger.error(f"Erreur lors du fetch du feed {feed.id}: {e}", exc_info=True)
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    # Méthode "GET": Afficher tous les articles d'un flux sélectionné. 
    # Cette action correspond à la page "détails" d'un flux RSS.
    @action(detail=True, methods=['get'])
    def items(self, request, pk=None):
        # Lister les articles d’un flux donné
        feed = self.get_object()
        qs = FeedItem.objects.filter(feed=feed).order_by('-published')
        page = self.paginate_queryset(qs) # Variable pour la pagination des articles
        if page is not None:
            serializer = FeedItemSerializer(page, many=True) 
            return self.get_paginated_response(serializer.data) # Pagination de 10 articles par page
        serializer = FeedItemSerializer(qs, many=True)
        return Response(serializer.data)