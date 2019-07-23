from django.contrib import admin

from core.models import Snippet
# Register your models here.

@admin.register(Snippet)
class SnippetAdmin(admin.ModelAdmin):
    list_display = ('user', 'language', 'title')
