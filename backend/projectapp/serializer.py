from rest_framework.serializers import ModelSerializer

from .models import ProjectModel, ToDo_noteModel


class NotesModelSerializer(ModelSerializer):
    class Meta:
        model = ToDo_noteModel
        fields = "__all__"


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = ProjectModel
        fields = "__all__"
