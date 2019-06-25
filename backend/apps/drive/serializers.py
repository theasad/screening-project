from rest_framework import serializers
from apps.drive.models import Folder


# Create Folder serializer
class FolderSerializer(serializers.ModelSerializer):
    childs = serializers.SerializerMethodField()

    class Meta:
        model = Folder
        fields = ('id', 'name', 'color', 'parent', 'childs')

    def get_childs(self, obj):
        serializer = FolderSerializer(obj.child.all(), many=True)
        return serializer.data
