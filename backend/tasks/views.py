from rest_framework import generics, status
from .models import Task
from .serializers import TaskSerializer
from .agents import classify_task, generate_subtasks
from rest_framework.response import Response


# Create your views here.
class TaskListCreateView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def create(self, request, *args, **kargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        description = serializer.validated_data["description"]

        try:
            category = classify_task(description)
            subtasks = generate_subtasks(description)
        except Exception:
            category = "Sin Clasificar"
            subtasks = []

        serializer.save(category=category, subtasks=subtasks)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class TaskUpdateView(generics.UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    http_method_names = ["patch", "put"]
