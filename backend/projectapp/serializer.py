from rest_framework.serializers import ModelSerializer

from .models import ToDo_noteModel, ProjectModel


class NotesModelSerializer(ModelSerializer):
    class Meta:
        model = ToDo_noteModel
        fields = '__all__'


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = ProjectModel
        fields = '__all__'
