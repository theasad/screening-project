from django.http import Http404
from rest_framework import generics, status
from rest_framework.response import Response

from apps.drive.models import Folder
from apps.drive.serializers import (ChildFolderSerializer, FolderSerializer)


class FolderViewSet(generics.ListCreateAPIView):
    queryset = Folder.objects.parents()
    serializer_class = FolderSerializer


class FolderDetailsViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Folder.objects.all()
    serializer_class = ChildFolderSerializer
