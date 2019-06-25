from django.db import models


class FolderQuerySet(models.QuerySet):

    # Get only parent folder
    def parent(self):
        return self.filter(parent__isnull=True)

    # Get only child folder
    def child(self):
        return self.filter(parent__isnull=False)
