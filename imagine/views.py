from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.db import IntegrityError
import os

from .models import User
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

def generate_prompt(request):
    if request.method == "POST":
        prompt = request.POST["prompt"]
        os.environ['STABILITY_HOST'] = 'grpc.stability.ai:443'
        os.environ['STABILITY_KEY'] = 'sk-2qDzCRMdd4FcasAA5oTazmktnn18AX74PZqUhmuJo8zTj5f0'
        # stability_api = client.StabilityInference(
        #     key=os.environ['STABILITY_KEY'], 
        #     verbose=True,
        # )  

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
