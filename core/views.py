from datetime import date
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from core.serializers import SnippetSerializer
from rest_framework import status, generics, filters, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend

from core.forms import addSnippet, editSnippet
from core.models import Snippet


def index(request):
    most_recent = Snippet.objects.order_by('-date')[:3]
    for snip in Snippet.objects.all():
        snip.times_copied = Snippet.objects.filter(original=snip.pk).count()
    if request.method == "GET":
        search_text = request.GET.get('search_text', '')
        if search_text is not None and search_text != u"":
            search_text = request.GET.get('search_text', '')
            snippets = Snippet.objects.filter(title__contains=search_text)
        else:
            snippets = []

    return render(
        request, 'index.html', {
            'snippets': snippets,
            'most_recent': most_recent,
            'snip0': most_recent[0],
            'snip1': most_recent[1],
            'snip2': most_recent[2],
        })


@login_required
def add_snippet(request):
    if request.method == 'POST':
        form = addSnippet(request.POST)
        if form.is_valid():
            snippet = Snippet.objects.create(
                title=form.cleaned_data['title'],
                description=form.cleaned_data['description'],
                language=form.cleaned_data['language'],
                code=form.cleaned_data['code'],
                user=request.user)
            snippet.save()
            return HttpResponseRedirect('user-home', args=[request.user.username])
    else:
        form = addSnippet()

    context = {
        'form': form,
        'code': form['code'],
    }

    return render(request, 'add_snippet.html', context=context)


@login_required
def edit_snippet(request, pk):
    snippet = get_object_or_404(Snippet, pk=pk)
    if request.method == 'POST':
        form = editSnippet(request.POST)
        if form.is_valid():
            snippet.title = form.cleaned_data['title']
            snippet.description = form.cleaned_data['description']
            snippet.language = form.cleaned_data['language']
            snippet.code = form.cleaned_data['code']
            snippet.save()
            return HttpResponseRedirect(
                reverse('user-home', args=[request.user.username]))

    else:
        form = editSnippet(
            initial={
                'title': snippet.title,
                'description': snippet.description,
                'language': snippet.language,
                'code': snippet.code
            })

    context = {
        'form': form,
    }

    return render(request, 'edit_snippet.html', context)


@login_required
def user_home(request, username):
    user = get_object_or_404(User, username=username)

    if (user == request.user):
        snippets = Snippet.objects.filter(user=user)

        context = {
            'user': user,
            'snippets': snippets,
        }

        return render(request, 'user_home.html', context)

    else:
        return HttpResponseRedirect(reverse('index.html'))

def snippet_detail(request, pk):
    snippet = get_object_or_404(Snippet, pk=pk)

    return render(request, 'snippet_detail.html', {'snippet': snippet})

class SnippetList(generics.ListCreateAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = [
        'language', 'title', 'description', 'user__username'
    ]


class OwnSnippets(generics.ListCreateAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = [
        'language', 'title', 'code', 'description', 'user__username'
    ]


class DeleteSnippets(generics.DestroyAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
