from django.urls import include, path
from rest_framework.routers import DefaultRouter

from projectapp.apps import ProjectappConfig

from .views import NotesModelViewSet, ProjectModelViewSet

app_name = ProjectappConfig.name

router = DefaultRouter()
router.register("projects", ProjectModelViewSet)
router.register("notes", NotesModelViewSet)

urlpatterns = [path("api-auth/", include("rest_framework.urls")), path("api/", include(router.urls))]
