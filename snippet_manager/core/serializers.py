from rest_framework import serializers
from core.models import Snippet, Language

class LanguageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Language
        fields = ['pk', 'name', 'code']

class SnippetSerializer(serializers.ModelSerializer):
    # language = serializers.StringRelatedField(many=False)
    language = LanguageSerializer(many=False, read_only=True)

    class Meta:
        model = Snippet
        fields = ['language', 'title', 'date', 'code', 'description', 'user', 'original', 'pk']

