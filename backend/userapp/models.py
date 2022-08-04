from pyexpat import model
from tabnanny import verbose
from django.db import models

from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    ROLE_CHOICES = (
        ('pm', 'project manager'),
        ('dev', 'developer')
    )
    email = models.EmailField(
        max_length=254, unique=True, verbose_name="email")
    role = models.CharField(
        max_length=3, choices=ROLE_CHOICES, default="dev", verbose_name="role")

    class Meta:
        verbose_name = ("User")
        verbose_name_plural = ("Users")
