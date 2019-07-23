from rest_framework import serializers
from core.models import Snippet

class SnippetSerializer(serializers.ModelSerializer):
    num_times_copied = serializers.SerializerMethodField()
    user_username = serializers.SerializerMethodField()

    class Meta:
        model = Snippet
        fields = ['language', 'title', 'date', 'code', 'description', 'user', 'original', 'pk', 'num_times_copied', 'user_username']

    def get_num_times_copied(self, obj):
        return obj.copies.count()

    def get_user_username(self, obj):
        return obj.user.get_username()
