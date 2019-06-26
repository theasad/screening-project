from email.policy import default
from enum import unique
from locale import format
from django.utils.text import slugify
from django.db import models
from django.template.defaultfilters import lower
from apps.drive.unitls import unique_slugify
from apps.drive.query_manager import FileQuerySet, FolderQuerySet
import os

# Create Folder Model


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
            unique_slugify(self, self.name)
        super(Folder, self).save(**kwargs)

    def __str__(self):
        return self.name  # return folder name

    def get_parentfolders(self):
        if self.parent is None:
            return Folder.objects.none()
        return Folder.objects.filter(pk=self.parent.pk) | self.parent.get_parentfolders()

    class Meta:
        ordering = ['-created']


def file_directory_path(instance, filename):
    folders = instance.folder.get_parentfolders()

    parent_folder = list(folders.values_list('slug', flat=True))
    folder_list = parent_folder+[instance.folder.slug]
    destination_folder = "/".join(folder_list)
    return f'drive/{destination_folder}/{filename}'


class File(models.Model):
    folder = models.ForeignKey(
        Folder, related_name='files', on_delete=models.CASCADE)
    name = models.CharField(max_length=255, null=True, blank=True)
    file = models.FileField(
        upload_to=file_directory_path)
    created = models.DateTimeField(auto_now_add=True)

    objects = FileQuerySet.as_manager()

    def save(self, *args, **kwargs):
        self.name = os.path.basename(self.file.name)
        super(File, self).save(**kwargs)

    # def filename(self):
    #     return os.path.basename(self.file.name)

    def __str__(self):
        return os.path.basename(self.file.name)

    class Meta:
        ordering = ['-created']
