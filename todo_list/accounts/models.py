from django.db import models
from django.contrib.auth.models import User


class ProfileUser(models.Model):
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True,  blank=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    image = models.ImageField(upload_to="profile_picture", blank=True)
