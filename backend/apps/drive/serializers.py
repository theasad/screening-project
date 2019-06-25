from rest_framework import serializers
from apps.drive.models import Folder


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
