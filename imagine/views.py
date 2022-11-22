from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.db import IntegrityError
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import os
import json
import replicate

from .models import User, Post, Profile, Follow, Like, Comment
# Create your views here.


def index(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("login"))
    return render(request, "imagine/index.html")


def login_view(request):
    if request.method == "POST":
        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "imagine/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "imagine/login.html")

def gallery(request):
    return render(request, "imagine/gallery.html")

def generate(request):
    return render(request, "imagine/generate.html")

@csrf_exempt
def generate_prompt(request):
    if request.method == "POST":
        prompt = json.loads(request.body)["prompt"]
        os.environ['REPLICATE_API_TOKEN'] = 'aea73d3cdcef130dfbb774c36736e99bbab0c569'
        model = replicate.models.get("stability-ai/stable-diffusion")
        version = model.versions.get("8abccf52e7cba9f6e82317253f4a3549082e966db5584e92c808ece132037776")
        output = version.predict(prompt=prompt)[0]

        post = Post(
            user=request.user,
            body=prompt,
            url=output
        )
        post.save()

        return JsonResponse({"url": output}, status=201)

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "imagine/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "imagine/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "imagine/register.html")
