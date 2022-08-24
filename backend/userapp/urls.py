from django.urls import include, path
from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter

from userapp.apps import UserappConfig

from .views import UserModelViewSet

app_name = UserappConfig.name

router = DefaultRouter()
router.register("users", UserModelViewSet)

urlpatterns = [
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include(router.urls)),
    path("api-token-auth/", views.obtain_auth_token),
]
