from django.urls import path
from .views import TaskListCreateView, TaskUpdateView

urlpatterns = [
    path("tasks/", TaskListCreateView.as_view()),
    path("tasks/<int:pk>/", TaskUpdateView.as_view()),
]
