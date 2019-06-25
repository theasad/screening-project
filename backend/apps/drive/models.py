from email.policy import default
from enum import unique
from locale import format

from django.db import models
from django.template.defaultfilters import lower

from apps.drive.query_manager import FileQuerySet, FolderQuerySet


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

    def get_linemanagers(self):
        if self.parent is None:
            return Folder.objects.none()
        return Folder.objects.filter(pk=self.parent.pk) | self.parent. get_linemanagers()


def get_folder_list(folder):
    return folder.get_linemanagers()


def file_directory_path(instance, filename):
    print('++++++++++++++++++++++++++++++++++++')
    print(get_folder_list(instance.folder))
    print('++++++++++++++++++++++++++++++++++++')

    folders = instance.folder.get_linemanagers()
    count = 0
    folder_dir = ''
    for folder in folders:
        print('++++++++++++++++++++++++++++++++++++')
        print(folder)
        if count > 0:
            folder_dir += folder.name + '/'
        else:
            folder_dir = folder.name + '/'
        count = count+1
    folder_dir += instance.folder.name + '/'
    return 'drive/{0}/{1}'.format(folder_dir, filename)


class File(models.Model):
    folder = models.ForeignKey(
        Folder, related_name='files', on_delete=models.CASCADE)
    file = models.FileField(
        upload_to=file_directory_path, unique=True)
    created = models.DateTimeField(auto_now_add=True)

    objects = FileQuerySet.as_manager()

    def __str__(self):
        return self.file.name
