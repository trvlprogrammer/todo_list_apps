from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI, UserProfileViewset
from knox import views as knox_views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('api/profile', UserProfileViewset, 'profile')
# profile_list = UserProfileViewset.as_view({
#     {'get': 'list', 'post': 'create', 'put': 'update', 'delete': 'destroy'}
# # })
# profile_detail = UserProfileViewset.as_view({
#     {'get': 'list', 'post': 'create', 'put': 'update', 'delete': 'destroy'}
# })


# profile_detail = UserProfileViewset.as_view({
#     'get': 'retrieve',
#     'post': 'create',
#     'put': 'update',
#     'delete': 'destroy'
# })


urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name="knox_logout"),
    # path('api/profile', include((router.urls, 'profile'), namespace='profil'))
    # path('api/profile', profile_detail, name="profile"),
    # path('api/profile/<int:pk>/', profile_detail, name="profile-detail"),

]

urlpatterns += router.urls
