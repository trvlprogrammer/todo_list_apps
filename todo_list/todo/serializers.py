from rest_framework import serializers
from .models import TodoItem


# define serializer for todo item

class TodoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoItem
        fields = '__all__'
