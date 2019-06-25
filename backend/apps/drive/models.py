from email.policy import default

from django.db import models

from apps.drive.query_manager import FolderQuerySet


# Create Folder Model
class Folder(models.Model):
    name = models.CharField(max_length=100)  # Folder name
    color = models.CharField(max_length=20, blank=True,
                             null=True)  # Folder and text color
    parent = models.ForeignKey('self', blank=True, null=True,
                               related_name='children', on_delete=models.CASCADE)  # parent folder id for nexted/Child folder
    created = models.DateTimeField(auto_now_add=True)

    objects = FolderQuerySet.as_manager()

    def __str__(self):
        return self.name  # return folder name
