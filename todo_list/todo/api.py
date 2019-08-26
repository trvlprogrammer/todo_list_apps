from todo.models import TodoItem
from rest_framework import permissions, viewsets, generics
from .serializers import TodoItemSerializer

# create api view for todo list


class TodoItemViewset(viewsets.ModelViewSet):
    permission_classes = [
        # permissions.
        permissions.IsAuthenticated
    ]
    # queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer

# give filter for the data
    def get_queryset(self):

        # return TodoItem.object.all()
        return TodoItem.objects.filter(owner=self.request.user, event_status=True)

# overide create function
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user, event_status=True)


# create api for historys todo, i think i just need 1 api, but i dont know how to do it,
# i mean to divide the todo list and history todo, thats why i made 2 api

class HistoryViewset(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = TodoItemSerializer

    # give filter for the data

    def get_queryset(self):
        return TodoItem.objects.filter(owner=self.request.user, event_status=False)
