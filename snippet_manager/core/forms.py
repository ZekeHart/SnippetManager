from django import forms
from django.forms.widgets import Widget
from core.models import Language

# class codeField(Widget):



class addSnippet(forms.Form):
    title = forms.CharField(max_length=100, min_length=1)
    description = forms.CharField(max_length=500, required=False)
    language = forms.ModelChoiceField(queryset=Language.objects.all(), to_field_name='name', required=True, empty_label=None)
    code = forms.CharField(widget=forms.Textarea, required=True, strip=False)


class editSnippet(forms.Form):
    title = forms.CharField(max_length=100, min_length=1)
    description = forms.CharField(max_length=500, required=False)
    language = forms.ModelChoiceField(queryset=Language.objects.all(), to_field_name='name', required=True, empty_label=None)
    code = forms.CharField(widget=forms.Textarea, required=True, strip=False)
