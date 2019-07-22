from rest_framework import serializers
from core.models import Snippet

# class LanguageSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Language
#         fields = ['pk', 'name', 'code']

class SnippetSerializer(serializers.ModelSerializer):
    # language = serializers.StringRelatedField(many=False)
    # language = LanguageSerializer(many=False)
    num_times_copied = serializers.SerializerMethodField()

    class Meta:
        model = Snippet
        fields = ['language', 'title', 'date', 'code', 'description', 'user', 'original', 'pk', 'num_times_copied']

    def get_num_times_copied(self, obj):
        return obj.copies.count()
    # def create(self, validated_data):
    #     languages_data = validated_data.pop('language')
    #     snippet = Snippet.objects.create(**validated_data)
    #     for language_data in languages_data:
    #         Language.objects.create(snippet=snippet, **language_data)
    #     return snippet
