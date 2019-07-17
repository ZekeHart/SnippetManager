from rest_framework import serializers
from core.models import Snippet

class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = ['language', 'title', 'date',]
