# Generated by Django 2.2.2 on 2019-06-25 20:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('drive', '0004_remove_file_file'),
    ]

    operations = [
        migrations.AddField(
            model_name='file',
            name='file',
            field=models.FileField(blank=True, upload_to=''),
        ),
    ]
