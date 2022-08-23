from django.contrib.auth import get_user_model
from django.db import models

from userapp.models import User


class ProjectModel(models.Model):

    """
    Модель описывающая проект
    """

    owner = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name="project_author", verbose_name="Owner"
    )
    git_link = models.URLField(verbose_name="Link to git")
    project_team = models.ManyToManyField(User, related_name="project_team", verbose_name="Project team")
    name = models.CharField(verbose_name="Project name", max_length=128)
    description = models.TextField(verbose_name="Description", default="")

    def __str__(self) -> str:
        return f"{self.owner} {self.name}"

    def delete(self, *args) -> None:
        return super().delete(*args)

    class Meta:
        verbose_name = "Project"
        verbose_name_plural = "Projects"


class ToDo_noteModel(models.Model):
    """
    Модель ToDo заметки к проекту
    """

    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, verbose_name="Owner")
    project = models.ForeignKey(
        ProjectModel, on_delete=models.CASCADE, related_name="project_notes", verbose_name="Project"
    )
    title = models.CharField(verbose_name="Title", max_length=128)
    description = models.TextField(verbose_name="Description", default="")
    is_closed = models.BooleanField(default=False, verbose_name="is_closed")

    def __str__(self) -> str:
        return f"{self.owner} {self.project} {self.title}"

    def delete(self, *args) -> None:
        return super().delete(*args)

    class Meta:
        verbose_name = "ToDo note"
        verbose_name_plural = "ToDo notes"
