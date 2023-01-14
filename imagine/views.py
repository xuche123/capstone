from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from django.db import IntegrityError
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.core import files
import os
import json
import replicate
from io import BytesIO
import requests
import uuid
import random

from .models import User, Post, Profile, Prompt


def index(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse("generate"))
    return render(request, "imagine/index.html")


def profile(request, username):
    view_user = User.objects.get(username=username)
    view_profile = Profile.objects.get(user=view_user)
    posts = Post.objects.filter(user=view_user).order_by("-timestamp")
    post_count = posts.count()
    prompts = Prompt.objects.filter(user=view_user)
    prompt_count = prompts.count()

    return render(request, "imagine/profile.html", {
        "view_user": view_user, 
        "view_profile": view_profile, 
        "posts": posts, 
        "post_count": post_count,
        "prompts": prompts,
        "prompt_count": prompt_count
    })

def edit_profile(request):
    user=request.user
    try:
        profile = Profile.objects.get(user=user)
    except Profile.DoesNotExist:
        profile = Profile(user=user)
        profile.save()

    if request.method == "POST":
        
        if request.POST["first_name"] != "":
            user.first_name = request.POST["first_name"]
        if request.POST["last_name"] != "":
            user.last_name = request.POST["last_name"]
        if request.POST["email"] != "":
            profile.bio = request.POST["bio"]
        user.save()
        try:
            profile.image = request.FILES["image"]
        except KeyError:
            pass
        profile.save()    
        return HttpResponseRedirect(reverse("profile", kwargs={"username": user.username}))
    else:
        return render(request, "imagine/edit_profile.html", {"user" : user, "profile" : profile})


def load_prompts(request):
    prompts = Prompt.objects.all()

    search = request.GET.get("search")
    
    filtered = []
    if search:
        for prompt in prompts:
            if prompt.prompt.lower().find(search.lower()) != -1:
                filtered.append(prompt.prompt)
    count = len(filtered)

    return JsonResponse({"prompts": filtered, "count": count})

def random_prompt(request):
    prompts = list(Prompt.objects.all())
    prompt = random.choice(prompts)
    return JsonResponse({"prompt": prompt.prompt})

def prompts(request):
    return render(request, "imagine/prompts.html")


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
            return render(
                request,
                "imagine/login.html",
                {"message": "Invalid username and/or password."},
            )
    else:
        return render(request, "imagine/login.html")


def gallery(request):
    posts = Post.objects.order_by("-timestamp")[0:15]

    return render(request, "imagine/gallery.html", {"posts": posts})


@csrf_exempt
def fetch_post(request):
    if request.method == "POST":
        start = int(json.loads(request.body)["start"])
        count = Post.objects.count()
        if start + 15 > count:
            end = count
        else:
            end = start + 15
      
        posts = Post.objects.order_by("-timestamp")[start:end]

        # construct json response from posts
        response = {}
        count = 0
        for post in posts:
            new = {
                    "id": post.id,
                    "username": post.user.username,
                    "body": post.body,
                    "image": post.image.url,
                }
            response[count] = new
            count = count + 1

        return JsonResponse(response, status=201)

    else:
        return JsonResponse({"error": "POST request required."}, status=400)


def generate(request):
    if request.user.is_authenticated:
        return render(request, "imagine/generate.html")
    else:
        return HttpResponseRedirect(reverse("index"))

@csrf_exempt
def generate_prompt(request):
    if request.method == "POST":
        print(json.loads(request.body))
        prompt = json.loads(request.body)["prompt"]
        width = json.loads(request.body)["width"]
        height = json.loads(request.body)["height"]

        try:
            uploadCheck = json.loads(request.body)["upload"]
        except KeyError:
            uploadCheck = False

        try:
            promptCheck = json.loads(request.body)["prompt1"]
        except KeyError:
            promptCheck = False

        print(promptCheck)

        if width == "Width":
            width = 512
        if height == "Height":
            height = 512

        if width == "1024" and height == "1024":
            return JsonResponse({"error": "Image size too large."}, status=400)
        else:

            os.environ["REPLICATE_API_TOKEN"] = "aea73d3cdcef130dfbb774c36736e99bbab0c569"
            model = replicate.models.get("stability-ai/stable-diffusion")
            version = model.versions.get(
                "8abccf52e7cba9f6e82317253f4a3549082e966db5584e92c808ece132037776"
            )
            output = version.predict(prompt=prompt, width=width, height=height)[0]

            resp = requests.get(output)
            id = uuid.uuid4()
            fp = BytesIO()
            fp.write(resp.content)
            file_name = output.split("/")[-1]

            if uploadCheck:
                post = Post(
                    id=id,
                    user=request.user,
                    body=prompt,
                    image=files.File(fp, file_name),
                )

                post.save()

            
            
            if promptCheck:
                prompt1 = Prompt(
                    prompt=prompt,
                    user=request.user
                )
                prompt1.save()


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

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
            profile = Profile(user=user)
            profile.save()
        except IntegrityError:
            return render(
                request, "imagine/register.html", {"message": "Username already taken."}
            )
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "imagine/register.html")
