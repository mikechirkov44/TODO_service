from rest_framework.viewsets import ModelViewSet

from .models import ToDo_noteModel, ProjectModel
from .serializer import NotesModelSerializer, ProjectModelSerializer

from .filters import ProjectModelFilter, ToDoModelFilter
from rest_framework.pagination import LimitOffsetPagination


class NotneLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class NotesModelViewSet(ModelViewSet):
    queryset = ToDo_noteModel.objects.all()
    serializer_class = NotesModelSerializer
    pagination_class = NotneLimitOffsetPagination
    filterset_class = ToDoModelFilter

    def perform_destroy(self, instance):
        instance.closed = True
        instance.deleted = True
        instance.save()


class ProjectModelViewSet(ModelViewSet):
    queryset = ProjectModel.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectModelFilter
