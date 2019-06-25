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
        try:
            return Folder.objects.get(pk=folder_pk)
        except Folder.DoesNotExist:
            raise Http404

    def get_queryset(self):
        folder = self.get_folder_obj(self.kwargs.get('folder_pk'))
        query_set = folder.files.all()
        return query_set

    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        if None in [file]:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        # Process the uploaded model
        _, ext = os.path.splitext(file.name)
        type = ext[1:].lower() if len(ext) > 0 else None

        with tempfile.NamedTemporaryFile(delete=False) as fp:
            tmppath = fp.name
            for chunk in file.chunks():
                fp.write(chunk)

            # Save the model in the static path
            folder = self.get_folder_obj(self.kwargs.get('folder_pk'))
            dir = "{}/drive/{}/{}".format(settings.MEDIA_ROOT,
                                          folder.name, file.name)
            destpath = Path(settings.MEDIA_ROOT) / 'drive' / folder.name
            if not destpath.exists():
                destpath.mkdir(parents=True)
            # path = "{}/{}".format(dir, file.name)
            target = "{}/{}".format(destpath, file.name)
            shutil.copyfile(tmppath, target)
            print('dasdasdasdasdssssssssssssssssssssssss')
            print(request.data)
        return super().post(request, *args, **kwargs)
