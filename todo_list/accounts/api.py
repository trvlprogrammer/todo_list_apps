from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from knox.models import AuthToken
from .models import ProfileUser
from django.contrib.auth.models import User

from .serializers import (
    UserSerializer,
    RegisterSerializer,
    LoginSerializer,
    ProfileSerializer
)


# registerAPI
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# LoginAPI


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


# GETUserAPI, di protect biar cuma user yang udah login yang bisa akses datanya
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class UserProfileViewset(viewsets.ModelViewSet):

    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return ProfileUser.objects.filter(owner=self.request.user)
