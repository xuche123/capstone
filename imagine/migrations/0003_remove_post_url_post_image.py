# Generated by Django 4.0.6 on 2022-11-23 04:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('imagine', '0002_profile_post_like_follow_comment'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='url',
        ),
        migrations.AddField(
            model_name='post',
            name='image',
            field=models.ImageField(blank=True, upload_to='images/'),
        ),
    ]
