import os
import shutil
import tempfile
from pathlib import Path
from fileinput import filename

from django.conf import settings
from django.http import Http404
from rest_framework import generics, status
from rest_framework.response import Response

from apps.drive.models import File, Folder
from apps.drive.serializers import (ChildFolderSerializer, FileSerializer,
                                    FolderSerializer)
from backend.settings import MEDIA_ROOT


class FolderViewSet(generics.ListCreateAPIView):
    queryset = Folder.objects.parents()
    serializer_class = FolderSerializer


class FolderDetailsViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Folder.objects.all()
    serializer_class = ChildFolderSerializer


class FileViewSet(generics.ListCreateAPIView):

    serializer_class = FileSerializer

    def get_folder_obj(self, folder_pk):
        print(self.kwargs)
        try:
            return Folder.objects.get(pk=folder_pk)
        except Folder.DoesNotExist:
            raise Http404

    def get_queryset(self):
        order_by = self.request.GET.get('orderby')
        folder = self.get_folder_obj(self.kwargs.get('folder_pk'))
        query_set = folder.files.all().order_by(order_by if order_by else '-created')
        return query_set
