# Generated by Django 4.1.4 on 2023-01-10 08:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("imagine", "0008_remove_follow_follower_remove_follow_following_and_more"),
    ]

    operations = [
        migrations.DeleteModel(
            name="Like",
        ),
    ]
