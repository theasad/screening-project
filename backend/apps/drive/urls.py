from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns

from apps.drive import views

urlpatterns = [
    path('folders/', views.FolderViewSet.as_view()),

    path('folders/files/', views.FileViewSet.as_view()),
    path('folders/<str:slug>/', views.FolderDetailsViewSet.as_view()),
    path('folders/<str:slug>/files/', views.FileViewSet.as_view()), ]
