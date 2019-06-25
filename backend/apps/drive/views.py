from rest_framework import viewsets

from apps.drive.models import Folder
from apps.drive.serializers import FolderSerializer

# Create List Viewset.


class FolderViewSet(viewsets.ModelViewSet):
    queryset = Folder.objects.parent().prefetch_related('child')
    serializer_class = FolderSerializer
    permission_classes = ()
