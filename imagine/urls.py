from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path('gallery', views.gallery, name='gallery'),
    path('generate', views.generate, name='generate'),
    path('generate_prompt', views.generate_prompt, name='generate_prompt'),
    path('fetch_post', views.fetch_post, name='fetch_post'),
    path('prompts', views.prompts, name='prompts'),
    path("load_prompts", views.load_prompts, name="load_prompts"),
    path("profile/<str:username>", views.profile, name="profile"),
    path("edit_profile", views.edit_profile, name="edit_profile"),
]
