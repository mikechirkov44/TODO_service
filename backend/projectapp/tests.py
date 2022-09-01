from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APITestCase
from mixer.backend.django import mixer
from userapp.models import User
from .views import ProjectModelViewSet, NotesModelViewSet
from .models import ProjectModel, ToDo_noteModel


class SmokeProjectTestCase(TestCase):

    def setUp(self) -> None:
        self.user = mixer.blend(User)
        self.project = mixer.blend(ProjectModel)
        self.note = mixer.blend(ToDo_noteModel)

    def test_get_project_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_notes_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/notes/')
        view = NotesModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class CRUDTestCase(APITestCase):

    def setUp(self) -> None:
        self.admin = User.objects.create_superuser(
            'test', 'test@admin.com', 'test')
        self.project = mixer.blend(ProjectModel)
        self.note = mixer.blend(ToDo_noteModel)

    def test_create_project_guest(self) -> None:
        response = self.client.post(f'/api/projects/', {
            'name': 'test_project',
            'owner': self.admin.id,
            'project_team': [self.admin.id]
        })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_project_auth(self) -> None:
        self.client.force_login(self.admin)
        response = self.client.post(f'/api/projects/', {
            'name': 'test_project',
            'owner': self.admin.id,
            'project_team': [self.admin.id]
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        project = ProjectModel.objects.get(id=response.data.get('id'))
        self.assertEqual(project.name, 'test_project')
        self.client.logout()
