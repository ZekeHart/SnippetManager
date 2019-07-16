from django.contrib import admin

from core.models import Language, Snippet
# Register your models here.

admin.site.register(Language)

@admin.register(Snippet)
class SnippetAdmin(admin.ModelAdmin):
    list_display = ('user', 'language', 'title')
