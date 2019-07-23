"""snippet_manager URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
# from core.views import OwnSnippetsViewSet

# router = routers.SimpleRouter()
# router.register(r'own', OwnSnippetsViewSet, basename='')

from core import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('addsnippet/', views.add_snippet, name='add-snippet'),
    path('accounts/', include('allauth.urls')),
    path('user/<username>/', views.user_home, name='user-home'),
    path('snippets/', views.SnippetList.as_view()),
    path('snippets/<pk>', views.snippet_detail, name='snippet-detail'),
    path('own/', views.OwnSnippets.as_view()),
    path('delete/<pk>', views.DeleteSnippets.as_view()),
    path('edit/<pk>', views.edit_snippet, name='edit-snippet'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# urlpatterns += router.urls
