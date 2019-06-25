from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns
from apps.drive import views

urlpatterns = [
    path('folders/', views.FolderViewSet.as_view()),
    path('folders/<int:pk>/', views.FolderDetailsViewSet.as_view()),
]
urlpatterns = format_suffix_patterns(urlpatterns)
