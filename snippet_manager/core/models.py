from datetime import date
from django.contrib.auth.models import User
from django.db import models
from django.urls import reverse

# Create your models here.

class Snippet (models.Model):
    title = models.CharField(max_length=100, help_text="Brief title for the snippet.")
    description = models.CharField(max_length=500, help_text="Brief description of the function of the snippet")
    language = models.CharField(max_length=50, help_text="The language this snippet is written in.", default='none')
    date = models.DateField(default=date.today)
    code = models.TextField(blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    original = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)
    times_copied = models.PositiveIntegerField(default=0)

    def get_absolute_url(self):
        return reverse('snippet-detail', args=[str(self.pk)])

    def __str__(self):
        return f'{self.title}'

    class Meta:
        ordering = ['-date']

