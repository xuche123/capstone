# Generated by Django 4.1.4 on 2023-01-02 15:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("imagine", "0006_alter_post_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="post",
            name="image",
            field=models.ImageField(upload_to="images/"),
        ),
        migrations.AlterField(
            model_name="profile",
            name="image",
            field=models.ImageField(blank=True, upload_to="user_icons/"),
        ),
    ]