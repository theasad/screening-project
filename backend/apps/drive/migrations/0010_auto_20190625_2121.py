# Generated by Django 2.2.2 on 2019-06-25 21:21

import apps.drive.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('drive', '0009_auto_20190625_2119'),
    ]

    operations = [
        migrations.AlterField(
            model_name='file',
            name='file',
            field=models.FileField(unique=True, upload_to=apps.drive.models.file_directory_path),
        ),
    ]
