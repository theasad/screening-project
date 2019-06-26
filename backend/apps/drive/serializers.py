from rest_framework import serializers
from django.conf import settings
from apps.drive.models import File, Folder


class FolderSerializer(serializers.ModelSerializer):
    slug = serializers.CharField(read_only=True)

    class Meta:
        model = Folder
        fields = ('id', 'name', 'slug', 'color', 'parent')


class ChildFolderSerializer(serializers.ModelSerializer):
    folders = serializers.SerializerMethodField(
        method_name='get_children')
    files = serializers.SerializerMethodField()
    dir_map = serializers.SerializerMethodField(
        method_name='get_folders', read_only=True)
    slug = serializers.CharField(read_only=True)

    class Meta:
        model = Folder
        fields = ('id', 'name', 'slug', 'color',
                  'parent', 'dir_map', 'folders', 'files')

    def get_files(self, obj):
        serializer = FileSerializer(obj.files.all(), many=True, context={
                                    'request': self.context['request']})
        return serializer.data

    def get_children(self, obj):
        serializer = FolderSerializer(obj.children.all(), many=True)
        return serializer.data

    def get_folders(self, obj):
        serializer = FolderSerializer(
            obj.get_parentfolders(), many=True)
        return serializer.data


class FileSerializer(serializers.ModelSerializer):
    icon = serializers.SerializerMethodField()
    dir_map = serializers.SerializerMethodField(
        method_name='get_folders', read_only=True)
    name = serializers.CharField(read_only=True)

    class Meta:
        model = File
        fields = ('id', 'folder',
                  'created', 'icon', 'file', 'name', 'dir_map')

    # def get_name(self, obj):
    #     return obj.name()

    def get_icon(self, obj):
        name_split = obj.file.name.split('.')
        icon_name = 'file'
        if len(name_split) > 1:
            icon_name = obj.file.name.split('.')[-1].lower()
            if icon_name in ['jpg', 'jpeg']:
                icon_name = 'jpg'
            elif icon_name in ['doc', 'docx']:
                icon_name = 'word'
        return self.context['request'].build_absolute_uri(settings.FILE_ICON_URL+icon_name+'.png')

    def get_folders(self, obj):
        serializer = FolderSerializer(
            obj.folder.get_parentfolders(), many=True)
        return serializer.data
