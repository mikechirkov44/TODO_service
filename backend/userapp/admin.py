from django.contrib import admin

from .models import User
from django.contrib.auth.admin import UserAdmin


@admin.register(User)
class UserModelAdmin(UserAdmin):
    list_display = (
        "pk",
        "username",
        "first_name",
        "last_name",
        "email",
        "role",
    )
