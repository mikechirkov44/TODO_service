from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter
from rest_framework import permissions

from projectapp.views import NotesModelViewSet, ProjectModelViewSet
from userapp.views import UserModelViewSet
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from graphene_django.views import GraphQLView


schema_view = get_schema_view(
    openapi.Info(
        title="ToDo-Service",
        default_version='1.0',
        description='Documentation to our project',
        contact=openapi.Contact(email='admin@admin.com'),
        license=openapi.License(name='MIT'),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)


router = DefaultRouter()
router.register("users", UserModelViewSet)
router.register("notes", NotesModelViewSet)
router.register("projects", ProjectModelViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("userapp/", include("userapp.urls", namespace="userapp")),
    path("projectapp/", include("projectapp.urls", namespace="projectapp")),
    path("api/", include(router.urls)),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger',
         cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc',
         cache_timeout=0), name='schema-redoc'),
    path('graphql/', GraphQLView.as_view(graphiql=True)),
]
