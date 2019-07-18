from rest_framework import serializers
from core.models import Snippet

class SnippetSerializer(serializers.ModelSerializer):
    language = serializers.StringRelatedField(many=False)

    class Meta:
        model = Snippet
        fields = ['language', 'title', 'date', 'code',]
