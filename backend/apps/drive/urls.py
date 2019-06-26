from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns

from apps.drive import views

urlpatterns = [
    path('', views.FolderViewSet.as_view()),
    path('<str:slug>/', views.FolderDetailsViewSet.as_view()),
    path('<str:slug>/files/', views.FileViewSet.as_view()), ]
