from django.contrib import admin

from .models import ProjectModel, ToDo_noteModel


@admin.register(ProjectModel)
class UserAdmin(admin.ModelAdmin):
    list_display = ["pk", "owner", "name"]
    list_filter = [
        "owner",
    ]
    search_fields = ["owner", "name"]


@admin.register(ToDo_noteModel)
class UserAdmin(admin.ModelAdmin):
    list_display = ["pk", "owner", "project", "title", "is_closed"]
    list_filter = [
        "is_closed",
    ]
    search_fields = ["owner", "title"]
