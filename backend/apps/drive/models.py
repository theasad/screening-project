from email.policy import default
from enum import unique
from locale import format
from django.utils.text import slugify
from django.db import models
from django.template.defaultfilters import lower
from apps.drive.utils import unique_slugify, get_media_filesize
from apps.drive.query_manager import FileQuerySet, FolderQuerySet
import os


class Folder(models.Model):
    name = models.CharField(max_length=100)  # Folder name
    slug = models.SlugField(max_length=50, null=True, blank=True, unique=True)
    color = models.CharField(max_length=20, blank=True,
                             null=True)  # Folder and text color
    parent = models.ForeignKey('self', blank=True, null=True,
                               related_name='children', on_delete=models.CASCADE)  # parent folder id for nexted/Child folder
    created = models.DateTimeField(auto_now_add=True)

    objects = FolderQuerySet.as_manager()

    def save(self, *args, **kwargs):
        if not self.slug:
            # Generate an unique slug using folder name for a folder and save it
            unique_slugify(self, self.name)
        super(Folder, self).save(**kwargs)

    def __str__(self):
        return self.name

    def get_parentfolders(self):
        # This return a folder all parent folders

        if self.parent is None:
            return Folder.objects.none()
        return Folder.objects.filter(pk=self.parent.pk) | self.parent.get_parentfolders()

    class Meta:
        ordering = ['-created']


def file_directory_path(instance, filename):
    # This generate a directory where save all uploaded file
    if instance.folder:
        folders = instance.folder.get_parentfolders()
        parent_folder = list(folders.values_list('slug', flat=True))
        folder_list = parent_folder+[instance.folder.slug]
        destination_folder = "/".join(folder_list)
        return f'drive/{destination_folder}/{filename}'
    else:
        return f'drive/files/{filename}'


class File(models.Model):
    folder = models.ForeignKey(
        Folder, related_name='files', on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    file = models.FileField(
        max_length=3500,
        upload_to=file_directory_path)
    created = models.DateTimeField(auto_now_add=True)

    objects = FileQuerySet.as_manager()

    def save(self, *args, **kwargs):
        self.name = os.path.basename(self.file.name)
        super(File, self).save(**kwargs)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created']
