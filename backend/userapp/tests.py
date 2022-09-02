from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient
from mixer.backend.django import mixer
from .models import User
from .views import UserModelViewSet


# Create your tests here.
class SmokeUserTestCase(TestCase):

    def setUp(self) -> None:
        self.user = mixer.blend(User)

    def test_get_users_list(self) -> None:
        factory = APIRequestFactory()
        request = factory.get('/userapp/api/users/')
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_user_detail(self) -> None:
        client = APIClient()
        response = client.get(f'/userapp/api/users/{self.user.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
