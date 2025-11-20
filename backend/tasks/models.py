from django.db import models


# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    category = models.CharField(max_length=100, blank=True, null=True)
    subtasks = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.title
