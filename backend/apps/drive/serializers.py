import os

from django.conf import settings
from django.contrib.staticfiles.storage import staticfiles_storage
from rest_framework import serializers

from apps.drive.models import File, Folder


class FolderSerializer(serializers.ModelSerializer):
    slug = serializers.CharField(read_only=True)

    class Meta:
        model = Folder
        fields = ('id', 'name', 'slug', 'color', 'parent')


class ChildFolderSerializer(serializers.ModelSerializer):
    child_folders = serializers.SerializerMethodField(
        method_name='get_children')
    # files = serializers.SerializerMethodField()
    breadcrumb_folders = serializers.SerializerMethodField()
    slug = serializers.CharField(read_only=True)
    # contents = serializers.SerializerMethodField()

    class Meta:
        model = Folder
        fields = ('id', 'name', 'slug', 'color',
                  'parent', 'breadcrumb_folders', 'child_folders')

    # def get_files(self, obj):
    #     serializer = FileSerializer(obj.files.all(), many=True, context={
    #                                 'request': self.context['request']})
    #     return serializer.data

    # def get_contents(self, obj):
    #     child_folders = self.get_children(obj)
    #     files = self.get_files(obj)
    #     rersponse = {
    #         'child_folders': child_folders,
    #         'files': files
    #     }
    #     return rersponse

    def get_children(self, obj):
        serializer = FolderSerializer(obj.children.all(), many=True)
        return serializer.data

    def get_breadcrumb_folders(self, obj):
        current = FolderSerializer(obj)
        serializer = FolderSerializer(
            obj.get_parentfolders(), many=True)
        response = {
            'parents': serializer.data,
            'active': current.data
        }
        return response


class FileSerializer(serializers.ModelSerializer):
    icon = serializers.SerializerMethodField()
    breadcrumb_folders = serializers.SerializerMethodField(read_only=True)
    name = serializers.CharField(read_only=True)

    class Meta:
        model = File
        fields = ('id', 'folder',
                  'created', 'icon', 'file', 'name', 'breadcrumb_folders')

    def get_icon(self, obj):
        name_split = obj.file.name.split('.')
        icon_name = 'file'
        if len(name_split) > 1:
            icon_name = obj.file.name.split('.')[-1].lower()
            if icon_name in ['jpg', 'jpeg']:
                icon_name = 'jpg'
            elif icon_name in ['doc', 'docx']:
                icon_name = 'word'
            elif icon_name in ['ppt', 'pptx']:
                icon_name = 'powerpoint'

            icon_dir = f"{settings.STATIC_ROOT}/icons/{icon_name}.png"

            # Check file or directory
            is_file = os.path.isfile(icon_dir)
            if not is_file:
                icon_name = 'file'

        icon_url = f"{settings.FILE_ICON_URL}{icon_name}.png"
        return self.context['request'].build_absolute_uri(icon_url)

    def get_breadcrumb_folders(self, obj):
        current = FolderSerializer(obj.folder)
        serializer = FolderSerializer(
            obj.folder.get_parentfolders(), many=True)
        response = {
            'parents': serializer.data,
            'active': current.data
        }
        return response
