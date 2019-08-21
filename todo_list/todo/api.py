from todo.models import TodoItem
from rest_framework import permissions, viewsets, generics
from .serializers import TodoItemSerializer


class TodoItemViewset(viewsets.ModelViewSet):
    permission_classes = [
        # permissions.
        permissions.IsAuthenticated
    ]
    # queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer

    def get_queryset(self):

        # return TodoItem.object.all()
        return TodoItem.objects.filter(owner=self.request.user, event_status=True)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user, event_status=True)


class HistoryViewset(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = TodoItemSerializer

    def get_queryset(self):
        return TodoItem.objects.filter(owner=self.request.user, event_status=False)
