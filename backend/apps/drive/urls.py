from django.urls import include, path
from rest_framework.routers import DefaultRouter

from apps.drive import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'folders', views.FolderViewSet)
urlpatterns = [
    path('', include(router.urls))
]
