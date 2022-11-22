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
]
