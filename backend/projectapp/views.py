from rest_framework.viewsets import ModelViewSet

from .models import ToDo_noteModel, ProjectModel
from .serializer import NotesModelSerializer, ProjectModelSerializer


class NotesModelViewSet(ModelViewSet):
    queryset = ToDo_noteModel.objects.all()
    serializer_class = NotesModelSerializer


class ProjectModelViewSet(ModelViewSet):
    queryset = ProjectModel.objects.all()
    serializer_class = ProjectModelSerializer
