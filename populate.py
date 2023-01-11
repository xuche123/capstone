import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "capstone.settings")

import django

django.setup()

from imagine.models import User, Post, Profile, Prompt
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

def populate_prompts():
    with open("result.json", encoding="utf8") as f:
        prompt = json.load(f)
        users = User.objects.all()

        for i in range(1000):
            prompts = Prompt(
                prompt=prompt[i]["Prompt"], user=users[i % len(users)]
            )
            prompts.save()


if __name__ == "__main__":
    print("Populating the database...")
    # populate_post("lexica.json")
    # print("Populating complete")
    populate_prompts()
    # Prompt.objects.all().delete()