from rest_framework import serializers

from apps.drive.models import File, Folder


class FolderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Folder
        fields = ('id', 'name', 'color', 'parent')


class ChildFolderSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = Folder
        fields = ('id', 'name', 'color', 'parent', 'children')

    def get_children(self, obj):
        serializer = FolderSerializer(obj.children.all(), many=True)
        return serializer.data


class FileSerializer(serializers.ModelSerializer):
    icon = serializers.SerializerMethodField(required=False)

    class Meta:
        model = File
        fields = ('id', 'folder',
                  'created', 'icon', 'file')

    def get_icon(self, obj):
        return obj.file.name
