import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "capstone.settings")

import django

django.setup()

from imagine.models import User, Post, Profile, Follow, Like, Comment
import json
import requests
from django.core import files
from io import BytesIO
import uuid


def populate_post(file):
    with open(file) as f:
        data = json.load(f)
        data = data["images"]
        for post in data:
            id = uuid.uuid4()
            user = User.objects.get(username="admin")
            url = post["src"]
            resp = requests.get(url)
            fp = BytesIO()
            fp.write(resp.content)
            file_name = url.split("/")[-1] + ".png"
            post = Post(
                id=id,
                user=user,
                body=post["prompt"],
                image=files.File(fp, file_name),
            )
            post.save()


if __name__ == "__main__":
    print("Populating the database...")
    populate_post("lexica.json")
    print("Populating complete")