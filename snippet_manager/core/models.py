from datetime import date
from django.contrib.auth.models import User
from django.db import models
from django.urls import reverse

# Create your models here.

class Language (models.Model):
    name = models.CharField(max_length=50, help_text="The language this snippet is written in.")
    code = models.CharField(max_length=10, help_text="code used with prism", null=True)

    def __str__(self):
        return f'{self.name}'


class Snippet (models.Model):
    title = models.CharField(max_length=100, help_text="Brief title for the snippet.")
    description = models.CharField(max_length=500, help_text="Brief description of the function of the snippet")
    language = models.ForeignKey("Language", on_delete=models.SET_NULL, null=True)
    date = models.DateField(default=date.today)
    code = models.TextField()
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    original = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)

    def get_absolute_url(self):
        return reverse('snippet', args=[str(self.pk)])

    def __str__(self):
        return f'{self.title}'

    class Meta:
        ordering = ['-date']

