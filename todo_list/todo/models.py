from django.db import models
from django.contrib.auth.models import User

# todo item model


class TodoItem(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    date_event = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    event_status = models.BooleanField(null=True)
