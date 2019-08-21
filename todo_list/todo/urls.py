from rest_framework import routers
from .api import TodoItemViewset, HistoryViewset
from django.urls import path, include

router = routers.DefaultRouter()
router.register('api/todo', TodoItemViewset, 'todo')
router.register('api/historys', HistoryViewset, 'historys')


urlpatterns = router.urls
