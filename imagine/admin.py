from django.contrib import admin
from .models import User, Post, Profile, Like

# Register your models here.
class postAdmin(admin.ModelAdmin):
    list_display = ["image", "id", "user", "body", "timestamp"]


admin.site.register(User)
admin.site.register(Post, postAdmin)
admin.site.register(Profile)
admin.site.register(Like)
